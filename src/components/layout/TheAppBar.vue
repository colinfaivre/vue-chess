<template>
  <v-app-bar
    app
    color="transparent"
    flat
    dark
  >
    <v-btn
      @click="toggleLeftDrawer()"
      icon
      color="blue-grey"
    >
      <v-icon>
        mdi-menu
      </v-icon>
    </v-btn>

    <v-spacer/>

    <v-btn
      @click="toggleRightDrawer()"
      icon
      color="blue-grey"
    >
      <v-icon>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { LayoutModule } from '@/store/modules';

@Component<AppBar>({})
export default class AppBar extends Vue {
  public toggleLeftDrawer() {
    LayoutModule.toggleLeftDrawer();
  }

  public toggleRightDrawer() {
    LayoutModule.toggleRightDrawer();
  }
};
</script>
