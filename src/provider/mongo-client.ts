
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
}

const MongoClient = (db: Db): QueryWrapper  => {
    const userQueries = UserQueries(db);
    return {
        userQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;