import { DynamicModule, Global, Module } from '@nestjs/common';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_OPTIONS, WINSTON_LOGGER_TOKEN } from './constants';
import { LoggerOptions, format, transports } from 'winston';
import chalk from 'chalk';
// nest g module winston

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options?: LoggerOptions): DynamicModule {
    options = options || {
      level: 'debug',
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
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level} ${contextStr} ${message}`;
            }),
          ),
        }),
      ],
    };
    return {
      module: WinstonModule /* 👍 nest-winston */,
      providers: [
        {
          provide: WINSTON_LOGGER_OPTIONS,
          useValue: options,
        },
        {
          provide: WINSTON_LOGGER_TOKEN,
          useClass: MyLogger,
        },
      ],
      exports: [WINSTON_LOGGER_OPTIONS, WINSTON_LOGGER_TOKEN],
    };
  }
}
