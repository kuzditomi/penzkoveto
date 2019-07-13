import { IRepository } from "./IRepository";
import { WebRepository } from './WebRepository';

export class Repository{
    private static instance: IRepository;

    public static get Instance(): IRepository {
        if(!this.instance){
            this.buildInstance();
        }

        return this.instance;
    }

    private static buildInstance(){
        this.instance = new WebRepository();
    }
}