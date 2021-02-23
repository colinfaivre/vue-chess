import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import axios from 'axios';

import {
    IUserState,
    ISignupUserRequestParams,
    ISignupUserResponse,
    ILoginUserRequestParams,
    IUser,
} from '@/store/modules/user/user.d.ts';

import userMutations from '@/store/modules/user/user.mutations';

@Module({
    dynamic: true,
    name: 'user',
    store: store,
})
class User extends VuexModule implements IUserState{
    public user: IUser | null = null;
    public users: IUser[] = [];

    get loggedIn() {
        return !!this.user;
    }

    @Mutation
    private [userMutations.SET_USER](userData: ISignupUserResponse) {
        console.log(userData);
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }

    @Mutation
    private [userMutations.SET_USERS](userList: IUser[]) {
        // Filter out the authenticated used from the list of users
        userList = userList.filter(user => user.email !== this.user?.email);

        this.users = userList;
        localStorage.setItem('users', JSON.stringify(userList));
    }

    @Mutation
    private [userMutations.CLEAR_USER_DATA]() {
        this.user = null;
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = null;
    }

    @Action({ rawError: true })
    public signup(params: ISignupUserRequestParams) {
        return axios
            .post('//localhost:3000/signup', params)
            .then(({data}) => {
                this.context.commit(userMutations.SET_USER, data);
            });
    }

    @Action({ rawError: true })
    public login(params: ILoginUserRequestParams) {
        return axios
            .post('//localhost:3000/signin', params)
            .then(({data}) => {
                this.context.commit(userMutations.SET_USER, data);
            });
    }

    @Action({ rawError: true })
    public logout() {
        this.context.commit(userMutations.CLEAR_USER_DATA);
    }

    @Action({ rawError: true })
    public getAllUsers() {
        return axios
            .get('//localhost:3000/api/user/all')
            .then(({data}) => {
                this.context.commit(userMutations.SET_USERS, data.data);
            });
    }
}

export const UserModule = getModule(User);
