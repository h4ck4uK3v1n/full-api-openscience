import { SEOWrapper } from '../data/interfaces/seo-wrapper';
import { Db, ObjectId } from 'mongodb';
import { RemoveType, SeoModel } from '../data/interfaces/seo-model';

// delete(id: string): SeoModel;
const SeoQueries = (db: Db): SEOWrapper  => {
    const find = async():Promise<SeoModel[]> => {
        const result: SeoModel[] = await db.collection('seos').find().toArray() as unknown as SeoModel[];
        return result;
    }
    const findById = async(id: string): Promise<SeoModel> => {
        const result: SeoModel = await db.collection('seos').findOne({ _id: new ObjectId(id) }) as unknown as SeoModel;

        return result;
    }
    const create = async(user: SeoModel): Promise<ObjectId>  => {

        const newUser: ObjectId = (await db.collection('seos').insertOne(user)).insertedId;
        return newUser;
    }
    const update = async(user: SeoModel, id: string): Promise<SeoModel>  => {
        const updatedUser: SeoModel = await db.collection('seos').updateOne({ _id: new ObjectId(id) }, { $set: user }) as unknown as SeoModel;
        return updatedUser;
    }
    const remove = async(id: string): Promise<RemoveType>  => {
        const deletedUser: RemoveType = await db.collection('seos').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
        return deletedUser;
    }
    return {
        find,
        findById,
        create,
        update,
        remove
    }
}
export default SeoQueries;