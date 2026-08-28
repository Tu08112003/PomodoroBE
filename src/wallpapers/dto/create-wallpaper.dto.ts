import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { WallpaperType } from '../schemas/wallpaper.schema';

export class CreateWallpaperDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsEnum(WallpaperType)
  type: WallpaperType;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  label?: string;
}
