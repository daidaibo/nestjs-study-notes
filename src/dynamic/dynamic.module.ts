import { /* DynamicModule, */ Module } from '@nestjs/common';
import { DynamicController } from './dynamic.controller';
import { ConfigurableModuleClass } from './dynamic.module-definition';

@Module({
  controllers: [DynamicController],
})
export class XDynamicModule extends ConfigurableModuleClass {
  // static register(options: Record<string, any>): DynamicModule {
  //   return {
  //     module: XDynamicModule,
  //     controllers: [DynamicController],
  //     providers: [
  //       {
  //         provide: 'CONFIG_OPTIONS',
  //         useValue: options,
  //       },
  //     ],
  //     exports: [],
  //   };
  // }
}
