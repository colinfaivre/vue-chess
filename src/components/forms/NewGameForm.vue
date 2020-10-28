<template>
  <v-card>
    <v-card-title class="headline">
      New game
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
import { Component, Vue, Prop } from "vue-property-decorator";

import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import {
  LayoutModule,
  BoardModule,
  StockfishModule,
} from '@/store/modules';
const layoutModule = namespace('layout');
const boardModule = namespace('board');
const stockfishModule = namespace('stockfish');

@Component<NewGameForm>({
  components: {
  },
})
export default class NewGameForm extends Vue {
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

  @stockfishModule.State
  private computerLevel!: number;

  get level() {
    return this.computerLevel;
  }

  set level(value: number) {
    const stockfishModule = getModule(StockfishModule, this.$store);
    stockfishModule.setComputerLevel(value);
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

  @boardModule.State
  private playerColor!: string;

  get color() {
    return this.playerColor;
  }

  set color(value: string) {
    const boardModule = getModule(BoardModule, this.$store);
    boardModule.setPlayerColor(value);
  }

  public cancel(): void {
    this.$emit('close');
  }

  public start(): void {
    this.$emit('close');
    const boardModule = getModule(BoardModule, this.$store);
    boardModule.startNewGame();
  }
}
</script>
