import { ObjectId } from 'mongodb';
import { SeoModel, RemoveType } from './seo-model';


export interface SEOWrapper {
    find(): Promise<SeoModel[]>;
    findById(id: string): Promise<SeoModel>;
    create(user: SeoModel): Promise<ObjectId>;
    update(user: SeoModel, id: string): Promise<SeoModel>;
    remove(id: string): Promise<RemoveType>;
}