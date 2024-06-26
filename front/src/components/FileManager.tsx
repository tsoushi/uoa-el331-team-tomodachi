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
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>('');
  const [lastSelectedFileId, setLastSelectFileId] = useState<string>('');

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

  const startRenamingFile = (id: string, currentName: string): void => {
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
            setCompareQvsKQFileID(lastSelectedFileId)
            setCompareQvsKKFileIDs(files.filter((file) => file.checked && file.id !== lastSelectedFileId).map((file) => file.id.toString()))
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
            onClick={() => {
              if (!file.checked) {
                setLastSelectFileId(file.id)
              }
              handleChecked(file.id)
            }}
            key={file.id}
            className="file-item"
          >
            <input
              type="checkbox"
              checked={file.checked}
              className="file-item-checkbox"
              readOnly={true}
            />
            {renamingFileId === file.id ? (
              <>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="file-item-input"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRenameFile(file)
                  }}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    cancelRenaming()
                  }}
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
              onClick={(e) => {
                e.stopPropagation()
                startRenamingFile(file.id, file.name)
              }}
              className="rename-button"
            >
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteFile(file.id)
              }}
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
