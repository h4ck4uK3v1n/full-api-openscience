import express from 'express';
import { Express } from 'express';
import * as BodyParser from 'body-parser';

const config = (server: Express) => {
    server.use(BodyParser.json());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
}
export default config;