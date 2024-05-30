export type Result = {
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

export const ConsistencyKvsK = ({result}: { result:  Result | null}) => {

    return (
        <div>
            <h1>Consistency K vs K</h1>
            <div>
                { !result && <p>Loading...</p>}
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
                                    { result.textFiles.map((textFile, _) => <td key={textFile.textFileId}>{textFile.wordCounts[index]}</td>) }
                                </tr>
                            ) }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
