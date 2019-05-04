import axios from 'axios';
import BASE_URL from './config';

axios.defaults.withCredentials = true;

export interface BaseResponse<T> {
    data: T,
}

export interface BaseData {
    status: number;
    msg: string;
}

interface Config {
    url: string;
    method?: string;
    data?: {
        [field: string]: any;
    };
    headers?: {
        [field: string]: string;
    }
}

export function ajax(params: Config): Promise<any> {
    const method = params.method || 'get';
    return axios({
        method,
        baseURL: BASE_URL,
        url: params.url,
        params: method === 'get' ? params.data : undefined,
        data: method === 'post' ? params.data : undefined,
    });
}
