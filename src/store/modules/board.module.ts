import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

import {
    IBoard,
    IRow,
    ICell,
    ICellPosition,
    IPiece,
} from '@/types';

import {
    SELECT_PIECE,
    UNSELECT_ALL_PIECES,
    SHOW_POSSIBLE_MOVES,
} from '@/types/store/mutations/board.mutations';

@Module({
    namespaced: true,
    name: 'board',
})
export class BoardModule extends VuexModule {
    public hasToPlay: string = 'white';

    public selectedPiece: IPiece|null = null;

    public board: ICell[][] = [
        [
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'rook',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'rook',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'knight',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'knight',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'bishop',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'bishop',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'queen',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'queen',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'king',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'king',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'bishop',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'bishop',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'knight',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'knight',
                    selected: false,
                },
            },
        ],
        [
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'rook',
                    selected: false,
                },
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: null,
            },
            {
                color: 'white',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                }
            },
            {
                color: 'black',
                possibleDestination: false,
                piece: {
                    color: 'black',
                    type: 'rook',
                    selected: false,
                }
            },
        ],
    ];

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
    private [SELECT_PIECE](cellPosition: ICellPosition) {
        if (this.hasToPlay === this.board[cellPosition.rowIndex][cellPosition.columnIndex].piece!.color) {
            this.board[cellPosition.rowIndex][cellPosition.columnIndex].piece!.selected = true;
            this.selectedPiece = this.board[cellPosition.rowIndex][cellPosition.columnIndex].piece;
        }
    }

    @Mutation
    private [SHOW_POSSIBLE_MOVES](cellPosition: ICellPosition) {
        if (this.selectedPiece) {
            switch (this.selectedPiece.type) {
                case 'rook':
                    console.log('rook');
                    break;
                case 'knight':
                    console.log('knight');
                    break;
                case 'bishop':
                    console.log('bishop');
                    break;
                case 'queen':
                    console.log('queen');
                    break;
                case 'king':
                    console.log('king');
                    break;
                case 'pawn':
                    console.log('pawn', cellPosition);
                    break;
            }
        }
        
    }

    @Action({ rawError: true })
    public selectPiece(cellPosition: ICellPosition) {
        this.context.commit(UNSELECT_ALL_PIECES);
        this.context.commit(SELECT_PIECE, cellPosition);
        this.context.commit(SHOW_POSSIBLE_MOVES, cellPosition);
    }
}
