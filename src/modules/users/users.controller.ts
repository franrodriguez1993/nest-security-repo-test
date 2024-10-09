import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SanitizeInput } from 'src/validations/sanitize';
import { ObjectIdValidationPipe } from 'src/pipe/mongo-id.pipe';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { AuthenticationGuard } from 'src/shared/guard/authentication.guard';

@Controller('users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    // check parameters
    const checkUsername = await this.usersService.findByUsername(data.username);
    const checkEmail = await this.usersService.findByEmail(data.email);
    if (checkUsername || checkEmail)
      throw new BadRequestException('Invalid parameters');

    // Sanitize inputs:
    SanitizeInput.sanitizeObjects(data);

    const response = await this.usersService.create(data);

    return { statusCode: 201, result: response };
  }

  @Post("/upload")
  async uploadFile() {
   // example endpoint

    return { statusCode: 201, result: "File upload"};
  }

  @Get()
  async findAll() {
    const response = await this.usersService.findAll();

    return { statusCode: 200, result: response };
  }

  @Get(':id')
  async findOne(@Param('id',ObjectIdValidationPipe) id: string) {
    const response = await this.usersService.findById(id);

    return { statusCode: 200, result: response };
  }

  @Patch(':id')
  update(@Param('id',ObjectIdValidationPipe) id: string, @Body() data: UpdateUserDto) {

    //Sanitize inputs:
    SanitizeInput.sanitizeObjects(data);

    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id',ObjectIdValidationPipe) id: string) {
    const response = await this.usersService.remove(id);
    return { statusCode: 200, result: response };
  }
}
