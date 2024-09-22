import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository.interface';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserDto> {
    return this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
