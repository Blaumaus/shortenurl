In the root of the project you need to have `.env` file which contains:

```
PORT=3000
DB_CREDENTIALS=mongodb://LOGIN:PASSWORD@CLUSTER_NAME/DB_NAME?ssl=true&replicaSet=mycluster-shard-0&authSource=admin&retryWrites=true
```
where `PORT` is port which server will listen and `DB_CREDENTIALS` is link to your database.

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run production server
```
npm run server
```

### Run development server
```
npm run dev
```

## Project license is located [here](https://github.com/Ookldev/shortenurl/blob/master/LICENSE)
