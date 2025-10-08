import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AuthService } from './auth.service';

class SignupBody {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  name!: string;

  @MinLength(6)
  password!: string;
}

class LoginBody {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupBody) {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }
}



