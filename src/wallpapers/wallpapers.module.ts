import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../common';
import { Wallpaper, WallpaperSchema } from './schemas/wallpaper.schema';
import { WallpapersController } from './wallpapers.controller';
import { WallpapersService } from './wallpapers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wallpaper.name, schema: WallpaperSchema }])],
  controllers: [WallpapersController],
  providers: [WallpapersService, JwtAuthGuard],
})
export class WallpapersModule {}
