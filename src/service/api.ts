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

interface MeData extends BaseData {
    user: {
        username: string;
        name: string;
        chip: number;
    }
}

export function me(): Promise<BaseResponse<MeData>> {
    return ajax({
        url: '/me',
    });
}

export function logout(): Promise<BaseResponse<BaseData>> {
    return ajax({
        url: '/logout',
    });
}

export interface Room {
    people: number;
    name: string;
    description: string;
}

interface GetAllRoomsData extends BaseData {
    rooms: Room[];
}

export function getAllRooms(): Promise<BaseResponse<GetAllRoomsData>> {
    return ajax({
        url: '/room',
    });
}

interface CreateRoomData extends BaseData {
    room: Room;
}

export function createRoom(roomName: string, description: string):
    Promise<BaseResponse<CreateRoomData>> {
    return ajax({
        method: 'post',
        url: '/room',
        data: {
            roomName,
            description,
        },
    });
}
