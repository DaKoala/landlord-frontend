import ajax from './ajax';

interface BaseResponse<T> {
    data: T,
}

interface BaseData {
    status: number;
    msg: string;
}

export function login(username: string, password: string): Promise<BaseResponse<BaseData>> {
    return ajax({
        url: '/user',
        data: {
            username,
            password,
        },
    });
}

export function register(username: string, password: string): Promise<BaseResponse<BaseData>> {
    return ajax({
        method: 'post',
        url: '/user',
        data: {
            username,
            password,
        },
    });
}
