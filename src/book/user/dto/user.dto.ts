import { IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6, { message: '密码最小 6 位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
