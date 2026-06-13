import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

     if (existing) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

     const hashedPassword =
      await bcrypt.hash(dto.password, 10);

      return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: 'admin',
      },
    });
  }

  async login(dto: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });