import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserSchema, UserModel } from './schemas/user.schema';
import { UserMongooseRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserMongooseRepository,
    },
  ],
})
export class UsersModule {}
