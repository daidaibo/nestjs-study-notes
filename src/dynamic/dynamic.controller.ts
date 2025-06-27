import { Controller, Inject } from '@nestjs/common';
import {
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './dynamic.module-definition';

@Controller('dynamic')
export class DynamicController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private readonly options: typeof OPTIONS_TYPE;
}
