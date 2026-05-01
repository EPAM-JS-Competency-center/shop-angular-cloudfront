import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [AuthModule],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('healthCheck should be truthy', () => {
      expect(appController.healthCheck()).toBeTruthy();
    });
  });
});
