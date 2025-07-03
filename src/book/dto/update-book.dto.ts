// import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
// import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends CreateBookDto {
  // @IsNotEmpty()
  // id: number;
}
