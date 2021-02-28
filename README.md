# vue-chess
![alt text](./public/img/app_screenshot.png?raw=true)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


pieces images :
https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces

stockfish.js library :
https://www.npmjs.com/package/stockfish

web workers in vue.js with worker-plugin from google :
https://braincoke.fr/blog/2020/03/use-web-workers-with-vue/#web-workers
https://github.com/GoogleChromeLabs/worker-plugin
https://logaretm.com/blog/2019-12-21-vuex-off-mainthread/

Stockfish commands :
$stockfish
>uci
>ucinewgame
>position startpos
>go movetime 1000
>position startpos moves e2e4
>go movetime 1000
>position startpos moves e2e4 e7e5
etc...

