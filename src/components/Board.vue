<template>
  <v-container class="fill-height d-flex justify-center board-background">
    <div class="board elevation-4">
      <div
        class="board-row"
        v-for="(row, index) in board"
        :key="index"
      >
        <div
          v-for="(cell, index) in row"
          :key="index"
          class="cell"
          :class="`cell--${cell.color}`"
        >
          <piece
            v-if="cell.piece"
            :color="cell.piece.color"
            :type="cell.piece.type"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {namespace} from "vuex-class";
const board = namespace('board');

import {
  BoardModule,
} from '@/store/modules';

import Piece from "@/components/Piece.vue";

@Component<Board>({
  components: {
    Piece,
  },
})
export default class Board extends Vue {
  @board.State
  public board!:any;
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
