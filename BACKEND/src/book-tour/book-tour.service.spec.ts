import { Test, TestingModule } from '@nestjs/testing';
import { BookTourService } from './book-tour.service';

describe('BookTourService', () => {
  let service: BookTourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTourService],
    }).compile();

    service = module.get<BookTourService>(BookTourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
