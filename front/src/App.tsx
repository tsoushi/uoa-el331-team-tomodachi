import { useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CompareQvsK } from './components/CompareQvsK'
import { ConsistencyKvsK } from './components/ConsistencyKvsK'

import { FileManager } from './components/FileManager'
import ExploratorySearch from './exploratorySearch/ExploratorySearch'

const MenuBox = styled.ul`
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 10px;
  list-style: none;

  background-color: #f0f0f0;
`


const MenuItem = styled.li`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`

type SceneName = 'FileManager' | 'ExploratorySearch' | 'CompareQvsK' | 'ConsistencyKvsK'

function MenuBar({ setScene }: { setScene: React.Dispatch<React.SetStateAction<SceneName>>}) {
  
  return (
    <nav>
      <MenuBox>
        <MenuItem onClick={() => setScene('FileManager')}>File Manager</MenuItem>
        <MenuItem onClick={() => setScene('ExploratorySearch')}>Exploratory Search</MenuItem>
        <MenuItem onClick={() => setScene('CompareQvsK')}>Compare Q vs K</MenuItem>
        <MenuItem onClick={() => setScene('ConsistencyKvsK')}>Consistency K vs K</MenuItem>
      </MenuBox>
    </nav>
  )
}

function App() {
  const [scene, setScene] = useState<SceneName>('FileManager')
  const [exploratorySearchFileIDs, setExploratorySearchFileIDs] = useState<string[]>([])
  const [compareQvsKKFileIDs, setCompareQvsKKFileIDs] = useState<string[]>([])
  const [compareQvsKQFileID, setCompareQvsKQFileID] = useState<string>('')
  const [consistencyKvsKFileIDs, setConsistencyKvsKFileIDs] = useState<string[]>([])

  return (
    <>
      <MenuBar setScene={setScene}/>
      <div css={css`
        padding: 10px;
      `}>
        {scene === 'FileManager' && 
          <FileManager 
            setExploratorySearchFileIDs={ setExploratorySearchFileIDs }
            setCompareQvsKQFileID={ setCompareQvsKQFileID }
            setCompareQvsKKFileIDs={ setCompareQvsKKFileIDs }
            setConsistencyKvsKFileIDs={ setConsistencyKvsKFileIDs } />}
        {scene === 'ExploratorySearch' && <ExploratorySearch textFileIDs={ exploratorySearchFileIDs } />}
        {scene === 'CompareQvsK' && <CompareQvsK qTextFileID={ compareQvsKQFileID } kTextFileIDs={ compareQvsKKFileIDs } />}
        {scene === 'ConsistencyKvsK' && <ConsistencyKvsK textFileIDs={ consistencyKvsKFileIDs } />}
      </div>
    </>
  )
}

export default App;
