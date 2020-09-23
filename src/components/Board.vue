<template>
  <v-container class="fill-height d-flex flex-column justify-center board-background">
    <div class="board elevation-4">
      <div v-if="hasToPlay === 'black'" class="has-to-play has-to-play--black">

      </div>
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
          <div
            v-if="cell.possibleDestination"
            class="possible-destination"
          >
          </div>
        </div>
      </div>

      <div v-if="hasToPlay === 'white'" class="has-to-play has-to-play--white">
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from 'vuex-class';
const boardModule = namespace('board');

import {
    ICell,
} from '@/types';

import Piece from "@/components/Piece.vue";

@Component<Board>({
  components: {
    Piece,
  },
})
export default class Board extends Vue {
  @boardModule.State
  private board!: ICell[][];

  @boardModule.State
  private hasToPlay!: string;
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
  position: relative;
}
.has-to-play {
  
  position: absolute;
  height: 5px;
  opacity: .6;
  width: 100%;
  background-color: #65d6a7;

  &--black {
    top: -5px;
  }

  &--white {
    bottom: -5px;
  }
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

  &--white {
    background-color: #e2d7d7;
  }
  &--black {
    background-color: #74514e;
  }

  .possible-destination {
    width: 35%;
    height: 35%;
    border-radius: 50%;
    background-color: #65d6a7;

    &:hover {
      background-color: #4ea782;
      cursor: pointer;
    }
  }
}

</style>
