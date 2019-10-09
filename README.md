# quizlunch

> My rad Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# kill
sudo kill -9 $(sudo lsof -t -i:3000)
sudo fuser -k -n tcp 80
sudo service httpd start