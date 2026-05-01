import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users';

const fakeUser = {
  name: 'test',
  password: 'test',
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = app.get(UsersService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('/ GET should return statusCode 200', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/ping GET should return statusCode 200', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/api/auth/register POST should return statusCode 201', () => {
    return request(app.getHttpServer()).post('/api/auth/register')
      .send(fakeUser)
      .expect(201);
  });

  it('/api/auth/login POST should return statusCode 404 if user does not exists', () => {
    return request(app.getHttpServer()).post('/api/auth/login')
      .send(fakeUser)
      .expect(401);
  });


  it('/api/auth/login POST should return response with token if user exists', async () => {
    const server = app.getHttpServer();

    await request(server).post('/api/auth/register')
      .send(fakeUser);

    return request(server).post('/api/auth/login')
      .send({
        username: fakeUser.name,
        password: fakeUser.password
      }).expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('token_type');
        expect(res.body).toHaveProperty('access_token');
      })
  });


  it('/api/profile GET should return 401 if user does not exists', () => {
    return request(app.getHttpServer()).get('/api/profile')
      .expect(401);
  });


  it('/api/profile GET should return 200 if valid auth header was provided', async () => {
    const server = app.getHttpServer();

    await request(server).post('/api/auth/register')
      .send(fakeUser);

    const response = await request(server).post('/api/auth/login').send({
      username: fakeUser.name,
      password: fakeUser.password
    });

    const { token_type, access_token } = response.body;

    return request(app.getHttpServer()).get('/api/profile')
      .set('Authorization', `${token_type} ${access_token}`)
      .expect(200);
  });
});