import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './auth.guard';
// import { TimeInterceptor } from './time.interceptor';
// import { ValidatePipe } from './validate.pipe';
// import { ErrorFilter } from './error.filter';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import { VersioningType } from '@nestjs/common';
// import { MyLogger } from './my-logger';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    // logger: new MyLogger(),
    bufferLogs: true,
  });
  // app.enableCors();
  // app.useLogger(app.get(MyLogger));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'Bobo',
      cookie: { maxAge: 100000 },
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.useStaticAssets('public', { prefix: '/static' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs'); /* npm install --save hbs */

  app.use(function (req: Request, res: Response, next: NextFunction) {
    // console.log('全局 Middleware before', req.url);
    next();
    // console.log('全局 Middleware after');
  });

  /* 手动 new 的 实例，不在 IoC 容器里 👇 */
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new TimeInterceptor());
  // app.useGlobalPipes(new ValidatePipe());
  // app.useGlobalFilters(new ErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
