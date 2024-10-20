import { MongoDb } from '../provider/client/mongo';
import { UserWrapper } from "../data/interfaces/user-wrapper";
import { BaseClient } from './client/base-client';
import { MongoClient as Client, Db } from 'mongodb';
import { UserModel } from '../data/interfaces/user-model';
import { Z_UNKNOWN } from 'zlib';

// delete(id: string): UserModel;
const MongoClient = async(db: Db): Promise<UserWrapper>  => {
    const find = async():Promise<UserModel[]> => {
        //todo: implement type for result
        const result: any = await db.collection('users').find();
        return result;
    }
    const findById = async(id: string): Promise<UserModel> => {
        const result: any = await db.collection('users').findOne({ id: id });
        return result;
    }
    const create = async(user: any): Promise<UserModel>  => {
        const newUser: any = await db.collection('users').insertOne(user);
        return newUser;
    }
    const update = async(user: any, id: string): Promise<UserModel>  => {
        const updatedUser: any = await db.collection('users').updateOne({ id: id }, { $set: user });
        return updatedUser;
    }
    const remove = (id: string): Promise<UserModel>  => {
        const deletedUser: any = db.collection('users').deleteOne({ id: id });
        return deletedUser
    }
    return {
        find,
        findById,
        create,
        update,
        remove
    }
}
export default MongoClient;