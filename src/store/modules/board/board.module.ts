import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { StockfishModule } from '@/store/modules';
import store from '@/store';

import boardSnapshotParser from '@/data/boardSnapshotParser';
import boardSerializer from '@/data/boardSerializer';

import {
    getANCoords,
    getMoveFromAN,
    destinationIsOnBoard,
} from '@/helpers/stockfish';

import {
    BLACK_PAWN_MOVES,
    WHITE_PAWN_MOVES,
    KNIGHT_MOVES,
    KING_MOVES,
    BISHOP_MOVES,
    ROOK_MOVES,
    QUEEN_MOVES,
} from '@/data/piecesMoves';

import {
    IBoardState,
    ICell,
    IPath,
    ICellPosition,
    IPiece,
    IMove,
} from '@/store/modules/board/board.d.ts';

import boardMutations from '@/store/modules/board/board.mutations';

@Module({
    dynamic: true,
    name: 'board',
    store: store,
})
class Board extends VuexModule implements IBoardState {
    public playerColor: string = 'white';
    public initialBoardSnapshot = [
        'rnbqkbnr',
        'pppppppp',
        '........',
        '........',
        '........',
        '........',
        'PPPPPPPP',
        'RNBQKBNR',
    ];
    public board: ICell[][] = boardSnapshotParser(this.initialBoardSnapshot);
    public hasToPlay: string = 'white';
    public selectedPiece: IPiece|null = null;
    public round: number = 1;
    public moves: string[] = [];
    public moveStart: string|null = null;
    public moveEnd: string|null = null;
    public playerCapturedPieces: IPiece[] = [];
    public computerCapturedPieces: IPiece[] = [];

    get boardPieces() {
        let pieces: IPiece[] = [];

        for (const column in this.board) {
            for (const row in this.board[column]) {
                if (this.board[column][row].piece !== null) {
                    pieces.push(this.board[column][row].piece!);
                }
            }
        }

        return pieces;
    }

    get whiteBoardPieces() {
        return this.boardPieces.filter(piece => piece.color === 'white');
    }

    get blackBoardPieces() {
        return this.boardPieces.filter(piece => piece.color === 'black');
    }

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

    get movesAsString() {
        let movesString = '';

        for (let i = 0; i < this.moves.length; i++) {
            movesString += this.moves[i] + ' ';
        }

        return movesString;
    }

