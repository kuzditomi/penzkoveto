export enum NewRecordType {
    Spending = 0,
    Income = 1
}

export interface INewRecord {
    name: string;
    cost: number;
    type: NewRecordType;
    categoryId?: number;
}