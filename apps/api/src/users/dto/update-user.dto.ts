import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// convert all CreateUserDto properties into optional fields
export class UpdateUserDto extends PartialType(CreateUserDto) {}
