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
  private computerLevel!: number;

  @boardModule.State
  private round!: number;

  @boardModule.State
  private hasToPlay!: string;

  @boardModule.State
  private moves!: string[];

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

  public moveColor(index: number) {
    return index % 2 === 0 ? 'white' : 'black';
  }
}
</script>
