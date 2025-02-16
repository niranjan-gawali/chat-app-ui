import { IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(6, 20)
  confirmPassword: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  constructor(
    email: string = '',
    password: string = '',
    confirmPassword: string = '',
    firstName: string = '',
    lastName: string = ''
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
