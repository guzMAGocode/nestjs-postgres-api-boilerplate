import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT), //Your pg server port 
    username: process.env.DB_USERNAME, //Your username
    password: process.env.DB_PASSWORD, //Your password
    database: process.env.DB_DATABASE_NAME, //Your database name
    entities: [__dirname + '/../**/*.entity.{js,ts}'], //{js, ts} to allow both .js and .ts files
    synchronize: true //Not on production environment
};