import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileManager.css';

type TextFile = {
  id: string;
  name: string;
  content: string;
  checked: boolean;
};

type Props = {
  setScene: React.Dispatch<React.SetStateAction<'FileManager' | 'ExploratorySearch' | 'CompareQvsK' | 'ConsistencyKvsK'>>;
  setExploratorySearchFileIDs: React.Dispatch<React.SetStateAction<string[]>>;
  setCompareQvsKKFileIDs: React.Dispatch<React.SetStateAction<string[]>>;
  setCompareQvsKQFileID: React.Dispatch<React.SetStateAction<string>>;
  setConsistencyKvsKFileIDs: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FileManager({ setScene, setExploratorySearchFileIDs, setCompareQvsKQFileID, setCompareQvsKKFileIDs, setConsistencyKvsKFileIDs }: Props) {
  const [files, setFiles] = useState<TextFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_ORIGIN}/text-file/all`);
        setFiles(response.data.textFiles.map((file: any) => {file.checked = false; return file;}));
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

  const handleDeleteFile = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_ORIGIN}/text-file/${id}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleChecked = (id: string): void => {
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
        <button
          onClick={() => {
            setExploratorySearchFileIDs(files.filter((file) => file.checked).map((file) => file.id.toString()));
            setScene('ExploratorySearch');
          }}
          className="search-button"
        >
          Search files
        </button>
        <button
          onClick={() => {
            // TODO: Qを選択する画面を表示する
            setScene('CompareQvsK')
          }}
          className="search-button"
        >
          Compare Q vs K
        </button>
        <button
          onClick={() => {
            setConsistencyKvsKFileIDs(files.filter((file) => file.checked).map((file) => file.id.toString()))
            setScene('ConsistencyKvsK')
          }}
          className="search-button"
        >   
        Consistency K vs K
        </button>
      </div>
      <ul className="file-list">
        {files.map((file) => (
          <li
            onClick={() => handleChecked(file.id)}
            key={file.id}
            className="file-item"
          >
            <input
              type="checkbox"
              checked={file.checked}
              className="file-item-checkbox"
              readOnly={true}
            />
            <strong>{file.name}</strong>
            <div className="file-item-content">
              <p>{file.content.substring(0, 100)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFile(file.id)
              }}
              className="delete-button"
            >
              Detail
            </button>
            <button
              onClick={() => handleDeleteFile(file.id)}
              className="delete-button"
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