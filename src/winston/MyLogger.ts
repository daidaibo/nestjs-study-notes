import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { createLogger, Logger, LoggerOptions } from 'winston';
import dayjs from 'dayjs';
import { WINSTON_LOGGER_OPTIONS } from './constants';

@Injectable()
export class MyLogger implements LoggerService {
  private readonly logger: Logger;

  constructor(
    @Inject(WINSTON_LOGGER_OPTIONS) private readonly options: LoggerOptions,
  ) {
    this.logger = createLogger(this.options);
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
}
