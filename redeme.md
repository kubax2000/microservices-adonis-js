# Microservice Adonis JS

## Install

```shell
cd ./price-api
npm install
cp .env.example .env
npm run dev
```

```shell
cd ./item-api
npm install
cp .env.example .env
npm run dev
```

Check

```shell
curl -X POST \
  http://localhost:3334/items \
  -H 'Content-Type: application/json' \
  -d '{
    "isbn": "0201558025",
    "condition": "as_new"
}'
```
