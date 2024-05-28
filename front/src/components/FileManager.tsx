import React, { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem, Heading, Checkbox } from '@chakra-ui/react';
import axios from 'axios';

type TextFile = {
  id: number;
  name: string;
  content: string;
  checked: boolean;
};

export function FileManager() {
  const [files, setFiles] = useState<TextFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/text-file/all');
        setFiles(response.data.textFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadFile = async (): Promise<void> => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const content = reader.result as string;
      try {
        const response = await axios.post('/text-file', {
          name: selectedFile.name,
          content: content
        });
        setFiles((prevFiles) => [...prevFiles, response.data.textFile]);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleDeleteFile = async (id: number): Promise<void> => {
    try {
      await axios.delete(`/text-file/${id}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleChecked = (id: number): void => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, checked: !file.checked } : file
      )
    );
  };

  return (
    <Box p={5}>
      <Heading mb={4}>File Manager</Heading>
      <Box mb={4}>
        <input
          type="file"
          onChange={handleFileChange}

        />
        <Button onClick={handleUploadFile} isDisabled={!selectedFile}>Upload File</Button>
      </Box>
      <List spacing={3}>
        {files.map((file) => (
          <ListItem
            key={file.id}
            p={2}
            borderRadius="md"
            borderWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            _hover={{ backgroundColor: 'gray.100' }}
          >
            <Checkbox
              isChecked={file.checked}
              onChange={() => handleChecked(file.id)}
            >
              <strong>{file.name}</strong>
            </Checkbox>
            <Box flex="1" ml={4}>
              <p>{file.content}</p>
            </Box>
            <Button colorScheme="red" onClick={() => handleDeleteFile(file.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
