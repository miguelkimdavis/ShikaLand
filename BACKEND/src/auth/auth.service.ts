import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { Staff } from './entity/staff.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterStaffDto } from './dto/register-staff.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const customer = await this.customerRepo.findOne({ where: { email } });
    const staff = await this.staffRepo.findOne({ where: { email } });

    if (customer && await bcrypt.compare(password, customer.passwordHash)) {
      return this.createToken(customer.customerID, 'user');
    } else if (staff && await bcrypt.compare(password, staff.passwordHash)) {
      return this.createToken(staff.staffID, 'admin');
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private createToken(id: number, role: string) {
    const payload = { sub: id, role };
    return {
      access_token: this.jwtService.sign(payload),
      role,
      userId: id, 
    };
  }
  
  async registerCustomer(dto: RegisterCustomerDto) {
    const { fullName, phoneNumber, email, password, confirmPassword } = dto;
  
    const existingCustomer = await this.customerRepo.findOne({ where: [{ email }, { phoneNumber }] });
    if (existingCustomer) throw new BadRequestException('Customer with this email or phone already exists');
  
    if (password !== confirmPassword) throw new BadRequestException('Passwords do not match');
    const hash = await bcrypt.hash(password, 10);
    const newUser = this.customerRepo.create({ fullName, phoneNumber, email, passwordHash: hash });
    return this.customerRepo.save(newUser);
  }
  
  async getCustomerCount() {
    const count = await this.customerRepo.count();
    return { totalCustomers: count };
  }
  
  async registerStaff(dto: RegisterStaffDto) {
    const { staffName, phoneNumber, email, password, confirmPassword, role } = dto;
  
    const existingStaff = await this.staffRepo.findOne({ where: [{ email }, { phoneNumber }] });
    if (existingStaff) throw new BadRequestException('Staff with this email or phone already exists');
  
    if (password !== confirmPassword) throw new BadRequestException('Passwords do not match');
    const hash = await bcrypt.hash(password, 10);
    const newStaff = this.staffRepo.create({ staffName, phoneNumber, email, passwordHash: hash, role });
    return this.staffRepo.save(newStaff);
  }
  
}

