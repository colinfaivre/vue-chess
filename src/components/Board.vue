<template>
  <div class="board">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  BoardModule,
  StockfishModule,
} from '@/store/modules';

import {
    ICell,
    ICellPosition,
    IPiece,
} from '@/store/modules/board/board';

import Piece from "@/components/Piece.vue";
import CapturedPiecesArea from "@/components/CapturedPiecesArea.vue";

@Component<BoardContainer>({
  components: {
    Piece,
    CapturedPiecesArea,
  },
})
export default class BoardContainer extends Vue {
  get board() {
    return BoardModule.board;
  }

  public selectDestination(cellPosition: ICellPosition) {
    BoardModule.selectDestination(cellPosition);
  }

  created() {
    StockfishModule.init();
  }
}
</script>

<style scoped lang="scss">
.board {
  display: flex;
  position: relative;
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
