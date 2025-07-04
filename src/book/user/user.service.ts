import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { DbService } from '../db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async register(userDto: UserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find((item) => item.username === userDto.username);
    if (foundUser) {
      throw new BadRequestException('该用户已被注册');
    }

    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;

    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(userDto: UserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find((item) => item.username === userDto.username);
    if (!foundUser) {
      throw new BadRequestException('用户不存在');
    }

    if (foundUser.password !== userDto.password) {
      throw new BadRequestException('密码不正确');
    }

    return foundUser;
  }
}
