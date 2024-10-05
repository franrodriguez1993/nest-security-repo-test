import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
 async create(@Body() data: CreateUserDto) {
  // check parameters
  const checkUsername = await this.usersService.findByUsername(data.username);
  const checkEmail = await this.usersService.findByEmail(data.email);
  if(checkUsername || checkEmail) throw new BadRequestException("Invalid parameters");

    const response = await this.usersService.create(data);

    return {statusCode:201, result:response};
  }

  @Get()
  async findAll() {
    const response = await this.usersService.findAll();

    return { statusCode:200, result:response};
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    
    const response = await this.usersService.findById(id);
    
    return { statusCode:200, result:response};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    const response = await  this.usersService.remove(id);
    return { statusCode:200, result:response};
  }
}
