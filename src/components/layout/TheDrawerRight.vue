<template>
    <v-navigation-drawer
      v-model="drawerRightIsOpened"
      right
      app
      color="blue-grey darken-4"
      dark
    >
      <v-list dense>
        <v-list-item link>
          Round {{round}}
        </v-list-item>

        <v-list-item link>
          {{playerHasToPlay}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {namespace} from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import { BoardModule } from '@/store/modules';
const boardModule = namespace('board');

@Component<TheDrawerRight>({
  components: {
  },
})
export default class TheDrawerRight extends Vue {
  public drawerRightIsOpened: boolean = true;

  @boardModule.State
  private round!: number;

  @boardModule.State
  private hasToPlay!: string;

  get playerHasToPlay() {
    return this.hasToPlay === 'white' ? 'White to play' : 'Black to play';
  }
}
</script>
