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
  const [renamingFileId, setRenamingFileId] = useState<number | null>(null);
  const [newFileName, setNewFileName] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_ORIGIN}/text-file/all`);
        setFiles(response.data.textFiles.map((file: any) => ({ ...file, checked: false })));
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

  const handleRenameFile = async (file: TextFile): Promise<void> => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_ORIGIN}/text-file/${file.id}`, {
        name: newFileName,
        content: file.content
      });
      setFiles((prevFiles) =>
        prevFiles.map((prev) =>
          prev.id === file.id ? { ...prev, name: response.data.textFile.name } : prev
        )
      );
      setRenamingFileId(null);
      setNewFileName('');
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  };

  const startRenamingFile = (id: number, currentName: string): void => {
    setRenamingFileId(id);
    setNewFileName(currentName);
  };

  const cancelRenaming = (): void => {
    setRenamingFileId(null);
    setNewFileName('');
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
        <button
          onClick={handleUploadFile}
          disabled={!selectedFile}
          className="search-button"
        >
          Search files
        </button>
        <button
          onClick={handleUploadFile}
          disabled={!selectedFile}
          className="search-button"
        >
          Compare Q vs K
        </button>
        <button
          onClick={handleUploadFile}
          disabled={!selectedFile}
          className="search-button"
        >   
          Consistency K vs K
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
            {renamingFileId === file.id ? (
              <>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="file-item-input"
                />
                <button
                  onClick={() => handleRenameFile(file)}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelRenaming}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <strong onDoubleClick={() => startRenamingFile(file.id, file.name)}>
                {file.name}
              </strong>
            )}
            <div className="file-item-content">
              <p>{file.content.substring(0, 100)}</p>
            </div>
            <button
              onClick={() => startRenamingFile(file.id, file.name)}
              className="rename-button"
            >
              Rename
            </button>
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
