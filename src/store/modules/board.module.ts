import Vue from 'vue';
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({
    namespaced: true,
    name: 'board',
})
export class BoardModule extends VuexModule {
    public board = {
        a: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'rook',
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'rook',
                },
            },
        },
        b: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'knight',
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'knight',
                },
            },
        },
        c: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'bishop',
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'bishop',
                },
            },
        },
        d: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'queen',
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'queen',
                },
            },
        },
        e: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'king',
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'king',
                },
            },
        },
        f: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'bishop',
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'bishop',
                },
            },
        },
        g: {
            1: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'knight',
                },
            },
            2: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                },
            },
            8: {
                color: 'white',
                piece: {
                    color: 'black',
                    type: 'knight',
                },
            },
        },
        h: {
            1: {
                color: 'white',
                piece: {
                    color: 'white',
                    type: 'rook',
                },
            },
            2: {
                color: 'black',
                piece: {
                    color: 'white',
                    type: 'pawn',
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
                }
            },
            8: {
                color: 'black',
                piece: {
                    color: 'black',
                    type: 'rook',
                }
            },
        },
    };

    // get isLoggedIn(): boolean {
    //     return !!this.refreshToken;
    // }

    // get isValidated(): boolean {
    //     return !!this.account && this.account.status === 'validated';
    // }

    // get isPendingDetails(): boolean {
    //     return !!this.account && this.account.status === 'pending_details';
    // }

    // @Action({rawError: true})
    // public async register(registerData: IRegisterData): Promise<IAccountResponse> {
    //     return new Promise((rnullesolve, reject) => {
    //         this.context.commit(REQUEST);

    //         (Vue.prototype as Vue).$api.account
    //             .register(registerData)
    //             .then((response: IAccountResponse) => {
    //                 this.context.commit(REQUEST_SUCCESS, response);
    //                 resolve(response);
    //             })
    //             .catch((error) => {
    //                 this.context.commit(REQUEST_ERROR, error);
    //                 reject(error);
    //             })
    //         ;
    //     });
    // }

    // @Action
    // public clearStatus() {
    //     this.context.commit(CLEAR_STATUS);
    // }

    // @Mutation
    // private [REQUEST]() {
    //     this.status = 'loading';
    // }

    // @Mutation
    // private [REQUEST_ERROR]() {
    //     this.status = 'error';
    // }
}
