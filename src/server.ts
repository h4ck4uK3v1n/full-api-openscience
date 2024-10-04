import express, {Express} from 'express';
import config from './config/config';

const server: Express = express();
config(server);
export default server;
