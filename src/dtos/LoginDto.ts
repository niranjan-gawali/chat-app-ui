import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  constructor(email: string = '', password: string = '') {
    this.email = email;
    this.password = password;
  }
}
