import { Db } from 'mongodb';
import { ArticleModel } from '../data/interfaces/articles-model';


const ArticleQueries = (db: Db) => {
    const create = async (article: ArticleModel) => {
        const newArticle = (await db.collection('articles').insertOne(article)).insertedId;
        return newArticle;
    }

    return {
        create
    }
}

export default ArticleQueries;