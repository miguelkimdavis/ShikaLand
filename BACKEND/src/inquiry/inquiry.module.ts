import { Module } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from './entity/inquiry.entity';
import { InquiryController } from './inquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  controllers: [InquiryController],
  providers: [InquiryService]
})
export class InquiryModule {}
