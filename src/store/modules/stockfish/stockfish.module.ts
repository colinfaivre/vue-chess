import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import {BoardModule} from '@/store/modules';
import store from '@/store';

const stockfishWorker = new Worker('stockfish.js/stockfish.js', {type: 'module'});

import stockfishMutations from '@/store/modules/stockfish/stockfish.mutations';

@Module({
    dynamic: true,
    name: 'stockfish',
    store: store,
})
class Stockfish extends VuexModule {
    public computerLevel: number = 1;

    @Mutation
    private [stockfishMutations.SET_COMPUTER_LEVEL](level: number) {
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
                BoardModule.stockfishPlays(e.data.split(' ')[1])
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
        this.context.commit(stockfishMutations.SET_COMPUTER_LEVEL, level);
    }
}

export const StockfishModule = getModule(Stockfish);
