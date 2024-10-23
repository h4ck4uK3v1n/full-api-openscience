
import { BaseClient, ParamsConnection } from './client/base-client';
import { MongoDb } from './client/mongo';
import { PostgresDb } from './client/postgres';

export class DatabaseFactory {
    private static mongoClient: MongoDb | null = null;
    private static postgresClient: PostgresDb | null = null;
    private constructor() { }
    static getDbInstance(type: 'mongodb' | 'postgres', params: ParamsConnection): BaseClient {
        switch (type) {
            case 'mongodb':
                
                if (DatabaseFactory.mongoClient === null) {
                    DatabaseFactory.mongoClient = new MongoDb();
                    DatabaseFactory.mongoClient.connection(params);
                }
                return DatabaseFactory.mongoClient;
            case 'postgres':
                if (DatabaseFactory.postgresClient === null) {
                    DatabaseFactory.postgresClient = new PostgresDb();
                    DatabaseFactory.postgresClient.connection(params);
                }
                return DatabaseFactory.postgresClient;
            default:
                throw new Error('Database not found');
        }
    }
}