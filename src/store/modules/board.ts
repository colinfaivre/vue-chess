import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({
    namespaced: true,
    name: 'board',
})
export default class Board extends VuexModule {
    public board = {
        a: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'rook',
                    selected: true,
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'black',
                piece: null,
            },
            4: {
                color: 'white',
                piece: null,
            },
            5: {
                color: 'black',
                piece: null,
            },
            6: {
                color: 'white',
                piece: null,
            },
            7: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'rook',
                    selected: false,
                },
            },
        },
        b: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'knight',
                    selected: false,
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'white',
                piece: null,
            },
            4: {
                color: 'black',
                piece: null,
            },
            5: {
                color: 'white',
                piece: null,
            },
            6: {
                color: 'black',
                piece: null,
            },
            7: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'knight',
                    selected: false,
                },
            },
        },
        c: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'bishop',
                    selected: false,
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: true,
                },
            },
            3: {
                color: 'black',
                piece: null,
            },
            4: {
                color: 'white',
                piece: null,
            },
            5: {
                color: 'black',
                piece: null,
            },
            6: {
                color: 'white',
                piece: null,
            },
            7: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'bishop',
                    selected: false,
                },
            },
        },
        d: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'queen',
                    selected: false,
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'white',
                piece: null,
            },
            4: {
                color: 'black',
                piece: null,
            },
            5: {
                color: 'white',
                piece: null,
            },
            6: {
                color: 'black',
                piece: null,
            },
            7: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'queen',
                    selected: false,
                },
            },
        },
        e: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'king',
                    selected: false,
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'black',
                piece: null,
            },
            4: {
                color: 'white',
                piece: null,
            },
            5: {
                color: 'black',
                piece: null,
            },
            6: {
                color: 'white',
                piece: null,
            },
            7: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'king',
                    selected: false,
                },
            },
        },
        f: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'bishop',
                    selected: false,
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'white',
                piece: null,
            },
            4: {
                color: 'black',
                piece: null,
            },
            5: {
                color: 'white',
                piece: null,
            },
            6: {
                color: 'black',
                piece: null,
            },
            7: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'bishop',
                    selected: false,
                },
            },
        },
        g: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'knight',
                    selected: false,
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'black',
                piece: null,
            },
            4: {
                color: 'white',
                piece: null,
            },
            5: {
                color: 'black',
                piece: null,
            },
            6: {
                color: 'white',
                piece: null,
            },
            7: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'knight',
                    selected: false,
                },
            },
        },
        h: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'rook',
                    selected: false,
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
                    selected: false,
                },
            },
            3: {
                color: 'white',
                piece: null,
            },
            4: {
                color: 'black',
                piece: null,
            },
            5: {
                color: 'white',
                piece: null,
            },
            6: {
                color: 'black',
                piece: null,
            },
            7: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'pawn',
                    selected: false,
                }
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'rook',
                    selected: false,
                }
            },
        },
    };

    // get isLoggedIn(): boolean {
    //     return !!this.refreshToken;
    // }

    @Action({ rawError: true })
    public selectPiece(cell: any): void {
        this.context.commit('select', cell);
    }

    @Action({ rawError: true })
    public move(moveInfos: any): void {
        this.context.commit('movePiece', moveInfos);
    }

    @Mutation
    private movePiece(moveInfos: any) {
        this.board[moveInfos.to.col][moveInfos.to.row].piece = this.board[moveInfos.from.col][moveInfos.from.row].piece;
        this.board[moveInfos.from.col][moveInfos.from.row].piece = null;
    }

    @Mutation
    private select(cell: any) {
        console.log(cell)
        this.board[cell.rowIndex][cell.columnIndex].piece.selected = true;
    }
}
