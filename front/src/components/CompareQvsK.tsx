import axios from "axios"
import { useEffect, useState } from "react"
import styled from '@emotion/styled'

type ResultTerm = {
    offset: number,
    words: {
        word: string,
        count: number
    }[]
}

type Result = {
    id: string,
    qTextFileID: string,
    qTextFileName: string,
    terms: ResultTerm[],
    kTextFiles: {
        kTextFileID: string,
        kTextFileName: string,
        terms: ResultTerm[]
    }[]
}


const BoxVertical = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
`

const BoxHorizontal = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
`

const BoxItem = styled.div`
    margin: 10px;
`

const TermBox = styled.div`
    margin: 10px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 10px;
`

const Offset = styled.p`
    font-weight: bold;
    text-align: center;
`

const Word = styled.span`
    font-weight: bold;
`

const WordCount = styled.span`
    font-weight: normal;
    color: #666;
`

// Termごとに高さを揃える
// ファイルごとに横並びにする


const Term = ({qFileName, kFileNames, qTerm, kTerms}: { qFileName: string, kFileNames: string[], qTerm: ResultTerm, kTerms: ResultTerm[] }) => {
    return (
        <BoxHorizontal>
            <BoxItem>
                <TermBox>
                    <h3>{qFileName}</h3>
                    <Offset>RANK: {qTerm.offset}</Offset>
                    {qTerm.words.map((word) => <p key={word.word}><Word>{word.word}</Word> <WordCount>{word.count}</WordCount></p>)}
                </TermBox>
            </BoxItem>
            {kTerms.map((kTerm, index) => 
                <BoxItem key={index}>
                    <TermBox>
                        <h3>{kFileNames[index]}</h3>
                        <Offset>RANK: {kTerm.offset}</Offset>
                        {kTerm.words.map((word) => <p key={word.word}><Word>{word.word}</Word> <WordCount>{word.count}</WordCount></p>)}
                    </TermBox>
                </BoxItem>
            )}
        </BoxHorizontal>
    )
}

export const CompareQvsK = ({qTextFileID, kTextFileIDs}: { qTextFileID: string, kTextFileIDs: string[] }) => {
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_APP_ORIGIN}/compare-q-vs-k`, {
            qTextFileID,
            kTextFileIDs
        }).then((response) => {
            setResult(response.data.result)
        })
    }, [])

    return (
        <BoxVertical>
            <h1>Compare Q vs K</h1>
            <div>
                { result && 
                    <BoxVertical>
                        <BoxItem>
                            <h2>{result.qTextFileName}</h2>
                            {result.terms.map((term, index) => <Term key={index} qFileName={result.qTextFileName} kFileNames={result.kTextFiles.map((kFile) => kFile.kTextFileName)} qTerm={term} kTerms={result.kTextFiles.map((kFile) => kFile.terms[index])} />)}
                        </BoxItem>
                    </BoxVertical>
                }
            </div>
        </BoxVertical>
    )
}

