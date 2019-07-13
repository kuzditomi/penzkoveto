import { IRepository } from "./IRepository";
import { WebRepository } from './WebRepository';
import { LocalStorageRepository } from './LocalStorageRepository';
import { isMobileApp } from "../functions";

export class Repository {
    private static instance: IRepository;

    public static get Instance(): IRepository {
        if (!this.instance) {
            this.buildInstance();
        }

        return this.instance;
    }

    private static buildInstance() {
        if (isMobileApp()) {
            this.instance = new LocalStorageRepository();
        } else {
            this.instance = new WebRepository();
        }
    }
}