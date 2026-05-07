import { IsString, MinLength, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNumber()
  rating: number;

  @IsString()
  size: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  promotionAsPercentage: number;

  @IsNumber()
  categoryId: number;
}
