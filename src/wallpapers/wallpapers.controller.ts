import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, ParseObjectIdPipe } from '../common';
import { CreateWallpaperDto } from './dto/create-wallpaper.dto';
import { WallpapersService } from './wallpapers.service';

@Controller('wallpapers')
@UseGuards(JwtAuthGuard)
export class WallpapersController {
  constructor(private readonly wallpapersService: WallpapersService) {}

  @Get()
  findAll(@CurrentUser('sub') userId: string) {
    return this.wallpapersService.findAllByUser(userId);
  }

  @Post()
  create(@CurrentUser('sub') userId: string, @Body() dto: CreateWallpaperDto) {
    return this.wallpapersService.create(userId, dto);
  }

  @Delete(':id')
  async delete(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseObjectIdPipe) wallpaperId: string,
  ) {
    await this.wallpapersService.delete(userId, wallpaperId);
    return { message: 'Wallpaper deleted successfully' };
  }
}
