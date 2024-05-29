import axios from "axios"
import { useEffect, useState } from "react"

type Result = {
    id: string,
    words: string[],
    textFiles: {
        textFileId: string,
        textFileName: string,
        wordCounts: number[]
    }[]
    createdAt: string,
    updatedAt: string
}

export const ConsistencyKvsK = ({textFileIDs}: { textFileIDs: string[] }) => {
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_APP_ORIGIN}/consistency-k-vs-k`, {
            textFileIDs,
            limit: 10000
        }).then((response) => {
            setResult(response.data.result)
        })
    }, [])
    return (
        <div>
            <h1>Consistency K vs K</h1>
            <div>
                { result && 
                    <table>
                        <thead>
                            <tr>
                                <th>Word</th>
                                { result.textFiles.map((textFile) => <th key={textFile.textFileId}>{textFile.textFileName}</th>) } 
                            </tr>
                        </thead>
                        <tbody>
                            { result.words.map((word, index) => 
                                <tr key={index}>
                                    <td>{word}</td>
                                    { result.textFiles.map((textFile, textFileIndex) => <td key={textFile.textFileId}>{textFile.wordCounts[index]}</td>) }
                                </tr>
                            ) }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