    @Mutation
    private [boardMutations.UNSELECT_ALL_PIECES]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                if (this.board[row][column].piece !== null) {
                    this.board[row][column].piece!.selected = false;
                }
            }
        }
    }

    @Mutation
    private [boardMutations.HIDE_POSSIBLE_DESTINATIONS]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                this.board[row][column].possibleDestination = false;
            }
        }
    }

    @Mutation
    private [boardMutations.HIDE_POSSIBLE_KILLS]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                this.board[row][column].possibleKill = false;
            }
        }
    }

    @Mutation
    private [boardMutations.SELECT_PIECE](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece!.selected = true;
        this.selectedPiece = this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece;

    }

    @Mutation
    private [boardMutations.ADD_PIECE](path: IPath) {
        if (this.board[path.to.columnIndex][path.to.rowIndex].piece !== null) {
            if (this.hasToPlay === 'white') {
                this.playerCapturedPieces.push(this.board[path.to.columnIndex][path.to.rowIndex].piece!);
                console.log('playerCapturedPieces', this.playerCapturedPieces);
            }

            if (this.hasToPlay === 'black') {
                this.computerCapturedPieces.push(this.board[path.to.columnIndex][path.to.rowIndex].piece!);
                console.log('computerCapturedPieces', this.computerCapturedPieces);
            }
        }
        this.board[path.to.columnIndex][path.to.rowIndex].piece = this.board[path.from.columnIndex][path.from.rowIndex].piece;
    }

    @Mutation
    private [boardMutations.REMOVE_PIECE_FROM](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece = null;
    }

    @Mutation
    private [boardMutations.TOGGLE_PLAYER]() {
        if (this.hasToPlay === 'white') {
            this.hasToPlay = 'black';
        } else {
            this.hasToPlay = 'white';
        }
    }

    @Mutation
    private [boardMutations.INCREMENT_ROUND]() {
        this.round++;
    }

    @Mutation
    private [boardMutations.SET_PLAYER_COLOR](color: string) {
        this.playerColor = color;
    }

    @Mutation
    private [boardMutations.ADD_MOVE](move: IMove) {
        this.moveStart = getANCoords(move.startPosition);
        this.moveEnd = getANCoords(move.endPosition);
        if (this.moveStart && this.moveEnd) {
            this.moves.push(this.moveStart + this.moveEnd);
        }
    }

    @Mutation
    private [boardMutations.RESET_GAME]() {
        this.board = boardSnapshotParser(this.initialBoardSnapshot);
        this.moves = [];
        this.round = 1;
    }

    @Mutation
    private [boardMutations.SHOW_POSSIBLE_MOVES](cellPosition: ICellPosition) {
        const validateMove = (columnMove: number, rowMove: number): string|object|undefined => {
            if (destinationIsOnBoard(cellPosition, columnMove, rowMove)) {
                const destinationCellIsFree = this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].piece === null;
                if (destinationCellIsFree) {
                    this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].possibleDestination = true;
                } else {
                    if (this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].piece?.color !== this.playerColor) {
                        this.board[cellPosition.columnIndex + columnMove][cellPosition.rowIndex + rowMove].possibleKill = true;

                        return 'stop';
                    }
                    // Stop seaching for new destinations as the previous was taken by a black or white piece
                    return 'stop';
                }
            }
        }

        if (this.selectedPiece) {
            switch (this.selectedPiece.type) {
                case 'rook':
                    for(const rookMoveSerie of ROOK_MOVES) {
                        for (const rookMove of rookMoveSerie) {
                            if(validateMove(...rookMove) === 'stop') {
                                break;
                            }
                        }
                    }
                    break;
                case 'knight':
                    for(const knightMoveSerie of KNIGHT_MOVES) {
                        for(const knightMove of knightMoveSerie) {
                            if(validateMove(...knightMove) === 'stop') {
                                break;
                            }
                        }
                    }
                    break;
                case 'bishop':
                    for(const bishopMoveSerie of BISHOP_MOVES) {
                        for(const bishopMove of bishopMoveSerie) {
                            if(validateMove(...bishopMove) === 'stop') {
                                break;
                            }
                        }
                    }
                    break;
                case 'queen':
                    for(const queenMoveSerie of QUEEN_MOVES) {
                        for(const queenMove of queenMoveSerie) {
                            if(validateMove(...queenMove) === 'stop') {
                                break;
                            }
                        }
                    }
                    break;
                case 'king':
                    for(const kingMoveSerie of KING_MOVES) {
                        for(const kingMove of kingMoveSerie) {
                            if(validateMove(...kingMove) === 'stop') {
                                break;
                            }
                        }
                    }
                    break;
                case 'pawn':
                    if (this.hasToPlay === 'white') {
                        // White pawn moves by one cell forward
                        if (this.board[cellPosition.columnIndex][cellPosition.rowIndex + 1].piece === null) {
                            this.board[cellPosition.columnIndex][cellPosition.rowIndex + 1].possibleDestination = true;
                        }
                        // White pawn moves by two cells forward
                        if (cellPosition.rowIndex === 1 && this.board[cellPosition.columnIndex][cellPosition.rowIndex + 2].piece === null) {
                            this.board[cellPosition.columnIndex][cellPosition.rowIndex + 2].possibleDestination = true;
                        }
                        // White pawn takes opponent on right/forward diagonal
                        if (this.board[cellPosition.columnIndex + 1][cellPosition.rowIndex + 1].piece !== null && this.board[cellPosition.columnIndex + 1][cellPosition.rowIndex + 1].piece?.color !== this.hasToPlay) {
                            this.board[cellPosition.columnIndex + 1][cellPosition.rowIndex + 1].possibleKill = true;
                        }
                        // White pawn takes opponent on left/forward diagonal
                        if (this.board[cellPosition.columnIndex - 1][cellPosition.rowIndex + 1].piece !== null && this.board[cellPosition.columnIndex - 1][cellPosition.rowIndex + 1].piece?.color !== this.hasToPlay) {
                            this.board[cellPosition.columnIndex - 1][cellPosition.rowIndex + 1].possibleKill = true;
                        }
                    } else {
                        if (this.board[cellPosition.columnIndex][cellPosition.rowIndex - 1].piece === null) {
                            this.board[cellPosition.columnIndex][cellPosition.rowIndex - 1].possibleDestination = true;
                        }

                        if (cellPosition.rowIndex === 6 && this.board[cellPosition.columnIndex][cellPosition.rowIndex - 2].piece === null) {
                            this.board[cellPosition.columnIndex][cellPosition.rowIndex - 2].possibleDestination = true;
                        }
                    }
                    break;
            }
        }
    }

    @Action({ rawError: true })
    public selectOrigin(from: ICellPosition) {
        this.context.commit(boardMutations.UNSELECT_ALL_PIECES);
        this.context.commit(boardMutations.HIDE_POSSIBLE_DESTINATIONS);
        this.context.commit(boardMutations.HIDE_POSSIBLE_KILLS);

        if (this.hasToPlay === this.board[from.columnIndex][from.rowIndex].piece!.color) {
            this.context.commit(boardMutations.SELECT_PIECE, from);
            this.context.commit(boardMutations.SHOW_POSSIBLE_MOVES, from);
        }
    }

    @Action({ rawError: true })
    public move(move: IMove) {
        // MOVE PIECE
        console.log('startPosition', move.startPosition);
        console.log('endPosition', move.endPosition);

        this.context.commit(boardMutations.ADD_MOVE, {startPosition: move.startPosition, endPosition: move.endPosition});
        this.context.commit(boardMutations.ADD_PIECE, {from: move.startPosition, to: move.endPosition});
        this.context.commit(boardMutations.REMOVE_PIECE_FROM, move.startPosition);
    }

    @Action({ rawError: true })
    public selectDestination(endPosition: ICellPosition) {
        this.move({startPosition: this.selectedPiecePosition, endPosition});

        // CLEAR BOARD
        this.context.commit(boardMutations.UNSELECT_ALL_PIECES);
        this.context.commit(boardMutations.HIDE_POSSIBLE_DESTINATIONS);
        this.context.commit(boardMutations.HIDE_POSSIBLE_KILLS);

        this.context.commit(boardMutations.INCREMENT_ROUND);
        this.context.commit(boardMutations.TOGGLE_PLAYER);

        StockfishModule.guessNextMove(this.movesAsString);
    }

    @Action({ rawError: true })
    public stockfishPlays(move: string) {
        this.move(getMoveFromAN(move));

        this.context.commit(boardMutations.INCREMENT_ROUND);
        this.context.commit(boardMutations.TOGGLE_PLAYER);
    }

    @Action({ rawError: true })
    public setPlayerColor(color: string) {
        this.context.commit(boardMutations.SET_PLAYER_COLOR, color);
    }

    @Action({ rawError: true })
    public startNewGame() {
        this.context.dispatch('stockfish/init', null, {root: true});
        this.context.commit(boardMutations.RESET_GAME);
    }
}

export const BoardModule = getModule(Board);
