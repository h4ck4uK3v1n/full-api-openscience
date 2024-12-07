import { ObjectId } from 'mongodb';
import { ArticleModel } from './articles-model';
import { RemoveType } from './common/remove-type';


export interface ArticlesWrapper {
    find(): Promise<ArticleModel[]>;
    findById(id: string): Promise<ArticleModel>;
    create(user: ArticleModel): Promise<ObjectId>;
    update(user: ArticleModel, id: string): Promise<ArticleModel>;
    remove(id: string): Promise<RemoveType>;

}