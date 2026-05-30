import { IsString, IsInt } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsInt()
  categoryId: number;
}