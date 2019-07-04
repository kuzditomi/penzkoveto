import { ICategory } from "./category";

export interface IRecord {
    id: string;
    name: string;
    cost: number;
    type: string;
    date: string;
    category: ICategory;
}