import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

import { ILayoutState } from '@/store/modules/layout/layout.d.ts';
import layoutMutations from '@/store/modules/layout/layout.mutations';

@Module({
    dynamic: true,
    name: 'layout',
    store: store,
})
class Layout extends VuexModule implements ILayoutState {
    public drawerLeftIsOpened: boolean = false;
    public drawerRightIsOpened: boolean = false;

    @Mutation
    private [layoutMutations.TOGGLE_LEFT_DRAWER]() {
        this.drawerLeftIsOpened = !this.drawerLeftIsOpened;
    }

    @Mutation
    private [layoutMutations.TOGGLE_RIGHT_DRAWER]() {
        this.drawerRightIsOpened = !this.drawerRightIsOpened;
    }

    @Mutation
    private [layoutMutations.SET_DRAWER_LEFT](value: boolean) {
        this.drawerLeftIsOpened = value;
    }

    @Mutation
    private [layoutMutations.SET_DRAWER_RIGHT](value: boolean) {
        this.drawerRightIsOpened = value;
    }

    @Action({rawError: true})
    public toggleLeftDrawer(): void{
        this.context.commit(layoutMutations.TOGGLE_LEFT_DRAWER);
    }

    @Action({rawError: true})
    public toggleRightDrawer(): void{
        this.context.commit(layoutMutations.TOGGLE_RIGHT_DRAWER);
    }

    @Action({rawError: true})
    public setDrawerLeft(value: boolean): void{
        this.context.commit(layoutMutations.SET_DRAWER_LEFT, value);
    }

    @Action({rawError: true})
    public setDrawerRight(value: boolean): void{
        this.context.commit(layoutMutations.SET_DRAWER_RIGHT, value);
    }
}

export const LayoutModule = getModule(Layout);
