import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import {
    getANCoords, 
    getMoveFromAN,
} from '@/helpers/stockfish';

const stockfishWorker = new Worker('stockfish.js/stockfish.js', {type: 'module'});

import {
    ICell,
    IPath,
    ICellPosition,
    IPiece,
    IMove,
} from '@/types';

import {
    SELECT_PIECE,
    UNSELECT_ALL_PIECES,
    SHOW_POSSIBLE_MOVES,
    HIDE_POSSIBLE_DESTINATIONS,
    REMOVE_PIECE_FROM,
    ADD_PIECE,
    TOGGLE_PLAYER,
    INCREMENT_ROUND,
    ADD_MOVE,
} from '@/types/store/mutations/board.mutations';

import {
    BLACK_PAWN_MOVES,
    WHITE_PAWN_MOVES,
    KNIGHT_MOVES,
    KING_MOVES,
    BISHOP_MOVES,
    ROOK_MOVES,
    QUEEN_MOVES,
} from '@/data/piecesMoves';

import boardSnapshotParser from '@/data/boardSnapshotParser';
import boardSerializer from '@/data/boardSerializer';

@Module({
    namespaced: true,
    name: 'board',
})
export class BoardModule extends VuexModule {
    public initialBoardSnapshot = [
        'rnbqkbnr',
        'pppppppp',
        '........',
        '........',
        '........',
        '........',
        'PPPPPPPP',
        'RNBQKBNR',
    ]
    public board: ICell[][] = boardSnapshotParser(this.initialBoardSnapshot);
    public hasToPlay: string = 'white';
    public selectedPiece: IPiece|null = null;
    public round: number = 1;
    public moves: string = '';
    public moveStart: string|null = null;
    public moveEnd: string|null = null;

    get selectedPiecePosition() {
        for (const column in this.board) {
            for (const row in this.board[column]) {
                if (this.board[column][row].piece !== null && this.board[column][row].piece!.selected === true) {
                    return {
                        columnIndex: parseInt(column),
                        rowIndex: parseInt(row)
                    };
                }
            }
        }
    }

