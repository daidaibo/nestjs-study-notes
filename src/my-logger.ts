import {
  ConsoleLogger,
  Inject,
  Injectable,
  // LoggerService,
  // LogLevel,
} from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class MyLogger extends ConsoleLogger {
  @Inject(AppService)
  private readonly appService: AppService;

  log(message, context) {
    console.log(`[${context}]`, message);
  }
}

// export class MyLogger implements LoggerService {
//   log(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   error(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   warn(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   debug?(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   verbose?(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   fatal?(message: any, ...optionalParams: any[]) {
//     throw new Error('Method not implemented.');
//   }
//   setLogLevels?(levels: LogLevel[]) {
//     throw new Error('Method not implemented.');
//   }
// }
