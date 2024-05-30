import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CompareQvsK, Result as CompareResult } from './components/CompareQvsK'
import { ConsistencyKvsK, Result as ConsistencyResult } from './components/ConsistencyKvsK'

import { FileManager } from './components/FileManager'
import ExploratorySearch from './exploratorySearch/ExploratorySearch'
import axios from "axios"



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
  const [compareResult, setCompareResult ] = useState<CompareResult | null>(null) // QvsK
  const [consistencyResult, setConsistencyResult] = useState<ConsistencyResult | null>(null) // KvsK

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_APP_ORIGIN}/compare-q-vs-k`, {
        qTextFileID: compareQvsKQFileID,
        kTextFileIDs: compareQvsKKFileIDs,
    }).then((response) => {
        setCompareResult(response.data.result)
    })
}, [compareQvsKQFileID, compareQvsKKFileIDs])


useEffect(() => {
  axios.post(`${import.meta.env.VITE_APP_ORIGIN}/consistency-k-vs-k`, {
      textFileIDs: consistencyKvsKFileIDs,
      limit: 10000
  }).then((response) => {
      setConsistencyResult(response.data.result)
  })
}, [consistencyKvsKFileIDs])




  return (
    <>
      <MenuBar setScene={setScene}/>
      <div css={css`
        padding: 10px;
      `}>
        {scene === 'FileManager' && 
          <FileManager 
            setScene={ setScene }
            setExploratorySearchFileIDs={ setExploratorySearchFileIDs }
            setCompareQvsKQFileID={ setCompareQvsKQFileID }
            setCompareQvsKKFileIDs={ setCompareQvsKKFileIDs }
            setConsistencyKvsKFileIDs={ setConsistencyKvsKFileIDs } />}
        {scene === 'ExploratorySearch' && <ExploratorySearch textFileIDs={ exploratorySearchFileIDs } />}
        {scene === 'CompareQvsK' && <CompareQvsK result={compareResult} />}
        {scene === 'ConsistencyKvsK' && <ConsistencyKvsK result={ consistencyResult } />}
      </div>
    </>
  )
}

export default App;
