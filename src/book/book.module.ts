import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UserModule } from './user/user.module';

// nest g resource book

@Module({
  imports: [UserModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
