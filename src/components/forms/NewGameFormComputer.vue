<template>
  <v-card>
    <v-card-title class="headline">
      New game VS computer
    </v-card-title>

    <v-card-text>
      <div class="mt-0 mb-10">
        Set your new game choosing the level and which color you will play with.
      </div>

      <v-radio-group
        v-model="level"
        label="Choose your level :"
      >
        <v-radio
          v-for="level in levels"
          :key="level.index"
          :label="`${level.name}`"
          :value="level.value"
        />
      </v-radio-group>

      <v-radio-group
        v-model="color"
        label="Choose your color :"
      >
        <v-radio
          v-for="color in colors"
          :key="color.index"
          :label="`${color.name}`"
          :value="color.value"
        />
      </v-radio-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn
        @click="cancel()"
        color="blue-grey darken-3"
        text
      >
        Cancel
      </v-btn>

      <v-btn
        @click="start()"
        color="blue-grey darken-3"
        class="white--text"
      >
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  BoardModule,
  StockfishModule,
} from '@/store/modules';

@Component<NewGameFormComputer>({})
export default class NewGameFormComputer extends Vue {
  public levels = [
    {
      name: 'Easy',
      value: 1,
    },
    {
      name: 'Medium',
      value: 2,
    },
    {
      name: 'Hard',
      value: 3,
    },
  ]

  get computerLevel() {
    return StockfishModule.computerLevel;
  }

  get level() {
    return this.computerLevel;
  }

  set level(value: number) {
    StockfishModule.setComputerLevel(value);
  }

  public colors = [
    {
      name: 'White',
      value: 'white',
    },
    {
      name: 'Black',
      value: 'black',
    },
  ]

  get playerColor() {
    return BoardModule.playerColor;
  }

  get color() {
    return this.playerColor;
  }

  set color(value: string) {
    BoardModule.setPlayerColor(value);
  }

  public cancel(): void {
    this.$emit('close');
  }

  public start(): void {
    this.$emit('close');
    BoardModule.startNewGame();
  }
}
</script>
