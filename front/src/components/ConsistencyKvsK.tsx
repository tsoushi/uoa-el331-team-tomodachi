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
            setResult(response.data)
        })
    }, [])
    return (
        <div>
            <h1>Consistency K vs K</h1>
            <div>{ JSON.stringify(result) }</div>
        </div>
    )
}
