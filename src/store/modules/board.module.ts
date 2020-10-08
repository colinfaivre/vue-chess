import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import {
    getANCoords, 
    getMoveFromAN,
} from '@/helpers/stockfish';

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
    HIDE_POSSIBLE_KILLS,
    REMOVE_PIECE_FROM,
    ADD_PIECE,
    TOGGLE_PLAYER,
    INCREMENT_ROUND,
    ADD_MOVE,
    SET_PLAYER_COLOR,
    RESET_GAME,
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
    private [HIDE_POSSIBLE_KILLS]() {
        for (const row in this.board) {
            for (const column in this.board[row]) {
                this.board[row][column].possibleKill = false;
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
    private [SET_PLAYER_COLOR](color: string) {
        this.playerColor = color;
    }

    @Mutation
    private [ADD_MOVE](move: IMove) {
        this.moveStart = getANCoords(move.startPosition);
        this.moveEnd = getANCoords(move.endPosition);
        if (this.moveStart && this.moveEnd) {
            this.moves.push(this.moveStart + this.moveEnd);
        }
    }

    @Mutation
    private [RESET_GAME]() {
        this.board = boardSnapshotParser(this.initialBoardSnapshot);
        this.moves = [];
        this.round = 1;
    }

    @Mutation
    private [SHOW_POSSIBLE_MOVES](cellPosition: ICellPosition) {
        const validateMove = (columnMove: number, rowMove: number): string|object|undefined => {
            // Check if move is not out of board
            const destinationCellIsInRow = cellPosition.rowIndex + rowMove >= 0 && cellPosition.rowIndex + rowMove <= 7;
            const destinationCellIsInColumn = cellPosition.columnIndex + columnMove >= 0 && cellPosition.columnIndex + columnMove <= 7;
            const destinationIsOnBoard = destinationCellIsInColumn && destinationCellIsInRow;

            if (destinationIsOnBoard) {
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
        this.context.commit(UNSELECT_ALL_PIECES);
        this.context.commit(HIDE_POSSIBLE_DESTINATIONS);
        this.context.commit(HIDE_POSSIBLE_KILLS);

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
        this.context.commit(HIDE_POSSIBLE_KILLS);

        this.context.commit(INCREMENT_ROUND);
        this.context.commit(TOGGLE_PLAYER);

        this.context.dispatch('stockfish/guessNextMove', this.movesAsString, {root: true});
    }

    @Action({ rawError: true })
    public stockfishPlays(move: string) {
        this.move(getMoveFromAN(move));

        this.context.commit(INCREMENT_ROUND);
        this.context.commit(TOGGLE_PLAYER);
    }

    @Action({ rawError: true })
    public setPlayerColor(color: string) {
        this.context.commit(SET_PLAYER_COLOR, color);
    }

    @Action({ rawError: true })
    public startNewGame() {
        this.context.dispatch('stockfish/init', null, {root: true});
        this.context.commit(RESET_GAME);
    }
}
