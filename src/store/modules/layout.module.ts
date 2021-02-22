import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store'

import {
    TOGGLE_LEFT_DRAWER,
    TOGGLE_RIGHT_DRAWER,
    SET_DRAWER_LEFT,
    SET_DRAWER_RIGHT,
} from '@/types/store/mutations/layout.mutations';

@Module({
    dynamic: true,
    name: 'layout',
    store: store,
})
class Layout extends VuexModule {
    public drawerLeftIsOpened: boolean = false;
    public drawerRightIsOpened: boolean = false;

    @Mutation
    private [TOGGLE_LEFT_DRAWER]() {
        this.drawerLeftIsOpened = !this.drawerLeftIsOpened;
    }

    @Mutation
    private [TOGGLE_RIGHT_DRAWER]() {
        this.drawerRightIsOpened = !this.drawerRightIsOpened;
    }

    @Mutation
    private [SET_DRAWER_LEFT](value: boolean) {
        this.drawerLeftIsOpened = value;
    }

    @Mutation
    private [SET_DRAWER_RIGHT](value: boolean) {
        this.drawerRightIsOpened = value;
    }

    @Action({rawError: true})
    public toggleLeftDrawer(): void{
        this.context.commit(TOGGLE_LEFT_DRAWER);
    }

    @Action({rawError: true})
    public toggleRightDrawer(): void{
        this.context.commit(TOGGLE_RIGHT_DRAWER);
    }

    @Action({rawError: true})
    public setDrawerLeft(value: boolean): void{
        this.context.commit(SET_DRAWER_LEFT, value);
    }

    @Action({rawError: true})
    public setDrawerRight(value: boolean): void{
        this.context.commit(SET_DRAWER_RIGHT, value);
    }
}

export const LayoutModule = getModule(Layout);
