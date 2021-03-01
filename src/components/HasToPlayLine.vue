<template>
  <div
    v-if="hasToPlay === color"
    :class="lineClasses"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BoardModule } from '@/store/modules';

@Component<HasToPlayLine>({})
export default class HasToPlayLine extends Vue {
  get hasToPlay() {
    return BoardModule.hasToPlay;
  }

  @Prop({
      type: String,
      required: true,
  })
  public color!: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  public isChecked!: boolean;

  @Prop({
    type: Boolean,
    required: false,
  })
  public isCheckMated!: boolean;

  get lineClasses() {
    return {
      'has-to-play': true,
      'has-to-play--white': this.color === 'white',
      'has-to-play--black': this.color === 'black',
      'has-to-play--checked': this.isChecked,
      'has-to-play--checkmated': this.isCheckMated,
    }
  }
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

  &--checked {
    background-color: orange;
  }

  &--checkmated {
    background-color: red;
  }
}
</style>
