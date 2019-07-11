import { ICategory } from "./category";

export interface IStatistics {
    categoryStatistics: ICategoryStatistics[]
}

export interface ICategoryStatistics {
    category?: ICategory;
    totalAmount: number;
}