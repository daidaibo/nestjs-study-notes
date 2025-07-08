import { Inject, Injectable } from '@nestjs/common';
import { DB_OPTIONS_TOKEN, DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

// nest g service book/db

@Injectable()
export class DbService {
  @Inject(DB_OPTIONS_TOKEN)
  private readonly options: DbModuleOptions;

  async read() {
    const filePath = this.options.path;

    try {
      await access(filePath);
    } catch {
      return [];
    }

    const str = await readFile(filePath, { encoding: 'utf-8' });
    if (!str) return [];

    return JSON.parse(str);
  }

  async write(obj) {
    await writeFile(this.options.path, JSON.stringify(obj), {
      encoding: 'utf-8',
    });
  }
}
