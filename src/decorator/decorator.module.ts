import { Module } from '@nestjs/common';
import { DecoratorService } from './decorator.service';
import { DecoratorController } from './decorator.controller';
import { AppService } from '../app.service';

@Module({
  controllers: [DecoratorController],
  providers: [DecoratorService, AppService],
})
export class DecoratorModule {}
