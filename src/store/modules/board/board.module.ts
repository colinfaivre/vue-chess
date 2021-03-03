import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { StockfishModule } from '@/store/modules';
import store from '@/store';

import boardSnapshotParser from '@/data/boardSnapshotParser';
import boardSerializer from '@/data/boardSerializer';

import {
    getANCoords,
    getMoveFromAN,
} from '@/helpers/stockfish';
import { getPossibleDestinations } from '@/helpers/getPossibleDestinations';

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
    public isPlayerKingSideCastlingPossible = true;
    public isPlayerQueenSideCastlingPossible = true;

    get boardPieces() {
        let pieces: IPiece[] = [];

        for (const column in this.board) {
            for (const row in this.board[column]) {
                if (this.board[column][row].piece !== null) {
                    const piece = {
                        ...this.board[column][row].piece!,
                        rowIndex: parseInt(row),
                        columnIndex: parseInt(column),
                    }

                    pieces.push(piece);
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

    get playerKingPosition(): ICellPosition {
        const kingPiece = this.whiteBoardPieces.filter(piece => piece.type === 'king');

        return {
            columnIndex: parseInt(kingPiece[0].columnIndex),
            rowIndex: parseInt(kingPiece[0].rowIndex),
        }
    }

    get opponentKingPosition(): ICellPosition {
        const kingPiece = this.blackBoardPieces.filter(piece => piece.type === 'king');

        return {
            columnIndex: parseInt(kingPiece[0].columnIndex),
            rowIndex: parseInt(kingPiece[0].rowIndex),
        }
    }

    get isPlayerKingChecked() {
        let check = false;

        for (const opponentPiece of this.blackBoardPieces) {
            const possibleDestinations = getPossibleDestinations(this.board, {
                columnIndex: opponentPiece.columnIndex,
                rowIndex: opponentPiece.rowIndex,
            })

            if (possibleDestinations.kills.length !== 0) {
                // check = possibleDestinations.kills.some(kill => kill.columnIndex == this.playerKingPosition.columnIndex && kill.rowIndex == this.playerKingPosition.rowIndex);
                for (const kill of possibleDestinations.kills) {
                    if (kill.columnIndex == this.playerKingPosition.columnIndex && kill.rowIndex == this.playerKingPosition.rowIndex) {
                        check = true;
                    }
                }
            }
        }

        return check;
    }

    get isOpponentKingChecked() {
        let check = false;

        for (const playerPiece of this.whiteBoardPieces) {
            const possibleDestinations = getPossibleDestinations(this.board, {
                columnIndex: playerPiece.columnIndex,
                rowIndex: playerPiece.rowIndex,
            })

            if (possibleDestinations.kills.length !== 0) {
                // check = possibleDestinations.kills.some(kill => kill.columnIndex == this.opponentKingPosition.columnIndex && kill.rowIndex == this.opponentKingPosition.rowIndex);
                for (const kill of possibleDestinations.kills) {
                    if (kill.columnIndex == this.opponentKingPosition.columnIndex && kill.rowIndex == this.opponentKingPosition.rowIndex) {
                        check = true;
                    }
                }
            }
        }

        return check;
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
    private [boardMutations.MARK_AS_POSSIBLE_DESTINATION](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].possibleDestination = true;
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
    private [boardMutations.MARK_AS_POSSIBLE_KILL](cellPosition: ICellPosition) {
        this.board[cellPosition.columnIndex][cellPosition.rowIndex].possibleKill = true;
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
    private [boardMutations.DISABLE_PLAYER_KING_SIDE_CASTLING] () {
        this.isPlayerKingSideCastlingPossible = false;
    }

    @Mutation
    private [boardMutations.DISABLE_PLAYER_QUEEN_SIDE_CASTLING]() {
        this.isPlayerQueenSideCastlingPossible = false;
    }

    @Action({ rawError: true })
    public showPossibleMoves(cellPosition: ICellPosition) {
        const possibleDestinations = getPossibleDestinations(this.board, cellPosition);

        if (possibleDestinations.normal.length !== 0) {
            possibleDestinations.normal.map(destination => {
                this.context.commit(boardMutations.MARK_AS_POSSIBLE_DESTINATION, {
                    columnIndex: destination.columnIndex,
                    rowIndex: destination.rowIndex,
                })
            })
        }

        if (possibleDestinations.kills.length !== 0) {
            possibleDestinations.kills.map(destination => {
                this.context.commit(boardMutations.MARK_AS_POSSIBLE_KILL, {
                    columnIndex: destination.columnIndex,
                    rowIndex: destination.rowIndex,
                })
            })
        }
    }

    @Action({ rawError: true })
    public selectOrigin(from: ICellPosition) {
        this.context.commit(boardMutations.UNSELECT_ALL_PIECES);
        this.context.commit(boardMutations.HIDE_POSSIBLE_DESTINATIONS);
        this.context.commit(boardMutations.HIDE_POSSIBLE_KILLS);

        if (this.hasToPlay === this.board[from.columnIndex][from.rowIndex].piece!.color) {
            this.context.commit(boardMutations.SELECT_PIECE, from);
            this.showPossibleMoves(from);
        }
    }

    @Action({ rawError: true })
    public move(moves: IMove[]) {
        // Takes moves as an array to be able to handle two moves at the same time for stockfish castling
        for (let move of moves) {
            this.context.commit(boardMutations.ADD_MOVE, {startPosition: move.startPosition, endPosition: move.endPosition});
            this.context.commit(boardMutations.ADD_PIECE, {from: move.startPosition, to: move.endPosition});
            this.context.commit(boardMutations.REMOVE_PIECE_FROM, move.startPosition);

            if (this.selectedPiece) {
                // Disable castling after a king move
                if (this.selectedPiece.type === 'king' && this.selectedPiece.color === 'white') {
                    this.context.commit(boardMutations.DISABLE_PLAYER_KING_SIDE_CASTLING);
                    this.context.commit(boardMutations.DISABLE_PLAYER_QUEEN_SIDE_CASTLING);
                }
                // handle rooks have moved
                if (this.selectedPiece.type === 'rook' && this.selectedPiece.color === 'white') {
                    if (move.startPosition.columnIndex === 0 && move.startPosition.rowIndex === 0) {
                        this.context.commit(boardMutations.DISABLE_PLAYER_QUEEN_SIDE_CASTLING);
                    }
                    if (move.startPosition.columnIndex === 7 && move.startPosition.rowIndex === 0) {
                        this.context.commit(boardMutations.DISABLE_PLAYER_KING_SIDE_CASTLING);
                    }
                }
            }
        }
    }

    @Action({ rawError: true })
    public selectDestination(endPosition: ICellPosition) {
        this.move([{startPosition: this.selectedPiecePosition, endPosition}]);

        // CLEAR BOARD
        this.context.commit(boardMutations.UNSELECT_ALL_PIECES);
        this.context.commit(boardMutations.HIDE_POSSIBLE_DESTINATIONS);
        this.context.commit(boardMutations.HIDE_POSSIBLE_KILLS);
        // PREPARE NEXT ROUND
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
