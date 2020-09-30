import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
    TOGGLE_LEFT_DRAWER,
    TOGGLE_RIGHT_DRAWER,
} from '@/types/store/mutations/layout.mutations';

@Module({
    namespaced: true,
    name: 'layout',
})
export class LayoutModule extends VuexModule {
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

    @Action({rawError: true})
    public toggleLeftDrawer(): void{
        this.context.commit(TOGGLE_LEFT_DRAWER);
    }

    @Action({rawError: true})
    public toggleRightDrawer(): void{
        this.context.commit(TOGGLE_RIGHT_DRAWER);
    }
}
