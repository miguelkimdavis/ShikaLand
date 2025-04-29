import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from '../../property/entity/property.entity'; 

@Entity('booktour')
export class BookTour {
  @PrimaryGeneratedColumn()
  bookTourID: number;

  @Column()
  customerID: number;

  @Column()
  propertyID: number;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyID' })
  property: Property;

  @Column({ type: 'date' })
  tourDate: string;

  @Column({ type: 'time' })
  tourTime: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookingDate: Date;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  })
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}
