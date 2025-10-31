import { IsString, IsInt, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  catalogId?: string;

  @IsOptional()
  @IsInt()
  porcentPromo?: number;

  @IsOptional()
  @IsBoolean()
  promo?: boolean;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
}
