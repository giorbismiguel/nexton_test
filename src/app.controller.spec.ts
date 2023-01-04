import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Should return BadRequestException', async () => {
      const expression = '';
      try {
        await appController.calculator(expression);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Should return BadRequestException for {', async () => {
      const expression = '{}';
      try {
        await appController.calculator(expression);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid expression, invalid character: {');
      }
    });

    it('Should return BadRequestException for []', async () => {
      const expression = '[]';
      try {
        await appController.calculator(expression);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid expression, invalid character: {');
      }
    });

    it('Should return successfully 700', async () => {
      const expression = '10 * (2 + 5) * 10';
      await expect(appController.calculator(expression)).toBe(700);
    });


    it('Should return successfully 300', async () => {
      const expression = '10 * (5 - 2) * 10';
      await expect(appController.calculator(expression)).toBe(300);
    });
  });
});
