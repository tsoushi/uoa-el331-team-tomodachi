## 開発する前に
```
npm i
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm i axios

```

## 実行
```
npm run dev
```

    const handleChecked = (id: number, checked: boolean) => { //検索などに使いたいファイルを選択する // データベースサーバー側との接続はいらないはず
        const newFiles = files.map((file) => {
            if(file.id == id) {
                file.checked = !checked
            }

            return file;
        });

        setFiles(newFiles)
    }