import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Inject,
  UseInterceptors,
  SetMetadata,
  Headers,
  Ip,
  Session,
  Req,
  Res,
  HttpCode,
  Header,
  Redirect,
  Render,
  ParseArrayPipe,
  // Version,
  VERSION_NEUTRAL,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  ValidationPipe,
  // UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { PracticeService } from './practice.service';
// import { AuthGuard } from '../auth.guard';
// import { TimeInterceptor } from '../time.interceptor';
import { ValidatePipe } from '../validate.pipe';
// import { ErrorFilter } from '../error.filter';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { storage } from './multerStorage';
import * as fs from 'fs';

@Controller({
  path: 'practice',
  version: VERSION_NEUTRAL,
})
// @UseGuards(AuthGuard)
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidationPipe)
// @UseFilters(ErrorFilter)
@SetMetadata('roles', ['user'])
export class PracticeController {
  // constructor(private readonly practiceService: PracticeService) {}
  @Inject(PracticeService)
  private readonly practiceService: PracticeService;

  @Get('header')
  @Header('X-My-Origin-Bobo', 'https://www.5207.fun/')
  header(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
    @Session() session,
    @Req() req: Request,
  ) {
    console.log(accept);
    console.log(ip);
    console.log(session);

    // console.log(req);
    console.log(req.hostname, req.url);

    return headers;
  }

  @Get('response')
  response(@Res({ passthrough: true }) res: Response) {
    res.end('response');
  }

  @Get('redirect')
  @Redirect('https://www.5207.fun/')
  redirect() {
    /* 302 临时重定向 */
  }
  @Get('redirect')
  @Redirect()
  _redirect() {
    return {
      url: 'https://www.5207.fun/',
      statusCode: 302,
    };
  }

  @Get('render')
  @Render('user')
  render() {
    return { name: 'Bobo', age: 18 };
  }

  @Post()
  create(@Body() createPracticeDto: CreatePracticeDto) {
    return this.practiceService.create(createPracticeDto);
  }

  // @Version('2')
  // @Get()
  // findAllV2() {
  //   return this.practiceService.findAll();
  // }
  @Get()
  @SetMetadata('roles', ['admin'])
  findAll() {
    return this.practiceService.findAll();
  }

  @Get('query')
  queryOne(@Query('id') id: number) {
    throw new Error('xxx');
    console.log(id);
    return this.practiceService.findOne(id);
  }

  @Get('pipe')
  pipe(
    @Query(
      'arr',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        optional: true,
      }),
    )
    arr: Array<number>,
  ) {
    return arr;
  }

  @Post('dto')
  dto(@Body(ValidationPipe) obj: UpdatePracticeDto) {
    /* npm install -D class-transformer class-validator */
    console.log(obj);
  }

  @Get(':id')
  async findOne(@Param('id', ValidatePipe) id: number) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    return this.practiceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return this.practiceService.update(+id, updatePracticeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.practiceService.remove(+id);
  }

  @Post('single-file')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: 'uploads/',
    }),
  )
  uploadSingleFile(
    @Body() body: UpdatePracticeDto,
    @UploadedFile() file: Express.Multer.File /* npm i -D @types/multer */,
  ) {
    // 使用 FileInterceptor 提取 avatar 字段，再通过 UploadedFile 装饰器把之作为 file 参数传入
    console.log(file);
    return JSON.stringify(body);
  }

  @Post('multiple-files')
  @UseInterceptors(
    FilesInterceptor('gallery', 2, {
      dest: 'uploads/',
    }),
  )
  uploadMultipleFiles(
    @Body() body: CreatePracticeDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return JSON.stringify(body);
  }

  @Post('multiple-field')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'gallery', maxCount: 2 },
      ],
      {
        dest: 'uploads/',
      },
    ),
  )
  uploadMultipleField(
    @Body() body: UpdatePracticeDto,
    @UploadedFiles()
    files: { avatar?: Express.Multer.File; gallery?: Express.Multer.File[] },
  ) {
    console.log(files);
    return JSON.stringify(body);
  }

  @Post('any-files')
  @UseInterceptors(
    AnyFilesInterceptor({
      // dest: 'uploads/',
      storage,
      // limits
      // fileFilter
    }),
  )
  uploadAnyFiles(
    @Body() body: CreatePracticeDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        exceptionFactory: (_) => {
          throw new HttpException('Bad Request', 400);
        },
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return JSON.stringify(body);
  }

  @Post('shard-upload')
  @UseInterceptors(
    FileInterceptor('chunk', {
      dest: 'uploads/',
    }),
  )
  shardUpload(
    @Body('name') name: string,
    @UploadedFile() blob: Express.Multer.File,
  ) {
    console.log(blob);

    const fileName = name.match(/(.+)-\d+$/)![1];
    const chunkDir = `uploads/chunks_${fileName}`;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }

    fs.cpSync(blob.path, `${chunkDir}/${name}`);
    fs.rmSync(blob.path);
  }

  @Get('merge/:name')
  merger(@Param('name') name: string) {
    const chunkDir = `uploads/chunks_${name}`;
    const files = fs.readdirSync(chunkDir);

    files.sort((next, prev) => {
      const prevN = Number(prev.split('-')[1]);
      const nextN = Number(next.split('-')[1]);
      return nextN - prevN;
    });

    let count = 0;
    let startPos = 0;
    files.map((file) => {
      const filePath = `${chunkDir}/${file}`;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream(`uploads/${name}`, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          count++;
          if (count === files.length) {
            fs.rm(chunkDir, { recursive: true }, () => {});
          }
        });
      startPos += fs.statSync(filePath).size;
    });
  }
}
