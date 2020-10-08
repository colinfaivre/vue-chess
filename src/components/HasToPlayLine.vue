<template>
  <div
    v-if="hasToPlay === color"
    class="has-to-play"
    :class="`has-to-play--${color}`"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { BoardModule } from '@/store/modules';
const boardModule = namespace('board');

@Component<BoardContainer>({})
export default class BoardContainer extends Vue {
  @boardModule.State
  private hasToPlay!: string;

  @Prop({
      type: String,
      required: true,
  })
  public color!: String;
}
</script>

<style scoped lang="scss">
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
</style>
