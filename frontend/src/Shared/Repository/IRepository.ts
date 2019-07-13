import { IRecord } from "../../Models/record";
import { LoginData } from "../../Pages/Login/login.action";
import { IStatistics } from "../../Models/statistics";
import { IUserInfo } from "../../app.reducer";
import { ICategory } from "../../Models/category";

export interface IRepository {
    Login(login: LoginData): Promise<string>;
    GetToken(): string | null;
    SaveToken(token: string): void;
    RemoveToken(): void;

    GetUserInfo(): Promise<IUserInfo>;

    GetCategories(): Promise<ICategory[]>;
    
    GetItems(): Promise<IRecord[]>;
    AddItem(item: any): Promise<any>;

    GetStatistics(): Promise<IStatistics>;
}
