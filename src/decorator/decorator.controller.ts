import { Get, Headers } from '@nestjs/common';
import { DecoratorService } from './decorator.service';
import {
  MyApplyDecorators,
  Roles,
  MyHeaders,
  MyQuery,
  MyController,
} from '../custom.decorator';
import { Role } from '../constants';

@MyController('decorator')
export class DecoratorController {
  constructor(private readonly decoratorService: DecoratorService) {}

  @MyApplyDecorators('/', [Role.User])
  my() {
    console.log('my');
  }

  @Get()
  @Roles(Role.Admin)
  me() {
    console.log('me');
  }

  @Get('header')
  header(@Headers() headers, @MyHeaders('accept-language') lang) {
    console.log(lang);
  }

  @Get('query')
  query(@MyQuery('id') id) {
    console.log(id);
  }
}
