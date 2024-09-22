import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from './user.repository.interface';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel, UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { ErrorHandler } from 'src/shared/error-handler';

@Injectable()
export class UserMongooseRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      const userDocument = await createdUser.save();

      return this.toUserDto(userDocument);

      // Check for MongoDB duplicate key error
    } catch (error) {
      if (error.code === 11000) {
        // get the duplicate property from the error
        const field = Object.keys(error.keyValue)[0];
        throw new ConflictException(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is already in use`,
        );
      }
      ErrorHandler.handleError(
        'Failed to create user. Please try again later.',
        error,
      );
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const userDocuments = await this.userModel.find().exec();
      const mapped = userDocuments.map((user) => this.toUserDto(user));
      // console.log(mapped);
      return mapped;
    } catch (error) {
      ErrorHandler.handleError(
        'Unable to retrieve users at this time. Please try again later.',
        error,
      );
    }
  }

  async findById(id: string): Promise<UserDto | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Invalid user ID: ${id}`);
      }
      const userDocument = await this.userModel
        .findById(new Types.ObjectId(id))
        .exec();

      if (!userDocument) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return this.toUserDto(userDocument);
    } catch (error) {
      ErrorHandler.handleError(
        'Unable to retrieve users at this time. Please try again later.',
        error,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    try {
      const userDocument = await this.userModel
        .findOneAndUpdate({ _id: new Types.ObjectId(id) }, updateUserDto, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!userDocument) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return this.toUserDto(userDocument);
    } catch (error) {
      ErrorHandler.handleError(
        'Unable to update user at this time. Please try again later.',
        error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid user ID: ${id}`);
    }

    const userDocument = await this.userModel
      .deleteOne({ _id: new Types.ObjectId(id) })
      .exec();

    if (userDocument.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  /**
   * Converts Mongoose UserDocument to UserDTO
   */
  private toUserDto(userDocument: UserDocument): UserDto {
    const { id, name, phone, email } = userDocument;
    return {
      id,
      name,
      phone,
      email,
    };
  }
}
