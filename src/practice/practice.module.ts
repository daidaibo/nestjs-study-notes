import { forwardRef, Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { DecoratorModule } from '../decorator/decorator.module';
import { XDynamicModule } from '../dynamic/dynamic.module';

// nest generate resource practice

@Module({
  imports: [
    forwardRef(() => DecoratorModule) /* 循环依赖 */,
    XDynamicModule.register({ x: 'yz', isGlobal: true }),
    XDynamicModule.registerAsync({
      useFactory: async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        return await { x: 'yz' };
      },
    }),
  ],
  controllers: [PracticeController],
  providers: [PracticeService],
  exports: [
    /* OtherService */
  ],
})
export class PracticeModule {}
