import { Test, TestingModule } from '@nestjs/testing';
import { BookTourController } from './book-tour.controller';

describe('BookTourController', () => {
  let controller: BookTourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTourController],
    }).compile();

    controller = module.get<BookTourController>(BookTourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
