
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import SeoQueries from '../queries/seo-queries';
import { SEOWrapper } from '../data/interfaces/seo-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    seoQueries: SEOWrapper;
}

const MongoClient = (db: Db): QueryWrapper  => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const seoQueries = SeoQueries(db);
    return {
        userQueries,
        roleQueries,
        seoQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;