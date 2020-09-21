<template>
  <img
    class="piece"
    :src="require(`../assets/pieces/queen_${color}.svg`)"
  >
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';

@Component<Queen>({
  components: {},
})
export default class Queen extends Vue {
  public noteDialog: boolean = false;
  public commentDialog: boolean = false;
  public tab: number = 0;

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
