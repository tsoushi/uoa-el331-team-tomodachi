export const CompareQvsK = ({qTextFileID, kTextFileIDs}: { qTextFileID: string, kTextFileIDs: string[] }) => {
    // TODO: textFileIDsが変更されるたびにリクエストを送って、結果を表示する
    return (
        <div>
            <h1>Compare Q vs K</h1>
            <p>
                qTextFileID: {qTextFileID}
            </p>
        </div>
    )
}
