<template>
  <transition name="slide" appear>
    <div
      class="piece-container"
      :class="{'selected': selected}"
      @click="selectOrigin(cell)"
    >
      <img
        class="piece"
        :src="require(`../assets/pieces/${type}_${color}.svg`)"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BoardModule } from '@/store/modules';
import { ICellPosition } from "@/types";

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
      required: false,
  })
  public selected!: boolean;

  @Prop({
      type: Object,
      required: false,
  })
  public cell!: ICellPosition;

  public selectOrigin() {
    BoardModule.selectOrigin(this.cell);
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

/* PIECES TRANSITIONS */
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  transition: all .4s ease;
}
</style>
