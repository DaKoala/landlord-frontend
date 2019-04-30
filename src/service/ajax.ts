import axios from 'axios';
import BASE_URL from './config';

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

export default function ajax(params: Config): Promise<any> {
    const method = params.method || 'get';
    return axios({
        method,
        baseURL: BASE_URL,
        url: params.url,
        params: method === 'get' ? params.data : undefined,
        data: method === 'post' ? params.data : undefined,
    });
}
