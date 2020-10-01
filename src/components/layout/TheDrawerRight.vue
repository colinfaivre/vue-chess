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
          Round {{round}}
        </v-list-item>

        <v-list-item link>
          {{playerHasToPlay}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import { BoardModule } from '@/store/modules';
const boardModule = namespace('board');
import { LayoutModule } from '@/store/modules';
const layoutModule = namespace('layout');

@Component<TheDrawerRight>({
  components: {
  },
})
export default class TheDrawerRight extends Vue {
  @layoutModule.State
  private drawerRightIsOpened!: boolean;

  @boardModule.State
  private round!: number;

  @boardModule.State
  private hasToPlay!: string;

  get playerHasToPlay() {
    return this.hasToPlay === 'white' ? 'White to play' : 'Black to play';
  }

  get opened() {
    return this.drawerRightIsOpened;
  }

  set opened(value: boolean) {
    const layoutModule = getModule(LayoutModule, this.$store);
    layoutModule.setDrawerRight(value);
  }
}
</script>
