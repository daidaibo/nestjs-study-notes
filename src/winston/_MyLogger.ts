import {
  // ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import chalk from 'chalk';
import dayjs from 'dayjs';

@Injectable()
export class MyLogger implements LoggerService {
  /* https://www.npmjs.com/package/winston */
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      // format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf((info) => {
              const { context, level, message, time } = info as {
                context: string;
                level: string;
                message: string;
                time: string;
              };
              // console.log(info);
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level} ${contextStr} ${message}`;
            }),
          ),
        }),

        // new transports.File({
        //   format: format.combine(format.timestamp(), format.json()),
        //   filename: 'test.log',
        //   dirname: 'log',
        //   maxsize: 1024,
        // }),

        // new transports.Http({
        //   host: 'localhost',
        //   port: 3000,
        //   path: '/log',
        // }),
      ],

      /* 
        throw new Error('xx')
       */
      exceptionHandlers: [],
      /* 
        (async function() {
          throw Error('yy')
        })()
       */
      rejectionHandlers: [],
    });
  }

  log(message, context) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, time });
  }
  error(message, context) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('error', message, { context, time });
  }
  warn(message, context) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('warn', message, { context, time });
  }
  // debug?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  // verbose?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  // fatal?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  setLogLevels?(_levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}

// export class MyLogger extends ConsoleLogger {
//   log(message, context) {
//     console.log(`[${context}] ${message}`);
//   }
// }
