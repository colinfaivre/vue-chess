import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

import {
    ICell,
    ICellPosition,
    IPiece,
} from '@/types';

import {
    SELECT_PIECE,
    UNSELECT_ALL_PIECES,
    SHOW_POSSIBLE_MOVES,
    HIDE_POSSIBLE_DESTINATIONS,
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

import initialBoard from '@/data/initialBoard';

@Module({
    namespaced: true,
    name: 'board',
})
export class BoardModule extends VuexModule {
    public board: ICell[][] = initialBoard;
    public hasToPlay: string = 'white';
    public selectedPiece: IPiece|null = null;

    // Getter definition
    // get isLoggedIn(): boolean {
    //     return !!this.refreshToken;
    // }

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
    public selectPiece(cellPosition: ICellPosition) {
        this.context.commit(UNSELECT_ALL_PIECES);
        this.context.commit(HIDE_POSSIBLE_DESTINATIONS);
        if (this.hasToPlay === this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece!.color) {
            this.context.commit(SELECT_PIECE, cellPosition);
            this.context.commit(SHOW_POSSIBLE_MOVES, cellPosition);
        }
    }
}
