import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

// nest g resource book

@Module({
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
