import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userObjectId } from '../common/utils/object-id.util';
import { CreateWallpaperDto } from './dto/create-wallpaper.dto';
import { Wallpaper, WallpaperDocument } from './schemas/wallpaper.schema';

@Injectable()
export class WallpapersService {
  constructor(@InjectModel(Wallpaper.name) private wallpaperModel: Model<WallpaperDocument>) {}

  async findAllByUser(userId: string): Promise<WallpaperDocument[]> {
    return this.wallpaperModel
      .find({ userId: userObjectId(userId) })
      .select('-userId')
      .sort({ addedAt: -1 })
      .exec();
  }

  async create(userId: string, dto: CreateWallpaperDto): Promise<WallpaperDocument> {
    const wallpaper = new this.wallpaperModel({
      userId: userObjectId(userId),
      url: dto.url,
      type: dto.type,
      label: dto.label || '',
    });

    const saved = await wallpaper.save();
    saved.set('userId', undefined, { strict: false });
    return saved;
  }

  async delete(userId: string, wallpaperId: string): Promise<void> {
    const result = await this.wallpaperModel
      .findOneAndDelete({ _id: wallpaperId, userId: userObjectId(userId) })
      .exec();

    if (!result) {
      throw new NotFoundException('Wallpaper not found');
    }
  }
}
