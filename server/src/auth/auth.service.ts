import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface SignupDto {
  email: string;
  name: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signup({ email, name, password }: SignupDto) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new ConflictException('Email already registered');
    if (password.length < 6) throw new BadRequestException('Password too short');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, name, role: 'student', passwordHash });
    return this.issueToken(user.id, user.email, user.name, user.role);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.issueToken(user.id, user.email, user.name, user.role);
  }

  private issueToken(sub: string, email: string, name: string, role: string) {
    const payload = { sub, email, name, role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: sub, email, name, role } };
  }
}



