import { Controller, Post, Body, Get } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryDto } from './dto/inquiry.dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  async createInquiry(@Body() inquiryDto : InquiryDto) {
    return this.inquiryService.createInquiry(inquiryDto);
  }

  @Get()
  async findAll() {
    return this.inquiryService.findAll();
  }
}
