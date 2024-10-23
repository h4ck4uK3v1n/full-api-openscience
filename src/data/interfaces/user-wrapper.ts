import { ObjectId } from 'mongodb';
import { RemoveType, UserModel } from './user-model';


export interface UserWrapper {
    find(): Promise<UserModel[]>;
    findById(id: string): Promise<UserModel>;
    create(user: UserModel): Promise<ObjectId>;
    update(user: UserModel, id: string): Promise<UserModel>;
    remove(id: string): Promise<RemoveType>;
}