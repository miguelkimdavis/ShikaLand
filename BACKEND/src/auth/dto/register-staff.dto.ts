import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from "class-validator";

export class RegisterStaffDto {
  @IsNotEmpty()
  @IsString()
  staffName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  role: string;
}
