import Vue from 'vue';
import Vuex from 'vuex';
import {
  BoardModule,
  StockfishModule,
  LayoutModule,
  UserModule,
  SnackbarModule,
} from '@/store/modules';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    board: BoardModule,
    stockfish: StockfishModule,
    layout: LayoutModule,
    user: UserModule,
    snackbar: SnackbarModule,
  }
});
