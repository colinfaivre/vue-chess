import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

import {
    ISignupUserRequestParams,
    ISignupUserResponse,
    ILoginUserRequestParams,
    IUser,
} from '@/types';

import {
    SET_USER,
    SET_USERS,
    CLEAR_USER_DATA,
} from '@/types/store/mutations/user.mutations';

@Module({
    namespaced: true,
    name: 'user',
})
export class UserModule extends VuexModule {
    public user: IUser | null = null;
    public users: IUser[] = [];

    get loggedIn() {
        return !!this.user;
    }

    @Mutation
    private [SET_USER](userData: ISignupUserResponse) {
        console.log(userData);
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }

    @Mutation
    private [SET_USERS](userList: IUser[]) {
        // Filter out the authenticated used from the list of users
        userList = userList.filter(user => user.email !== this.user?.email);

        this.users = userList;
        localStorage.setItem('users', JSON.stringify(userList));
    }

    @Mutation
    private [CLEAR_USER_DATA]() {
        this.user = null;
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = null;
    }

    @Action({ rawError: true })
    public signup(params: ISignupUserRequestParams) {
        return axios
            .post('//localhost:3000/signup', params)
            .then(({data}) => {
                this.context.commit(SET_USER, data);
            });
    }

    @Action({ rawError: true })
    public login(params: ILoginUserRequestParams) {
        return axios
            .post('//localhost:3000/signin', params)
            .then(({data}) => {
                this.context.commit(SET_USER, data);
            });
    }

    @Action({ rawError: true })
    public logout() {
        this.context.commit(CLEAR_USER_DATA);
    }

    @Action({ rawError: true })
    public getAllUsers() {
        return axios
            .get('//localhost:3000/api/user/all')
            .then(({data}) => {
                this.context.commit(SET_USERS, data.data);
            });
    }
}
