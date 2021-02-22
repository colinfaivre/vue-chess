<template>
    <v-navigation-drawer
      v-model="opened"
      right
      app
      color="blue-grey darken-4"
      dark
    >
      <v-list dense>
        <v-list-item link>
          Computer level : {{computerLevel}}
        </v-list-item>

        <v-list-item link>
          Round {{round}}
        </v-list-item>

        <v-list-item link>
          {{playerHasToPlay}}
        </v-list-item>
      </v-list>

      <div class="ml-4 white--text">
        <div v-for="(move, index) in moves" :key="index">
          <v-icon small :color="moveColor(index)">
            mdi-brightness-1
          </v-icon>
          {{index + 1}}. {{move}}
        </div>
      </div>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  BoardModule,
  StockfishModule,
  LayoutModule,
} from '@/store/modules';

@Component<TheDrawerRight>({})
export default class TheDrawerRight extends Vue {
  get drawerRightIsOpened() {
    return LayoutModule.drawerRightIsOpened;
  }

  get computerLevel() {
    return StockfishModule.computerLevel;
  }

  get round() {
    return BoardModule.round;
  }

  get hasToPlay(){
    return BoardModule.hasToPlay;
  }

  get moves() {
    return BoardModule.moves;
  }

  get playerHasToPlay() {
    return this.hasToPlay === 'white' ? 'White to play' : 'Black to play';
  }

  get opened() {
    return this.drawerRightIsOpened;
  }

  set opened(value: boolean) {
    LayoutModule.setDrawerRight(value);
  }

  public moveColor(index: number) {
    return index % 2 === 0 ? 'white' : 'black';
  }
}
</script>
