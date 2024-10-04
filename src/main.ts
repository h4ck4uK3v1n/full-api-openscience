import server from './server';
import UserRoutes from './controller/routes/user-routes';
import mongoProvider from './provider/mongo-client';
import { DatabaseFactory } from './provider/database-factory';
import { MongoClient } from 'mongodb';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
    if (dotenv.error) {
        throw dotenv.error;
    }
}

(function() {
    // TODO: Implement control of environment variables
    const mongo = DatabaseFactory.getDbInstance('mongodb', {
        host: process.env.MONGO_HOST ?? '' ,
        port: parseInt(process.env.MONGO_PORT ?? '27017'),
        username: process.env.MONGO_USER ?? '',
        password: process.env.MONGO_PASS ?? '',
        database: process.env.MONGO_DB ?? ''
    });
    const instance = mongo.getInstance() as MongoClient;
    const db = instance.db(process.env.MONGO_DB ?? '');
    const database = mongoProvider(db);
    server.use('/api', UserRoutes(database));
    server.listen(process.env.API_PORT, () => {
        console.log(`Server is running on port ${process.env.API_PORT}`);
    });
})();