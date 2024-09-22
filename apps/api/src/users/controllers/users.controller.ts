import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete as DeleteUser,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JoiValidationPipe } from '../..//validation/validation.pipe';
import { createUserSchema } from '../../validation/joi/create-user.validation';
import { updateUserSchema } from '../../validation/joi/update-user.validation';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@ApiTags('users')
@Controller({ path: 'users', version: 'v1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserDto,
  })
  async createUser(
    @Body(new JoiValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of users', type: [UserDto] })
  async findAllUsers(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found', type: UserDto })
  async findUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'User updated successfully', type: UserDto })
  async updateUser(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @DeleteUser(':id')
  @ApiNoContentResponse({
    description: 'User deleted successfully',
  })
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