    @Mutation
    private [UNSELECT_ALL_PIECES]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                if (this.board[row][column].piece !== null) {
                    this.board[row][column].piece!.selected = false;
                }
            }
        }
    }

    @Mutation
    private [HIDE_POSSIBLE_DESTINATIONS]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                this.board[row][column].possibleDestination = false;
            }
        }
    }

    @Mutation
    private [SELECT_PIECE](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece!.selected = true;
        this.selectedPiece = this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece;
        
    }

    @Mutation
    private [ADD_PIECE](path: IPath) {
        this.board[path.to.columnIndex][path.to.rowIndex].piece = this.board[path.from.columnIndex][path.from.rowIndex].piece;
    }

    @Mutation
    private [REMOVE_PIECE_FROM](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece = null;
    }

    @Mutation
    private [TOGGLE_PLAYER]() {
        if (this.hasToPlay === 'white') {
            this.hasToPlay = 'black';
        } else {
            this.hasToPlay = 'white';
        }
    }

    @Mutation
    private [INCREMENT_ROUND]() {
        this.round++;
    }

    @Mutation
    private [ADD_MOVE](move: IMove) {
        this.moveStart = getANCoords(move.startPosition);
        this.moveEnd = getANCoords(move.endPosition);
        if (this.moveStart && this.moveEnd) {
            this.moves += `${this.moveStart + this.moveEnd} `;
        }
    }

    @Mutation
    private [SHOW_POSSIBLE_MOVES](cellPosition: ICellPosition) {
        const validateMove = (columnMove: number, rowMove: number): void => {
            const destinationCellIsInRow = cellPosition.rowIndex + rowMove >= 0 && cellPosition.rowIndex + rowMove <= 7;
            const destinationCellIsInColumn = cellPosition.columnIndex + columnMove >= 0 && cellPosition.columnIndex + columnMove <= 7;

            if (destinationCellIsInRow && destinationCellIsInColumn) {
                const destinationCellIsFree = this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].piece === null;
                if (destinationCellIsFree) {
                    this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].possibleDestination = true;
                }
            }
        }

        if (this.selectedPiece) {
            switch (this.selectedPiece.type) {
                case 'rook':
                    console.log('rook');
                    for(const rookMove of ROOK_MOVES) {
                        validateMove(...rookMove);
                    }
                    break;
                case 'knight':
                    console.log('knight', cellPosition);
                    for(const knightMove of KNIGHT_MOVES) {
                        validateMove(...knightMove);
                    }
                    break;
                case 'bishop':
                    console.log('bishop', cellPosition);
                    for(const bishopMove of BISHOP_MOVES) {
                        validateMove(...bishopMove);
                    }
                    break;
                case 'queen':
                    console.log('queen', cellPosition);
                    for(const queenMove of QUEEN_MOVES) {
                        validateMove(...queenMove);
                    }
                    break;
                case 'king':
                    console.log('king', cellPosition);
                    for(const kingMove of KING_MOVES) {
                        validateMove(...kingMove);
                    }
                    break;
                case 'pawn':
                    console.log('pawn', cellPosition);
                    if (this.hasToPlay === 'white') {
                        this.board[cellPosition.columnIndex][cellPosition.rowIndex + 1].possibleDestination = true;
                        this.board[cellPosition.columnIndex][cellPosition.rowIndex + 2].possibleDestination = true;
                    } else {
                        this.board[cellPosition.columnIndex][cellPosition.rowIndex - 1].possibleDestination = true;
                        this.board[cellPosition.columnIndex][cellPosition.rowIndex - 2].possibleDestination = true;
                    }
                    break;
            }
        }
    }

    @Action({ rawError: true })
    public selectOrigin(from: ICellPosition) {
        this.context.commit(UNSELECT_ALL_PIECES);
        this.context.commit(HIDE_POSSIBLE_DESTINATIONS);

        if (this.hasToPlay === this.board[from.columnIndex][from.rowIndex].piece!.color) {
            this.context.commit(SELECT_PIECE, from);
            this.context.commit(SHOW_POSSIBLE_MOVES, from);
        }
    }

    @Action({ rawError: true })
    public move(move: IMove) {
        // MOVE PIECE
        console.log('startPosition', move.startPosition);
        console.log('endPosition', move.endPosition);

        this.context.commit(ADD_MOVE, {startPosition: move.startPosition, endPosition: move.endPosition});
        this.context.commit(ADD_PIECE, {from: move.startPosition, to: move.endPosition});
        this.context.commit(REMOVE_PIECE_FROM, move.startPosition);
    }

    @Action({ rawError: true })
    public selectDestination(endPosition: ICellPosition) {
        this.move({startPosition: this.selectedPiecePosition, endPosition});

        // CLEAR BOARD
        this.context.commit(UNSELECT_ALL_PIECES);
        this.context.commit(HIDE_POSSIBLE_DESTINATIONS);

        this.context.commit(INCREMENT_ROUND);
        this.context.commit(TOGGLE_PLAYER);

        this.context.dispatch('askAIToGuessNextMove');
    }

    @Action({ rawError: true })
    public askAIToGuessNextMove(endPosition: ICellPosition) {
        console.log("moves", this.moves)
        console.log(`position startpos moves ${this.moves}`)
        stockfishWorker.postMessage(`position startpos moves ${this.moves}`);
        stockfishWorker.postMessage('go movetime 1000');

        const context = this.context;

        stockfishWorker.onmessage = function(e) {
            if (e.data.split(' ')[0] === 'bestmove') {
                context.dispatch('stockfishPlays', e.data.split(' ')[1]);
            }
        }
    }

    @Action({ rawError: true })
    public initStockfish() {
        stockfishWorker.postMessage('uci');
        stockfishWorker.postMessage('ucinewgame');

        stockfishWorker.onmessage = function(e) {
            console.log(e.data);
            if (e.data.split(' ')[0] === 'bestmove') {
                console.log(e.data.split(' ')[1]);
                
            }
        }
    }

    @Action({ rawError: true })
    public stockfishPlays(move: string) {
        this.move(getMoveFromAN(move));

        this.context.commit(INCREMENT_ROUND);
        this.context.commit(TOGGLE_PLAYER);
    }
}
