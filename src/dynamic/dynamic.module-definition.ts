import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface XDynamicModuleOptions {
  x: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<XDynamicModuleOptions>()
  .setClassMethodName('forRoot')
  .setClassMethodName('forFeature')
  .setClassMethodName('register')
  .setExtras(
    {
      isGlobal: false,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
