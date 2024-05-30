# uoa-el331-team-tomodachi
Authorship Analysis using Python

## 実行方法
### server

```sh
cd server
python3 -m pip install -r requirements.txt
python3 -m spacy download en_core_web_sm
python3 main.py
```

### front

```sh
cd front
npm install
npm run dev
```

### Docker
```sh
mkdir dbdata
docker compose up
```
#### if you change code
```sh
docker compose build
docker compose up
```

## バックエンドのAPI仕様 API Reference
[docs/server-api.md](docs/server-api.md) を参照
