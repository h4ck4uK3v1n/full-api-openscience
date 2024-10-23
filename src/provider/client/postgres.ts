import { Pool } from 'pg';
import { BaseClient, ParamsConnection } from "./base-client";

export class PostgresDb implements BaseClient {
    private instance: Pool | null = null;
    connection(params: ParamsConnection): void {
        const { host, port, username, password } = params;
        const uri = `postgresql://${username}:${password}@${host}:${port}`;
        this.instance = new Pool({
            connectionString: uri
        });
    }
    disconnection(): void {
        try {
            this.instance?.end();
        } catch (error) {
            console.error('Error on disconnection', error);
        }
    }
    getInstance(): Pool {
        if (this.instance === null) {
            throw new Error('Instance not found');
        }
        return this.instance;
    }

}