import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserDto>;
  findAll(): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | null>;
  remove(id: string): Promise<void>;
}
