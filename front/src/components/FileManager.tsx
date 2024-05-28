import styled from '@emotion/styled';

const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const FileItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`


export function FileManager() {
    return (
      <div>
        <h1>File Manager</h1>
        <input type='file'></input>
        <FileList>
            <FileItem>file1.txt</FileItem>
            <FileItem>file2.txt</FileItem>
            <FileItem>file3.txt</FileItem>
        </FileList>
      </div>
    )
}