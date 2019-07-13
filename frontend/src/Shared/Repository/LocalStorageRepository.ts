import { IRepository } from "./IRepository";
import { IUserInfo } from "../../app.reducer";
import { ICategory } from "../../Models/category";
import { IRecord } from "../../Models/record";
import { IStatistics } from "../../Models/statistics";
import { LoginData } from "../../Pages/Login/login.action";

const storageKey = "penzkoveto";

interface IPenzkovezoStorage {
    userInfo?: IUserInfo;
    items: IRecord[];
}

const categories = [
    {
        id: 1,
        name: 'A',
        color: ''
    },
    {
        id: 2,
        name: 'B',
        color: ''
    },
    {
        id: 3,
        name: 'C',
        color: ''
    },
];

export class LocalStorageRepository implements IRepository {
    private data: IPenzkovezoStorage;

    constructor() {
        const data = window.localStorage.getItem(storageKey);

        if (!data) {
            this.data = {
                items: []
            }
        } else {
            this.data = JSON.parse(data);
        }
    }

    Login(login: LoginData): Promise<string> {
        this.data.userInfo = {
            id: '',
            userName: login.UserName
        };

        return Promise.resolve("");
    }

    GetToken(): string | null {
        return this.data.userInfo && this.data.userInfo.userName || null;
    }
    SaveToken(token: string): void {
        window.localStorage.setItem(storageKey, JSON.stringify(this.data));
    }
    RemoveToken(): void {
        window.localStorage.removeItem(storageKey);
        this.data = {
            items: []
        }
    }

    GetUserInfo(): Promise<IUserInfo> {
        if (this.data.userInfo) {
            return Promise.resolve(this.data.userInfo);
        }

        return Promise.reject();
    }
    GetCategories(): Promise<ICategory[]> {
        return Promise.resolve(categories);
    }
    GetItems(): Promise<IRecord[]> {
        return Promise.resolve(this.data.items || []);
    }
    AddItem(item: any): Promise<any> {
        item.category = categories.find(c => c.id === item.CategoryId);
        item.date = new Date().toUTCString();

        this.data.items = [...this.data.items, item];
        this.save();
        return Promise.resolve();
    }
    GetStatistics(): Promise<IStatistics> {
        return Promise.resolve({
            categoryStatistics: []
        });
    }

    private save(){
        window.localStorage.setItem(storageKey, JSON.stringify(this.data));
    }
}