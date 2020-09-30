<template>
  <v-app>
    <the-app-bar/>

    <the-drawer-left :isOpened="drawerLeftIsOpened"/>

    <the-drawer-right :isOpened="drawerRightIsOpened"/>

    <v-main class="main">
      <board/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Board from './components/Board.vue';

import {namespace} from 'vuex-class';
import { LayoutModule } from '@/store/modules';
const layoutModule = namespace('layout');

import TheDrawerLeft from "@/components/layout/TheDrawerLeft.vue";
import TheDrawerRight from "@/components/layout/TheDrawerRight.vue";
import TheAppBar from "@/components/layout/TheAppBar.vue";

@Component<App>({
  components: {
    Board,
    TheDrawerLeft,
    TheDrawerRight,
    TheAppBar,
  },
})
export default class App extends Vue {
  @layoutModule.State
  private drawerLeftIsOpened!: boolean;

  @layoutModule.State
  private drawerRightIsOpened!: boolean;
}
</script>

<style scoped>
.main {
  background-color: #dfdfdf;
}
</style>
