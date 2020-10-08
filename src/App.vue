<template>
  <v-app>
    <the-app-bar/>

    <the-drawer-left/>

    <the-drawer-right/>

    <v-main class="main">
      <board-container/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BoardContainer from './components/BoardContainer.vue';

import TheDrawerLeft from "@/components/layout/TheDrawerLeft.vue";
import TheDrawerRight from "@/components/layout/TheDrawerRight.vue";
import TheAppBar from "@/components/layout/TheAppBar.vue";

@Component<App>({
  components: {
    BoardContainer,
    TheDrawerLeft,
    TheDrawerRight,
    TheAppBar,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
.main {
  background-color: #dfdfdf;
}
</style>
