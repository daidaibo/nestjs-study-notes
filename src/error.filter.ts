import {
  ArgumentsHost,
  HttpException,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

// nest g filter error --flat --no-spec

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  /**   文本 背景
   * 红色 31 41
   * 黄色 33 43
   * 蓝色 34 44
   */
  catch(exception: BadRequestException, host: ArgumentsHost) {
    console.log(
      '\x1b[1;31;41m%s\x1b[0m',
      'ExceptionFilter捕获异常',
      exception.message,
    );
    switch (host.getType()) {
      case 'http': {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const exceptionRes = exception.getResponse() as {
          message: string | string[];
        };
        console.log(exceptionRes);
        /* 兼容 ValidationPipe 的错误处理 */
        const exceptionMsg = exceptionRes.message;
        const errMsg = Array.isArray(exceptionMsg)
          ? exceptionMsg.join(',')
          : exception.message;

        response.status(exception.getStatus()).json({ errMsg });
        break;
      }

      case 'ws':
        break;
      case 'rpc':
        break;

      default:
        break;
    }
  }
}
