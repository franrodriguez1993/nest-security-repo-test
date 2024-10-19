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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthenticationGuard)
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload file - Doesnt work, its just for test' })
  async uploadFile() {
   // example endpoint

    return { statusCode: 201, result: "File upload"};
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users' })
  async findAll() {
    const response = await this.usersService.findAll();

    return { statusCode: 200,pid:process.pid, result: response };
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  async findOne(@Param('id',ObjectIdValidationPipe) id: string) {
    const response = await this.usersService.findById(id);

    return { statusCode: 200, result: response };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  update(@Param('id',ObjectIdValidationPipe) id: string, @Body() data: UpdateUserDto) {

    //Sanitize inputs:
    SanitizeInput.sanitizeObjects(data);

    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by id' })
  async remove(@Param('id',ObjectIdValidationPipe) id: string) {
    const response = await this.usersService.remove(id);
    return { statusCode: 200, result: response };
  }
}
