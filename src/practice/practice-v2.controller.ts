import { Controller, Get } from '@nestjs/common';
import { PracticeService } from './practice.service';
import * as path from 'path';

@Controller({
  path: 'practice',
  version: '2',
})
export class PracticeV2Controller {
  constructor(private readonly practiceService: PracticeService) {}

  @Get()
  findAllV2() {
    console.log(process.cwd());
    console.log(path.join(process.cwd(), 'uploads'));
    console.log(path.resolve(process.cwd(), 'uploads'));
    console.log(__dirname);
    console.log(path.join(__dirname, '../../uploads'));
    return this.practiceService.findAll();
  }

  /*
    1. 自定义 Header 携带版本号
      app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'version',
      });

      Version: 2

    2. 在 Accept 里附带版本号
      app.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: 'vv=',
      });

      Accept: application/json;vv=2

    3. 在 URI 路径上拼接版本号
      app.enableVersioning({
        type: VersioningType.URI,
      });

      /v2/practice

    4. 自定义

      const extractor = (request: Request) => {
        if (request.headers['disable-custom']) {
          return '';
        }
        return request.url.includes('Bobo') ? '2' : '1';
      }

      如果 Header 里有 Disable-Custom，则返回 404
      如果 URL 里包含 Bobo，则返回版本 1，否则返回 2

      app.enableVersioning({
        type: VersioningType.CUSTOM,
        extractor,
      });
   */
}
