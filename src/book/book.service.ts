import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from './db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.round(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }

  async detail(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();

    const foundBook = books.find((item) => item.id === id);
    if (!foundBook) {
      throw new BadRequestException('图书不存在');
    }

    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;

    await this.dbService.write(books);
    return foundBook;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();

    const index = books.findIndex((book) => book.id === id);
    if (~index) {
      books.splice(index, 1);
      await this.dbService.write(books);
      return '图书删除成功';
    }
  }
}
