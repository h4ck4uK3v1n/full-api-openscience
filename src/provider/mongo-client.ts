// find(): UserModel[];
// findById(id: string): UserModel;
// create(user: UserModel): UserModel;
// update(user: UserModel, id: string): UserModel;

import { UserWrapper } from "../data/interfaces/user-wrapper";

// delete(id: string): UserModel;
const MongoClient = (): UserWrapper  => {
    const find = () => {
        return [
            { id: 1, name: 'John Doe', email: ''} ]; 
    }
    const findById = (id: string) => {
        return { id: 1, name: 'John Doe', email: ''}; 
    }
    const create = (user: any) => {
        return user;
    }
    const update = (user: any, id: string) => {
        return user;
    }
    const remove = (id: string) => {
        return { id: 1, name: 'John Doe', email: ''};
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