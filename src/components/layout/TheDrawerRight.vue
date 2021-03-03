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
          {{ $t('gameInfos.level') }} : {{computerLevel}}
        </v-list-item>

        <v-list-item link>
          {{ $t('gameInfos.round') }} {{round}}
        </v-list-item>

        <v-list-item
          :disabled="!isPlayerKingSideCastlingPossible"
          link
        >
          {{ $t('gameInfos.kingSideCastling') }}
        </v-list-item>

        <v-list-item
          :disabled="!isPlayerQueenSideCastlingPossible"
          link
        >
          {{ $t('gameInfos.queenSideCastling') }}
        </v-list-item>

        <v-list-item link>
          <span v-if="hasToPlay === 'black'">{{ $t('gameInfos.blackToPlay') }}</span>
          <span v-if="hasToPlay === 'white'">{{ $t('gameInfos.whiteToPlay') }}</span>
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

  get isPlayerKingSideCastlingPossible() {
    return BoardModule.isPlayerKingSideCastlingPossible
  }

  get isPlayerQueenSideCastlingPossible() {
    return BoardModule.isPlayerQueenSideCastlingPossible
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
