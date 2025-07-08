import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

// nest g module book/db

export interface DbModuleOptions {
  path: string;
}

export const DB_OPTIONS_TOKEN = 'MY_DB_OPTIONS';

@Module({})
export class DbModule {
  public static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        DbService,
        {
          provide: DB_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [DbService],
    };
  }
}
