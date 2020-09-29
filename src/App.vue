<template>
  <v-app>
    <the-app-bar/>

    <the-drawer-left/>

    <the-drawer-right/>

    <v-main class="main">
      <board/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Board from './components/Board.vue';
const stockfishWorker = new Worker('stockfish.js/stockfish.js', {type: 'module'});

import TheDrawerLeft from "@/components/layout/TheDrawerLeft.vue";
import TheDrawerRight from "@/components/layout/TheDrawerRight.vue";
import TheAppBar from "@/components/layout/TheAppBar.vue";

@Component<App>({
  components: {
    Board,
    TheDrawerLeft,
    TheDrawerRight,
    TheAppBar,
  },
})
export default class App extends Vue {
  mounted() {
    stockfishWorker.postMessage('uci');
    stockfishWorker.postMessage('ucinewgame');
    stockfishWorker.postMessage('position startpos');
    stockfishWorker.postMessage('go movetime 1000');

    stockfishWorker.onmessage = (e) => {
      console.log(e.data);
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #dfdfdf;
}
</style>
