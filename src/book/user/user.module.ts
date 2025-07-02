import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';

// nest g resource book/user

@Module({
  imports: [
    DbModule.register({
      path: 'src/book/db/users.json',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
