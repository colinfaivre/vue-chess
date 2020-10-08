<template>
  <v-container class="fill-height d-flex flex-column justify-center">
    <div class="board-container elevation-4">

      <captured-pieces-area side="computer"/>
      
      <has-to-play-line color="black"/>

      <board/>

      <has-to-play-line color="white"/>

      <captured-pieces-area side="player"/>

    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import { StockfishModule } from '@/store/modules';
const stockfishModule = namespace('stockfish');

import Board from "@/components/Board.vue";
import CapturedPiecesArea from "@/components/CapturedPiecesArea.vue";
import HasToPlayLine from "@/components/HasToPlayLine.vue";

@Component<BoardContainer>({
  components: {
    Board,
    CapturedPiecesArea,
    HasToPlayLine,
  },
})
export default class BoardContainer extends Vue {
  created() {
    const stockfishModule = getModule(StockfishModule, this.$store);
    stockfishModule.init();
  }
}
</script>

<style scoped lang="scss">
.board-container {
  height: 400px;
  width: 400px;
  position: relative;
}
</style>
