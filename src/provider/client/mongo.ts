import { MongoClient } from 'mongodb';
import { BaseClient, ParamsConnection } from './base-client';


export class MongoDb implements BaseClient {
    private instance: MongoClient | null = null;

    getInstance(): MongoClient {
        if (this.instance === null) {
            throw new Error('Instance not found');

        }
        return this.instance;
    }
    async connection(params: ParamsConnection) {
        const { host, port, username, password, database } = params;
        const uri = `mongodb://${username}:${password}@${host}:${port}`;
        this.instance = new MongoClient(uri);
        try {
            await this.instance.connect();
        } catch (error) {
            // todo: handle error
            console.error('Error on connection', error);
        }
    }
    async disconnection() {
        try {
            await this.instance?.close();
        } catch (error) {
            console.log('Error on disconnection', error);
        }
    }
}