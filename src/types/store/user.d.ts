export interface ISignupUserRequestParams {
    email: string,
    password: string,
}

export interface ISignupUserResponse {
    email: string,
    token: string,
}

export interface ILoginUserRequestParams {
    email: string,
    password: string,
}

export interface IUser {
    email: string,
}
