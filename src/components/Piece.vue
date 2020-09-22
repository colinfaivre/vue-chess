<template>
  <img
    class="piece"
    :src="require(`../assets/pieces/${type}_${color}.svg`)"
  >
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';

@Component<Bishop>({
  components: {},
})
export default class Bishop extends Vue {
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
}
</script>

<style scoped lang="scss">
.piece {
  width: 100%;
  height: 100%;

  &:hover {
    opacity: .5;
    cursor: pointer;
  }
}
</style>
