import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from './app.service';

// nest g middleware route --flat --no-spec

@Injectable()
export class RouteMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('路由 Middleware before', req.url);
    next();
    console.log('路由 Middleware after', this.appService.getHello());
  }
}
