# API仕様

## POST /text-file
テキストファイルの作成を行う

BODY
```json
{
    "name": string,
    "content": string
}
```

RESPONSE
```json
{
    "message": string,
    "textFile": TextFile
}
```
[TextFileの構造はリンクを参照](#textfile)

## GET /text-file/\<id>
idを元にテキストファイルを取得する

RESPONSE
```json
{
    "message": string,
    "textFile": TextFile
}
```
[TextFileの構造はリンクを参照](#textfile)


## PUT /text-file/\<id>
指定したidのテキストファイルを変更する

BODY
```json
{
    "name": string,
    "content": string
}
```

RESPONSE
```json
{
    "message": string,
    "textFile": TextFile
}
```


## DELETE /text-file/\<id>
指定したidのテキストファイルを削除する

RESPONSE
```json
{
    "message": string,
    "textFileID": string
}
```

## GET /text-file/all
すべてのテキストファイルを取得する

RESPONSE
```json
{
    "message": string,
    "textFiles": TextFile[]
}
```

## POST /exploratory-search
exploratory searchを行う

BODY
```json
{
    "textFileIDs": string[],
    "word": string
}
```
word: 検索する単語

RESPONSE
```json
{
    "message": string,
    "result": {
        "id": string,
        "targetWord": string,
        "searchTerms": {
                "textFileId": string,
                "textFileName": string,
                "leftWords": string[],
                "rightWords": string[]
        }[],
        "createdAt": string,
        "updatedAt": string
    }
}
```

## POST /compare-q-vs-k
comopare Q vs K を行う

BODY
```json
{
    "qTextFileID": string,
    "kTextFileIDs": string[]
}
```

RESPONSE
```json
{
    "message": string,
    "result": {
        "id": string,
        "q_text_file_id": string,
        "q_text_file_name": string,
        "terms": [
            {
                "offset": int,
                "words": [
                    {
                        "word": string,
                        "count": int
                    }, ...
                ]
            }, ...
        ],
        "k_text_files": [
            {
                "kTextFileID": string,
                "kTextFileName": string,
                "terms": [
                    {
                        "offset": int,
                        "words": [
                            {
                                "word": string,
                                "count": int
                            }, ...
                        ]
                    }, ...
                ]
            }, ...
        ]
    }
}
```

## POST /consistency-k-vs-k
comopare Q vs K を行う

BODY
```json
{
    "textFileIDs": string[],
    "limit": int
}
```

RESPONSE
```json
{
    "message": string,
    "result": {
        "id": string,
        "words": string[],
        "textFiles": [
            {
                "textFileId": string,
                "textFileName": string,
                "wordCounts": int[]
            }, ...
        ],
        "createdAt": self.created_at,
        "updatedAt": self.updated_at
    }
}
```
words配列の格納順と、wordCounts配列の格納順は対応しています。
つまり、単語`word[10]`の`textFiles[5]`での出現数は`textFiles[5].wordCounts[10]`で取得できます。


## TextFile
```json
{
    "id": str,
    "name": str,
    "content": str,
    "createdAt": str,
    "updatedAt": str
}
```
