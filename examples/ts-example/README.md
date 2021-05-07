# TS-Example

This folder includes a simple TS example. It is important that in the config you add both extensions `ts,js` because when you are running the app using `ts-node` you will watch `ts` files but when it is build you need to watch `js`.

## Install dependencies

```
npm i
```

## Execute

```
// Execute dev mode
npm run dev
// Build TS file in build/simple.js
npm run tsc:build
// Execute ts-node app
npm run start
// execute build app
npm run start:prod
```
