import axios, { AxiosInstance } from 'axios';
import { IRepository } from './IRepository';
import { IRecord } from '../../Models/record';
import { LoginData } from '../../Pages/Login/login.action';
import { IStatistics } from '../../Models/statistics';
import { ICategory } from '../../Models/category';

const tokenStorageKey = 'auth_token';

export class WebRepository implements IRepository {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `https://192.168.1.3:5001/api`,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.api.interceptors.request.use(config => {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem(tokenStorageKey)}`
            return config
        });
    }

    Login(user: LoginData): Promise<string> {
        return this.api.post('account/login', user)
            .then((response) => {
                if (response.status === 200) {
                    return response.data.token;
                }

                throw response.status;
            });
    }

    AddItem(record: any): Promise<any> {
        return this.api.post('items', record)
            .then((response) => {
                if (response.status === 200) {
                    return;
                }

                throw response.status;
            });
    }

    GetItems(): Promise<IRecord[]> {
        return this.api.get('items')
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })

    }

    GetToken(): string | null {
        return localStorage.getItem(tokenStorageKey);
    }
    SaveToken(token: string) {
        localStorage.setItem(tokenStorageKey, token);
    }
    RemoveToken() {
        localStorage.removeItem(tokenStorageKey);
    }

    GetUserInfo() {
        return this.api.get('account/me')
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })

    }

    GetCategories(): Promise<ICategory[]> {
        return this.api.get('categories')
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })
    }

    GetStatistics(): Promise<IStatistics> {
        return this.api.get('statistics')
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })
    }
}