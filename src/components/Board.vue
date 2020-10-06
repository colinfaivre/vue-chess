<template>
  <v-container class="fill-height d-flex flex-column justify-center board-background">
    <div name="slide" class="board elevation-4">
      <div
        v-if="hasToPlay === 'black'"
        class="has-to-play has-to-play--black"
      />

      <div

        class="board-row"
        v-for="(column, columnIndex) in board"
        :key="columnIndex"
      >
        <div
          v-for="(cell, rowIndex) in column"
          :key="rowIndex"
          class="cell"
          :class="`cell--${cell.color}`"
        >
          
          <piece
            v-if="cell.piece"
            :color="cell.piece.color"
            :type="cell.piece.type"
            :selected="cell.piece.selected"
            :cell="{columnIndex, rowIndex}"
          />

          <div
            v-if="cell.possibleDestination"
            class="possible-destination"
            @click="selectDestination({columnIndex, rowIndex})"
          />

          <div
            v-if="cell.possibleKill"
            class="possible-kill"
            @click="selectDestination({columnIndex, rowIndex})"
          />
        </div>
      </div>

      <div
        v-if="hasToPlay === 'white'"
        class="has-to-play has-to-play--white"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import {
  BoardModule,
  StockfishModule,
} from '@/store/modules';
const boardModule = namespace('board');
const stockfishModule = namespace('stockfish');

import {
    ICell,
    ICellPosition,
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

  public selectDestination(cellPosition: ICellPosition) {
    const boardModule = getModule(BoardModule, this.$store);
    boardModule.selectDestination(cellPosition);
  }

  created() {
    const stockfishModule = getModule(StockfishModule, this.$store);
    stockfishModule.init();
  }
}
</script>

<style scoped lang="scss">
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
  border-radius: 2.5px;
  opacity: .6;
  width: 100%;
  background-color: #65d6a7;
  filter: blur(1px);
  z-index: 0;

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
  position: relative;

  &--white {
    background-color: #e2d7d7;
  }
  &--black {
    background-color:#526670;
  }

  .possible-destination, .possible-kill {
    width: 35%;
    height: 35%;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
    }
  }

  .possible-destination {
    background-color: #65d6a7;

    &:hover {
      background-color: #4ea782;
    }
  }

  .possible-kill {
    position: absolute;
    background-color: #d34444;
    opacity: .8;

    &:hover {
      background-color: #b32f2f;
    }
  }
}
</style>
