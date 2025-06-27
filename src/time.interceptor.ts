import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  map,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

// nest g interceptor time --flat --no-spec

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    /* 拦截器 interceptor 可以拿到调用的 controller 和 method */
    // console.log(context.getClass(), context.getHandler());

    return next.handle().pipe(
      timeout(500) /* {"message":"Request Timeout","statusCode":408} */,
      map((data: unknown) => {
        return {
          code: 200,
          message: 'success',
          data,
        };
      }),
      tap((_data) => {
        // this.logger.log(_data);
        console.log('time:', Date.now() - startTime, 'ms');
      }),
      catchError((err: Error) => {
        this.logger.log('Interceptor拦截错误' /* err.message, err.stack */);
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
