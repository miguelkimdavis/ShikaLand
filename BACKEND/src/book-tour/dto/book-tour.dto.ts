import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateBookTourDto {
  @IsNotEmpty()
  @IsNumber()
  customerID: number;

  @IsNotEmpty()
  @IsNumber()
  propertyID: number;

  @IsNotEmpty()
  @IsDateString()
  tourDate: string; 

  @IsNotEmpty()
  @IsString()
  tourTime: string; 
}

export class UpdateBookTourDto {
  @IsOptional()
  @IsDateString()
  tourDate?: string;

  @IsOptional()
  @IsString()
  tourTime?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Confirmed', 'Cancelled'])
  status?: 'Pending' | 'Confirmed' | 'Cancelled';
}
