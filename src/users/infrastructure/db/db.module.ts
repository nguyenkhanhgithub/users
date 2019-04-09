import { Global, Module } from '@nestjs/common';
import {postgresProvider} from './postgres.providers';

@Global()
@Module({
    providers: [postgresProvider],
    exports: [postgresProvider],
})
export class DbModule { }
