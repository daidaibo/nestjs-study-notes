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
  UploadedFiles,
  UseInterceptors,
  UseFilters,
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
  // UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PracticeService } from './practice.service';
// import { AuthGuard } from '../auth.guard';
// import { TimeInterceptor } from '../time.interceptor';
import { ValidatePipe } from '../validate.pipe';
import { ErrorFilter } from '../error.filter';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Controller('practice')
// @UseGuards(AuthGuard)
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
@UseFilters(ErrorFilter)
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

  @Get()
  @SetMetadata('roles', ['admin'])
  findAll() {
    return this.practiceService.findAll();
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  uploadFile(
    @Body() createPracticeDto: CreatePracticeDto,
    @UploadedFiles()
    files: Array<Express.Multer.File> /* npm i -D @types/multer */,
  ) {
    console.log(files);
    return JSON.stringify(createPracticeDto);
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
  dto(@Body(ValidatePipe) obj: UpdatePracticeDto) {
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
}
