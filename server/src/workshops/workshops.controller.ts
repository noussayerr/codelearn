import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { WorkshopsService } from './workshops.service';
import { AuthGuard } from '@nestjs/passport';

class CreateWorkshopBody {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  instructorId!: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  price?: string;

  @IsOptional()
  language?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  thumbnail?: string;
}

@Controller('workshops')
export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}

  @Get()
  list() {
    return this.workshopsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.workshopsService.getById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateWorkshopBody) {
    return this.workshopsService.create(body as any);
  }
}



