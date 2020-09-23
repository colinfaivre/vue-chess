import Vue from 'vue';
import Vuex from 'vuex';
import {BoardModule} from '@/store/modules';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    board: BoardModule,
  }
});
