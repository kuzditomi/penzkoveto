import { IRepository } from "./IRepository";
import { IUserInfo } from "../../app.reducer";
import { ICategory } from "../../Models/category";
import { IRecord } from "../../Models/record";
import { IStatistics } from "../../Models/statistics";
import { LoginData } from "../../Pages/Login/login.action";
import { INewRecord, NewRecordType } from '../../Models/new-record';

const storageKey = "penzkoveto";

interface IPenzkovezoStorage {
    userInfo?: IUserInfo;
    items: IStoredRecord[];
}

const itemTypes = {
    [NewRecordType.Income] : "Income",
    [NewRecordType.Spending]: "Expense"
};
   
const categoryNames = ['Bills', 'Clothing', 'Food', 'Fun', 'Grocery', 'Health', 'Transportation', 'Other'];
const categories = categoryNames.map((category, index) => ({
    id: index,
    name: category,
    color: '#000000'
}));

interface IStoredRecord {
    id: string;
    description: string;
    cost: number;
    type: NewRecordType;
    date: string;
    categoryId: number;
}

export class LocalStorageRepository implements IRepository {
    private data: IPenzkovezoStorage;
    private idCounter: number;

    constructor() {
        const data = window.localStorage.getItem(storageKey);

        if (!data) {
            this.data = {
                items: []
            };
            this.idCounter = 1;
        } else {
            this.data = JSON.parse(data);
            this.idCounter = this.data.items.length > 0 ? Number(this.data.items[this.data.items.length - 1].id) + 1 : 1;
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
        return (this.data.userInfo && this.data.userInfo.userName) || null;
    }
    SaveToken(token: string): void {
        window.localStorage.setItem(storageKey, JSON.stringify(this.data));
    }
    RemoveToken(): void {
        window.localStorage.removeItem(storageKey);
        this.data = {
            items: []
        }
        this.idCounter = 1;
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
        const items = this.data.items.map(item =>({
            ...item,
            type: itemTypes[item.type],
            category: categories.find(c => c.id === item.categoryId) as ICategory
        }));

        return Promise.resolve(items);
    }
    AddItem(item: INewRecord): Promise<any> {
        const newRecord: IStoredRecord = {
            id: (this.idCounter++).toString(),
            description: item.name,
            date: new Date().toUTCString(),
            cost: item.cost,
            categoryId: item.categoryId,
            type: item.type
        }

        this.data.items = [...this.data.items, newRecord];
        this.save();
        return Promise.resolve();
    }

    GetStatistics(): Promise<IStatistics> {
        const statistics = this.data.items.reduce((stats: any, item)=>{
            if(!stats[item.categoryId]){
                stats[item.categoryId] = 0;
            }

            stats[item.categoryId] += item.cost;

            return stats;
        },{});
        
        const categoryStatistics = Object.keys(statistics).map(categoryId =>({
            category: categories.find(c => c.id === Number(categoryId)) as ICategory,
            totalAmount: statistics[categoryId]
        }));

        return Promise.resolve({
            categoryStatistics
        });
    }

    private save() {
        window.localStorage.setItem(storageKey, JSON.stringify(this.data));
    }
}