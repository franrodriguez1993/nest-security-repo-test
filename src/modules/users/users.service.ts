import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async create(data: CreateUserDto) {
    return await this.usersModel.create(data);
  }

  findAll() {
    return this.usersModel.find({});
  }

  async findById(id: any) {

    return await this.usersModel.findOne({ _id: id });
  }

  async findByUsername(username: string) {
    return await this.usersModel.findOne({ username });
  }

  async findByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  update(id: string, data: UpdateUserDto) {
    return this.usersModel.updateOne({ _id: id }, data);
  }

  remove(id: string) {
    return this.usersModel.deleteOne({ _id: id });
  }
}
