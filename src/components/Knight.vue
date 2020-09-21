<template>
  <img
    class="piece"
    :src="require(`../assets/pieces/knight_${color}.svg`)"
  >
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';

@Component<Knight>({
  components: {},
})
export default class Knight extends Vue {
  @Prop({
      type: String,
      required: true,
  })
  public color!: String;
}
</script>

<style scoped lang="scss">
.piece {
  width: 90px;
  height: 90px;
}
</style>
