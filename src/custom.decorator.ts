import {
  applyDecorators,
  Controller,
  createParamDecorator,
  ExecutionContext,
  Get,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { Role } from './constants';

// nest g decorator custom --flat

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export function MyApplyDecorators(path: string, roles: Role[]) {
  return applyDecorators(Get(path), Roles(...roles), UseGuards(AuthGuard));
}

export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    // console.log(request);
    return request.query[key];
  },
);

export const MyController = (path: string) =>
  applyDecorators(Controller(path), Roles(Role.User));
