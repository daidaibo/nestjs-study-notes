import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Injectable()
export class PracticeService {
  create(_createPracticeDto: CreatePracticeDto) {
    return 'This action adds a new practice';
  }

  findAll() {
    return `This action returns all practice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} practice`;
  }

  update(id: number, _updatePracticeDto: UpdatePracticeDto) {
    return `This action updates a #${id} practice`;
  }

  remove(id: number) {
    return `This action removes a #${id} practice`;
  }
}
