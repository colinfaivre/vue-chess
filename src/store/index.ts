import Vue from 'vue';
import Vuex from 'vuex';
import { IBoardState } from '@/store/modules/board/board.d.ts';
import { ILayoutState } from '@/store/modules/layout/layout.d.ts';
import { ISnackbarState } from '@/store/modules/snackbar/snackbar.d.ts';
import { IStockfishState } from '@/store/modules/stockfish/stockfish.d.ts';
import { IUserState } from '@/store/modules/user/user.d.ts';

Vue.use(Vuex);

export interface IRootState {
  board: IBoardState,
  layout: ILayoutState,
  snackbar: ISnackbarState,
  stockfish: IStockfishState,
  user: IUserState,
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
