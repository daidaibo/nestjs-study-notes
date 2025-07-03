import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../practice/multerStorage';
import * as path from 'path';

class IdDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return this.bookService.list();
  }

  @Get('detail/:id')
  detail(@Param() { id }: IdDto) {
    return this.bookService.detail(+id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage,
      limits: {
        fileSize: 1024 * 1024 * 3, // 3M
      },
      fileFilter(_req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', 'jpg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('请上传正确的格式图片'), false);
        }
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    /* 
      {
        fieldname: 'cover',
        originalname: 'highlight.gif',
        encoding: '7bit',
        mimetype: 'image/gif',
        destination: 'uploads/',
        filename: 'cover-1751533116455-688574787-highlight.gif',
        path: 'uploads/cover-1751533116455-688574787-highlight.gif',
        size: 1221345
      }
    */
    return file.path;
  }
}
