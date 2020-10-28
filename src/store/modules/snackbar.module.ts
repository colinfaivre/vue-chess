import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

import {
    SET_PARAMS,
    SET_SHOW,
} from '@/types/store/mutations/snackbar.mutations';

import {
    ISnackbarDisplayParams,
} from '@/types';

@Module({
    namespaced: true,
    name: 'snackbar',
})
export class SnackbarModule extends VuexModule {
    public show: boolean = false;
    public message: string = '';
    public color: string = '';
    public position: string = 'top';


    get showSnackbar(): boolean {
        return this.show;
    }

    get snackbarMessage(): string {
        return this.message;
    }

    get snackbarColor(): string {
        return this.color;
    }

    get snackbarPosition(): string {
        return this.position;
    }

    @Action({rawError: true})
    public display(params: ISnackbarDisplayParams) {
        this.context.commit(SET_PARAMS, params);
        this.context.commit(SET_SHOW, true);
    }

    @Action({rawError: true})
    public displayError(message?: string|null) {
        this.context.commit(SET_PARAMS, {
            message: message ? message : 'Une erreur est survenue. Veuillez réessayer ulterieurement.',
            position: 'top',
            color: 'error',
        });
        this.context.commit(SET_SHOW, true);
    }

    @Action({rawError: true})
    public displaySuccess(message: string) {
        this.context.commit(SET_PARAMS, {
            message,
            position: 'top',
            color: 'success',
        });
        this.context.commit(SET_SHOW, true);
    }

    @Action({rawError: true})
    public hide() {
        this.context.commit(SET_SHOW, false);
    }

    @Mutation
    private [SET_PARAMS](params: ISnackbarDisplayParams) {
        this.message = params.message;
        this.color = params.color;
        this.position = params.position;
    }

    @Mutation
    private [SET_SHOW](show: boolean) {
        this.show = show;
    }
}
