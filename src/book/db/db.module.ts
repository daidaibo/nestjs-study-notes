import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

// nest g module book/db

export interface DbModuleOptions {
  path: string;
}

@Module({})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        DbService,
        {
          provide: 'OPTIONS',
          useValue: options,
        },
      ],
      exports: [DbService],
    };
  }
}
