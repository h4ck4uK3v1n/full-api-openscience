import { UserModel } from './user-model';


export interface UserWrapper {
    find(): UserModel[];
    findById(id: string): UserModel;
    create(user: UserModel): UserModel;
    update(user: UserModel, id: string): UserModel;
    remove(id: string): UserModel;
}