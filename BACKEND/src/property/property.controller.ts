import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyDto } from './dto/property.dto';
import { Property } from './entity/property.entity';


@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() propertyDto: PropertyDto): Promise<Property> {
    return this.propertyService.create(propertyDto);
  }

  @Get()
  async findAll(): Promise<Property[]> {
    return this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Property> {
    return this.propertyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() propertyDto: PropertyDto,
  ): Promise<Property> {
    return this.propertyService.update(id, propertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.propertyService.remove(id);
  }
}