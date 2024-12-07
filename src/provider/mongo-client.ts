
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import VolumeQueries from '../queries/volume-queries';
import UserManagementQueries from '../queries/userManagement-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import { VolumeWrapper } from '../data/interfaces/volume-wrapper';
import { UserWrapper as UserManagementWrapper } from '../data/interfaces/userManagement-wrapper';
import { ArticlesWrapper } from '../data/interfaces/articles-wrapper';
import ArticleQueries from '../queries/article-queries';
interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    volumeQueries: VolumeWrapper;
    userManagementQueries: UserManagementWrapper;
    articleQueries: ArticlesWrapper;
}

const MongoClient = (db: Db): QueryWrapper => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const volumeQueries = VolumeQueries(db);
    const userManagementQueries = UserManagementQueries(db);
    const articleQueries = ArticleQueries(db);
    return {
        userQueries,
        roleQueries,
        volumeQueries,
        userManagementQueries,
        articleQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;