<template>
  <v-footer
    app
    color="transparent"
    flat
    dark
    inset
  >
    <v-btn
      @click="goToPreviousPosition()"
      icon
      color="blue-grey"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-btn>

    <v-spacer/>

    <v-btn
      icon
      color="blue-grey"
    >
      <v-icon>
        mdi-arrow-right
      </v-icon>
    </v-btn>

  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { BoardModule } from '@/store/modules';

@Component<TheFooter>({})
export default class TheFooter extends Vue {
  public goToPreviousPosition() {
    // BoardModule.goToPreviousPosition();
  }

  public goToNextPosition() {
    // BoardModule.goToNextPosition();
  }
};
</script>
