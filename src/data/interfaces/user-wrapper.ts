import { UserModel } from './user-model';


export interface UserWrapper {
    find(): Promise<UserModel[]>;
    findById(id: string): Promise<UserModel>;
    create(user: UserModel): Promise<UserModel>;
    update(user: UserModel, id: string): Promise<UserModel>;
    remove(id: string): Promise<UserModel>;
}