import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyDto } from './dto/property.dto';
import { Property } from './entity/property.entity';


@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(propertyDto: PropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(propertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  async findOne(id: number): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { propertyID: id } });
  }

  async update(id: number, propertyDto: PropertyDto): Promise<Property> {
    await this.propertyRepository.update(id, propertyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propertyRepository.delete(id);
  }
}