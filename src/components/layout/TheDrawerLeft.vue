<template>
    <v-navigation-drawer
      v-model="opened"
      app
      color="blue-grey darken-4"
      dark
    >
      <v-list dense>
        <v-list-item class="pt-1 pb-3">
            <v-icon color="blue-grey">
                mdi-chess-knight
            </v-icon>

            <h3 class="ml-2 blue-grey--text">Vue-chess</h3>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>New game</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import { LayoutModule } from '@/store/modules';
const layoutModule = namespace('layout');

@Component<TheDrawerLeft>({
  components: {
  },
})
export default class TheDrawerLeft extends Vue {
  @layoutModule.State
  private drawerLeftIsOpened!: boolean;

  get opened() {
    return this.drawerLeftIsOpened;
  }

  set opened(value: boolean) {
    const layoutModule = getModule(LayoutModule, this.$store);
    layoutModule.setDrawerLeft(value);
  }
}
</script>
