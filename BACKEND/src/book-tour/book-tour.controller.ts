import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BookTourService } from './book-tour.service';
import { CreateBookTourDto, UpdateBookTourDto } from './dto/book-tour.dto';

@Controller('book-tour')
export class BookTourController {
  constructor(private readonly bookTourService: BookTourService) {}

  @Post()
  create(@Body() createBookTourDto: CreateBookTourDto) {
    return this.bookTourService.create(createBookTourDto);
  }

  @Get()
  findAll() {
    return this.bookTourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookTourService.findOne(+id);
  }

  @Get('customer/:customerID')
  async getToursByCustomer(@Param('customerID') customerID: number) {
    return this.bookTourService.findToursByCustomer(customerID);
  }

  @Patch(':id')
  async updateTour(
    @Param('id') id: number,
    @Body() updateBookTourDto: UpdateBookTourDto
  ) {
    return this.bookTourService.updateTour(id, updateBookTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookTourService.remove(+id);
  }
}
