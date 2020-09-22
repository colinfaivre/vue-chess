<template>
  <div
    class="piece-container"
    :class="{'selected': selected}"
    @click="selectPiece(cell)"
  >
    <img
      class="piece"
      :src="require(`../assets/pieces/${type}_${color}.svg`)"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class"
import { getModule } from 'vuex-module-decorators';
import BoardModule from '@/store/modules/board';

@Component<Piece>({
  components: {},
})
export default class Piece extends Vue {
  @Prop({
      type: String,
      required: true,
  })
  public color!: String;

  @Prop({
      type: String,
      required: true,
  })
  public type!: String;

  @Prop({
      type: Boolean,
      required: true,
  })
  public selected!: boolean;

  @Prop({
      type: Object,
      required: true,
  })
  public cell!: object;

  public selectPiece() {
    const boardModule = getModule(BoardModule, this.$store);
    boardModule.selectPiece(this.cell);
  }
}
</script>

<style scoped lang="scss">
.piece-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.selected {
    background-color: #65d6a7;
  }

  .piece {
    width: 100%;
    height: 100%;

    &:hover {
      opacity: .5;
      cursor: pointer;
    }
  }
}
</style>
