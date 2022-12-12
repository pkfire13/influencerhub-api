import { Injectable } from '@nestjs/common';
import { CreateTiktokUserInput } from './dto/create-tiktok-user.input';
import { UpdateTiktokUserInput } from './dto/update-tiktok-user.input';

@Injectable()
export class TiktokUserService {
  create(createTiktokUserInput: CreateTiktokUserInput) {
    return 'This action adds a new tiktokUser';
  }

  findAll() {
    return `This action returns all tiktokUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiktokUser`;
  }

  update(id: number, updateTiktokUserInput: UpdateTiktokUserInput) {
    return `This action updates a #${id} tiktokUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiktokUser`;
  }
}
