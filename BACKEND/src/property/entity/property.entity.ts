import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('Property')
  export class Property {
    @PrimaryGeneratedColumn()
    propertyID: number;
  
    @Column({ type: 'varchar', length: 255 })
    location: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    plotSize: string;
  
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    price: number;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({
      type: 'enum',
      enum: ['Available', 'Pending', 'Sold', 'Inactive'],
      default: 'Available',
    })
    status: 'Available' | 'Pending' | 'Sold' | 'Inactive';
  
    @CreateDateColumn()
    listingDate: Date;
  
    @Column({ type: 'text', nullable: true })
    imageURLs: string;
  }
  