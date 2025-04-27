import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookTourDto } from './dto/book-tour.dto';
import { UpdateBookTourDto } from './dto/book-tour.dto';
import { BookTour } from './entity/book-tour.entity';

@Injectable()
export class BookTourService {
  constructor(
    @InjectRepository(BookTour)
    private readonly bookTourRepository: Repository<BookTour>,
  ) {}

  async create(createBookTourDto: CreateBookTourDto): Promise<BookTour> {
    const bookTour = this.bookTourRepository.create(createBookTourDto);
    return await this.bookTourRepository.save(bookTour);
  }

  async findAll(): Promise<BookTour[]> {
    return await this.bookTourRepository.find();
  }

  async findOne(id: number): Promise<BookTour> {
    const bookTour = await this.bookTourRepository.findOneBy({ bookTourID: id });

    if (!bookTour) {
      throw new NotFoundException(`BookTour with ID ${id} not found`);
    }

    return bookTour;
  }

  async findToursByCustomer(customerID: number): Promise<BookTour[]> {
    return this.bookTourRepository.find({
      where: { customerID },
      relations: ['property'], 
    });
  }

  async updateTour(bookTourID: number, updateBookTourDto: UpdateBookTourDto): Promise<BookTour> {
    const bookTour = await this.bookTourRepository.findOne({
      where: { bookTourID },
      relations: ['property'], 
    });

    if (!bookTour) {
      throw new NotFoundException(`Tour with ID ${bookTourID} not found`);
    }

    Object.assign(bookTour, updateBookTourDto);
    return this.bookTourRepository.save(bookTour);
  }
  async update(id: number, updateBookTourDto: UpdateBookTourDto): Promise<BookTour> {
    const bookTour = await this.findOne(id);

    const updated = Object.assign(bookTour, updateBookTourDto);
    return await this.bookTourRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const bookTour = await this.findOne(id);

    await this.bookTourRepository.remove(bookTour);
  }
}
