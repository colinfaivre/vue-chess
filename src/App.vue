<template>
  <v-app>
    <the-app-bar/>

    <the-drawer-left/>

    <the-drawer-right/>

    <v-main class="main">
      <board-container/>
      {{ whiteBoardPieces }}
    </v-main>

    <the-footer/>

    <v-snackbar
      top
      :color="snackbarColor"
      v-model="showSnackbar"
    >
      <span
        v-html="snackbarMessage"
        class="mr-3"
      />

      <v-btn
          text
          icon
          @click="hideSnackbar()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {SnackbarModule} from '@/store/modules';
import {BoardModule} from '@/store/modules';

import BoardContainer from './components/BoardContainer.vue';
import TheDrawerLeft from "@/components/layout/TheDrawerLeft.vue";
import TheDrawerRight from "@/components/layout/TheDrawerRight.vue";
import TheAppBar from "@/components/layout/TheAppBar.vue";
import TheFooter from '@/components/layout/TheFooter.vue';

@Component<App>({
  components: {
    BoardContainer,
    TheDrawerLeft,
    TheDrawerRight,
    TheAppBar,
    TheFooter,
  },
})
export default class App extends Vue {
  get whiteBoardPieces() {
    return BoardModule.whiteBoardPieces;
  }

  get showSnackbarGetter() {
    return SnackbarModule.showSnackbar;
  }

  get snackbarMessage() {
    return SnackbarModule.snackbarMessage;
  }

  get snackbarColor() {
    return SnackbarModule.snackbarColor;
  }

  get showSnackbar() {
    return this.showSnackbarGetter;
  }

  set showSnackbar(value: any) {
    if (!value) {
      this.hideSnackbar();
    }
  }

  public hideSnackbar() {
    SnackbarModule.hide();
  }
}
</script>

<style scoped>
.main {
  background-color: #dfdfdf;
}
</style>
