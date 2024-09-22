import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from './services/users.service';

describe('Users', () => {
  let app: INestApplication;
  const usersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/v1/users').expect(200).expect({
      data: usersService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
