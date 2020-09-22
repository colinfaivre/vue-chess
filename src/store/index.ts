import Vue from 'vue';
import Vuex from 'vuex';
import Board from '@/store/modules/board';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    board: Board,
  }
});
