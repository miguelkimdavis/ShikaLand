import {
    IsString,
    IsNumber,
    IsEnum,
    IsNotEmpty,
  } from 'class-validator';
  
  export class PropertyDto {
    @IsNotEmpty()
    @IsString()
    location: string;
  
    @IsNotEmpty()
    @IsString()
    plotSize: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsEnum(['Available', 'Sold'])
    status: 'Available' | 'Sold' ;
    
  
    @IsNotEmpty()
    @IsString()
    imageURLs: string;
  }
  