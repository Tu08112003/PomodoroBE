import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateYoutubeTrackDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  videoId?: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
