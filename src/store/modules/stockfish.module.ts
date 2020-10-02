import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

const stockfishWorker = new Worker('stockfish.js/stockfish.js', {type: 'module'});

import {
    SET_COMPUTER_LEVEL,
} from '@/types/store/mutations/stockfish.mutations';

@Module({
    namespaced: true,
    name: 'stockfish',
})
export class StockfishModule extends VuexModule {
    public computerLevel: number = 1;

    @Mutation
    private [SET_COMPUTER_LEVEL](level: number) {
        this.computerLevel = level;
    }

    @Action({ rawError: true })
    public guessNextMove(movesAsString: string) {
        console.log('moves', movesAsString);
        stockfishWorker.postMessage(`position startpos moves ${movesAsString}`);
        stockfishWorker.postMessage(`go movetime ${this.computerLevel * 1000}`);

        const context = this.context;

        stockfishWorker.onmessage = function(e) {
            if (e.data.split(' ')[0] === 'bestmove') {
                context.dispatch('board/stockfishPlays', e.data.split(' ')[1], {root: true});
            }
        }
    }

    @Action({ rawError: true })
    public init() {
        stockfishWorker.postMessage('uci');
        stockfishWorker.postMessage('ucinewgame');

        stockfishWorker.onmessage = function(e) {
            console.log(e.data);
        }
    }

    @Action({ rawError: true })
    public setComputerLevel(level: number) {
        this.context.commit(SET_COMPUTER_LEVEL, level);
    }
}
