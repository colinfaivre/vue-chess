<template>
  <v-container class="fill-height d-flex justify-center board-background">
    <div class="board elevation-4">
      <div
        class="board-row"
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
      >
        <div
          v-for="(cell, columnIndex) in row"
          :key="columnIndex"
          class="cell"
          :class="`cell--${cell.color}`"
        >
          <piece
            v-if="cell.piece"
            :color="cell.piece.color"
            :type="cell.piece.type"
            :selected="cell.piece.selected"
            :cell="{rowIndex, columnIndex}"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from 'vuex-class';
const boardModule = namespace('board');

import Piece from "@/components/Piece.vue";

@Component<Board>({
  components: {
    Piece,
  },
})
export default class Board extends Vue {
  @boardModule.State
  private board!:any;
}
</script>

<style scoped lang="scss">
.board-background {
  background-color: #dfdfdf;
}
.board {
  height: 400px;
  width: 400px;
  background-color: #d1d1d1;
  display: flex;
}
.board-row {
  display: flex;
  flex-direction: column-reverse;
  width: 400px;
}

.cell {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell--white {
  background-color: #e2d7d7;
}
.cell--black {
  background-color: #74514e;
}
</style>
