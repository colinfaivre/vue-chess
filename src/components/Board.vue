<template>
  <v-container class="fill-height d-flex justify-center board-background">
    <div class="board elevation-4">
      <div class="board-row">
        <div class="cell cell--white">
          <rook color="black"/>
        </div>
        <div class="cell cell--black">
          <knight color="black"/>
        </div>
        <div class="cell cell--white">
          <bishop color="black"/>
        </div>
        <div class="cell cell--black">
          <queen color="black"/>
        </div>

        <div class="cell cell--white">
          <king color="black"/>
        </div>
        <div class="cell cell--black">
          <bishop color="black"/>
        </div>
        <div class="cell cell--white">
          <knight color="black"/>
        </div>
        <div class="cell cell--black">
          <rook color="black"/>
        </div>
      </div>

      <div class="board-row">
        <div class="cell cell--black">
          <pawn color="black"/>
        </div>
        <div class="cell cell--white">
          <pawn color="black"/>
        </div>
        <div class="cell cell--black">
          <pawn color="black"/>
        </div>
        <div class="cell cell--white">
          <pawn color="black"/>
        </div>

        <div class="cell cell--black">
          <pawn color="black"/>
        </div>
        <div class="cell cell--white">
          <pawn color="black"/>
        </div>
        <div class="cell cell--black">
          <pawn color="black"/>
        </div>
        <div class="cell cell--white">
          <pawn color="black"/>
        </div>
      </div>

      <div class="board-row">
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>

        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
      </div>

      <div class="board-row">
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>

        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
      </div>

      <div class="board-row">
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>

        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
      </div>

      <div class="board-row">
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>

        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
        <div class="cell cell--black"></div>
        <div class="cell cell--white"></div>
      </div>

      <div class="board-row">
        <div class="cell cell--white">
          <pawn color="white"/>
        </div>
        <div class="cell cell--black">
          <pawn color="white"/>
        </div>
        <div class="cell cell--white">
          <pawn color="white"/>
        </div>
        <div class="cell cell--black">
          <pawn color="white"/>
        </div>

        <div class="cell cell--white">
          <pawn color="white"/>
        </div>
        <div class="cell cell--black">
          <pawn color="white"/>
        </div>
        <div class="cell cell--white">
          <pawn color="white"/>
        </div>
        <div class="cell cell--black">
          <pawn color="white"/>
        </div>
      </div>

      <div class="board-row">
        <div class="cell cell--black">
          <rook color="white"/>
        </div>
        <div class="cell cell--white">
          <knight color="white"/>
        </div>
        <div class="cell cell--black">
          <bishop color="white"/>
        </div>
        <div class="cell cell--white">
          <queen color="white"/>
        </div>

        <div class="cell cell--black">
          <king color="white"/>
        </div>
        <div class="cell cell--white">
          <bishop color="white"/>
        </div>
        <div class="cell cell--black">
          <knight color="white"/>
        </div>
        <div class="cell cell--white">
          <rook color="white"/>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Rook from "@/components/Rook.vue";
import Knight from "@/components/Knight.vue";
import Bishop from "@/components/Bishop.vue";
import King from "@/components/King.vue";
import Queen from "@/components/Queen.vue";
import Pawn from "@/components/Pawn.vue";

@Component<Board>({
  components: {
    Rook,
    Knight,
    Bishop,
    King,
    Queen,
    Pawn,
  },
})
export default class Board extends Vue {
  public noteDialog: boolean = false;
  public commentDialog: boolean = false;
  public tab: number = 0;
}
</script>

<style scoped lang="scss">
.board-background {
  background-color: rgb(223, 223, 223);
}
.board {
  height: 800px;
  width: 800px;
  background-color: #d1d1d1;
}
.board-row {
  display: flex;
  width: 800px;
}

.cell {
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell--white {
  background-color: #e2d7d7;
}
.cell--black {
  height: 100px;
  width: 100px;
  background-color: rgb(116, 81, 78);
}
</style>
