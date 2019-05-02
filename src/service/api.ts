import { BaseResponse, BaseData, ajax } from '@/service/ajax';

export function login(username: string, password: string): Promise<BaseResponse<BaseData>> {
    return ajax({
        method: 'post',
        url: '/login',
        data: {
            username,
            password,
        },
    });
}

export function register(username: string, password: string): Promise<BaseResponse<BaseData>> {
    return ajax({
        method: 'post',
        url: '/register',
        data: {
            username,
            password,
        },
    });
}

export function me(): Promise<BaseResponse<BaseData>> {
    return ajax({
        url: '/me',
    });
}
