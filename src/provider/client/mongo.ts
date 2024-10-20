import { MongoClient } from 'mongodb';
import { BaseClient, ParamsConnection } from './base-client';


export class MongoDb implements BaseClient {
    private static instance: MongoClient | null = null;

    getInstance(): MongoClient {
        if (MongoDb.instance === null) {
            throw new Error('Instance not found'); 
        }
        return MongoDb.instance;
    }
    async connection(params: ParamsConnection) {
        const { host, port, username, password, database } = params;
        
        const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
        console.log('----->', uri);
        MongoDb.instance = new MongoClient(uri);
        try {
            await MongoDb.instance.connect();
        } catch (error) {
            // todo: handle error
            console.error('Error on connection', error);
        }
    }
    async disconnection() {
        try {
            await MongoDb.instance?.close();
        } catch (error) {
            console.log('Error on disconnection', error);
        }
    }
}