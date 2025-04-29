import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entity/inquiry.entity';
import { InquiryDto } from './dto/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>, 
  ) {}

  async createInquiry(inquiryDto: InquiryDto): Promise<Inquiry> {
    const inquiry = this.inquiryRepository.create(inquiryDto);
    return this.inquiryRepository.save(inquiry);
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiryRepository.find();
  }
}

