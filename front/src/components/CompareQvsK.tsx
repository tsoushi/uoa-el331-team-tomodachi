import axios from "axios"
import { useEffect, useState } from "react"

type Result = {
    id: string,
    qTextFileID: string,
    qtextFileName: string,
    terms: {
        offset: number,
        words: {
            word: string,
            count: number
        }[]
    }[],
    k_text_files: {
        kTextFileID: string,
        kTextFileName: string,
        terms: {
            offset: number,
            words: {
                word: string,
                count: number
            }[]
        }[]
    }[]
}

export const CompareQvsK = ({qTextFileID, kTextFileIDs}: { qTextFileID: string, kTextFileIDs: string[] }) => {
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_APP_ORIGIN}/compare-q-vs-k`, {
            qTextFileID,
            kTextFileIDs
        }).then((response) => {
            setResult(response.data)
        })
    }, [])
    return (
        <div>
            <h1>Compare Q vs K</h1>
            <div>{ JSON.stringify(result) }</div>
        </div>
    )
}
