import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNumber()
  price: number;
  @IsNumber()
  rating?: number;
  @IsNumber()
  instock?: number;
  @IsNumber()
  countSold?: number;
  @IsString()
  size?: string;

  @IsString()
  image?: string;

  @IsNumber()
  promotionAsPercentage?: number;
  @IsNumber()
  categoryId: number;
}
