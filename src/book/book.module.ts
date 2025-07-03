import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';

// nest g resource book

@Module({
  imports: [
    UserModule,
    DbModule.register({
      path: 'src/book/db/books.json',
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
