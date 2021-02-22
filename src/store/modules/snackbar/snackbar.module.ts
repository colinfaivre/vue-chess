import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

import snackbarMutations from '@/store/modules/snackbar/snackbar.mutations';
import {
    ISnackbarDisplayParams,
} from '@/store/modules/snackbar/snackbar.d.ts';

@Module({
    dynamic: true,
    name: 'snackbar',
    store: store,
})
class Snackbar extends VuexModule {
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
        this.context.commit(snackbarMutations.SET_PARAMS, params);
        this.context.commit(snackbarMutations.SET_SHOW, true);
    }

    @Action({rawError: true})
    public displayError(message?: string|null) {
        this.context.commit(snackbarMutations.SET_PARAMS, {
            message: message ? message : 'Une erreur est survenue. Veuillez réessayer ulterieurement.',
            position: 'top',
            color: 'error',
        });
        this.context.commit(snackbarMutations.SET_SHOW, true);
    }

    @Action({rawError: true})
    public displaySuccess(message: string) {
        this.context.commit(snackbarMutations.SET_PARAMS, {
            message,
            position: 'top',
            color: 'success',
        });
        this.context.commit(snackbarMutations.SET_SHOW, true);
    }

    @Action({rawError: true})
    public hide() {
        this.context.commit(snackbarMutations.SET_SHOW, false);
    }

    @Mutation
    private [snackbarMutations.SET_PARAMS](params: ISnackbarDisplayParams) {
        this.message = params.message;
        this.color = params.color;
        this.position = params.position;
    }

    @Mutation
    private [snackbarMutations.SET_SHOW](show: boolean) {
        this.show = show;
    }
}

export const SnackbarModule = getModule(Snackbar);
