import server from './server';
import UserRoutes from './controller/routes/user-routes';
import RoleRoutes from './controller/routes/role-routes';
import mongoProvider from './provider/mongo-client';
import { DatabaseFactory } from './provider/database-factory';
import { MongoClient } from 'mongodb';
import UserManagementRoutes from './controller/routes/userManagement-routes';

if (process.env.NODE_ENV !== 'production') {
    /*eslint-disable @typescript-eslint/no-require-imports */
    const dotenv = require('dotenv');
    dotenv.config();
    if (dotenv.error) {
        throw dotenv.error;
    }
}

(function() {
    // TODO: Implement control of environment variables
    const mongo = DatabaseFactory.getDbInstance('mongodb', {
        host: process.env.API_MONGO_HOST ?? '' ,
        port: parseInt(process.env.API_MONGO_PORT ?? '27017'),
        username: process.env.API_MONGO_USER ?? '',
        password: process.env.API_MONGO_PASS ?? '',
        database: process.env.API_MONGO_DB ?? ''
    });
    const instance = mongo.getInstance() as MongoClient;
    const db = instance.db(process.env.MONGO_DB ?? '');
    const database = mongoProvider(db);

    server.use('/api', UserRoutes(database.userQueries));
    server.use('/api', RoleRoutes(database.roleQueries))
    server.use('/api', UserManagementRoutes(database.userManagementQueries));
    server.listen(process.env.API_PORT, () => {
        /* eslint-disable no-console */
        console.info(`Server is running on port ${process.env.API_PORT}`);
    });
})();