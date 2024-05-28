import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileManager.css';

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
        const response = await axios.get(`${import.meta.env.VITE_APP_ORIGIN}/text-file/all`);
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
        const response = await axios.post(`${import.meta.env.VITE_APP_ORIGIN}/text-file`, {
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
      await axios.delete(`${import.meta.env.VITE_APP_ORIGIN}/text-file/${id}`);
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
    <div className="container">
      <h1 className="heading">File Manager</h1>
      <div className="input-container">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          onClick={handleUploadFile}
          disabled={!selectedFile}
          className="upload-button"
        >
          Upload File
        </button>
      </div>
      <ul className="file-list">
        {files.map((file) => (
          <li
            key={file.id}
            className="file-item"
          >
            <input
              type="checkbox"
              checked={file.checked}
              onChange={() => handleChecked(file.id)}
              className="file-item-checkbox"
            />
            <strong>{file.name}</strong>
            <div className="file-item-content">
              <p>{file.content}</p>
            </div>
            <button
              onClick={() => handleDeleteFile(file.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}