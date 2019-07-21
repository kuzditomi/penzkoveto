import { ICategory } from "./category";

export interface IRecord {
    id: string;
    description: string;
    cost: number;
    type: string;
    date: string;
    category: ICategory;
}