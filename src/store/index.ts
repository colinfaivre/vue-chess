import Vue from 'vue';
import Vuex from 'vuex';
import {
  BoardModule,
  StockfishModule,
  LayoutModule,
} from '@/store/modules';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    board: BoardModule,
    stockfish: StockfishModule,
    layout: LayoutModule,
  }
});
