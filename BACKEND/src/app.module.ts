import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property/entity/property.entity';
import { AuthModule } from './auth/auth.module';
import { Staff } from './auth/entity/staff.entity';
import { Customer } from './auth/entity/customer.entity';
import { BookTourModule } from './book-tour/book-tour.module';
import { BookTour } from './book-tour/entity/book-tour.entity';
import { InquiryModule } from './inquiry/inquiry.module';
import { Inquiry } from './inquiry/entity/inquiry.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Property,
        Customer,
        Staff,
        BookTour,
        Inquiry
      ],
    }),
    PropertyModule,
    AuthModule,
    BookTourModule,
    InquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
