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

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store({});
