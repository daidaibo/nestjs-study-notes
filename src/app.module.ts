import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TimeInterceptor } from './time.interceptor';
import { PracticeModule } from './practice/practice.module';
import { RouteMiddleware } from './route.middleware';
// import { ErrorFilter } from './error.filter';
import { DecoratorModule } from './decorator/decorator.module';

@Module({
  imports: [
    PracticeModule,
    DecoratorModule,
  ] /* 当 import 别的模块后，那个模块 exports 的 provider 就可以在当前模块注入了 */,
  controllers: [AppController],
  providers: [
    // 通过 @Injectable 声明可以被注入也可以注入别的实例的 provider
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: ErrorFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouteMiddleware).forRoutes('/practice');
  }
}
