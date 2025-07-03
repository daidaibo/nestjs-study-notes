import {
  ArgumentMetadata,
  // HttpException,
  // HttpStatus,
  BadRequestException,
  Inject,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
// import { validate } from 'class-validator';
// import { plainToInstance } from 'class-transformer';

// nest g pipe validate --flat --no-spec

@Injectable()
export class ValidatePipe implements PipeTransform {
  @Optional()
  @Inject('validation_options')
  private readonly options;

  transform(value: string, metadata: ArgumentMetadata) {
    const { metatype, data: field } = metadata;

    /**
     * ValidationPipe 实现原理
     *
     * 基于 class-transformer 把参数对象转换为 dto 类的对象，再通过 class-validator 基于装饰器对这个对象做验证
     */
    if (!metatype) return value;

    // const object = plainToInstance(metatype, value);
    // const errors = await validate(object);
    // if (errors.length > 0) {
    //   throw new BadRequestException('参数验证异常');
    // }

    const v = parseInt(value, 10);
    if (Number.isNaN(v)) {
      // console.log(metadata);
      throw new BadRequestException(`参数 ${field} 错误`);
      // throw new HttpException(
      //   {
      //     message: `参数 ${field} 错误`,
      //     error: HttpStatus[HttpStatus.BAD_REQUEST],
      //     statusCode: HttpStatus.BAD_REQUEST,
      //   },
      //   HttpStatus.BAD_REQUEST,
      // );
    }
    return v;
  }
}
