import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppService } from './app.service';
import { Role } from './constants';

// nest g guard auth --flat --no-spec

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Guard 路由守卫', this.appService.getHello());

    const classMetadata: Role[] = this.reflector.get(
      'roles',
      context.getClass(),
    );
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    console.log(classMetadata, requiredRoles);

    if (!requiredRoles) return true;
    const request: Request = context.switchToHttp().getRequest();
    const roles = request.headers['roles'];
    return requiredRoles.some((role) => roles?.includes(role));
  }
}
