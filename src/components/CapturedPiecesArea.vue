<template>
    <div  
      class="captured-pieces d-flex"
      :class="`captured-pieces--${side}`"
    >
      <div v-for="capturedPiece in capturedPieces" :key="capturedPiece">
        <piece :color="capturedPiece.color" :type="capturedPiece.type"/>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import {
  BoardModule,
} from '@/store/modules';
const boardModule = namespace('board');

import {
    ICell,
    ICellPosition,
    IPiece,
} from '@/types';

import Piece from "@/components/Piece.vue";

@Component<Board>({
  components: {
    Piece,
  },
})
export default class Board extends Vue {
  @Prop({
      type: String,
      required: true,
  })
  public side!: String;

  @boardModule.State
  private playerCapturedPieces!: IPiece[];

  @boardModule.State
  private computerCapturedPieces!: IPiece[];

  get capturedPieces() {
    if (this.side === 'computer') {
      return this.computerCapturedPieces;
    }

    if (this.side === 'player') {
      return this.playerCapturedPieces;
    }
  }
}
</script>

<style scoped lang="scss">
.captured-pieces {
  position: absolute;
  width: 100%;

  &--computer {
    top: -50px;
  }

  &--player {
    bottom: -50px;
  }
}
</style>
