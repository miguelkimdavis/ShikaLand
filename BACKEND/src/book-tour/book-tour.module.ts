import { Module } from '@nestjs/common';
import { BookTourService } from './book-tour.service';
import { BookTourController } from './book-tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookTour } from './entity/book-tour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookTour]),
  ],
  providers: [BookTourService],
  controllers: [BookTourController],
  exports: [BookTourService]
})
export class BookTourModule {}
