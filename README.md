# js-config-editor

A tiny web service for editing config file on server.

## 1. Install

```bash
yarn install
```

Install PM2:

```bash
yarn global add pm2
`yarn global bin`/pm2 startup
```

Reference: <https://pm2.io/doc/zh/runtime/quick-start/>


## 2. Config

```bash
cp conf.json.example conf.json
```

Modify `conf.json` as you need.

Run `pm2 start -n js-config-editor ./index.js`
