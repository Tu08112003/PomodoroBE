import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { YoutubeTrack, YoutubeTrackDocument } from './schemas/youtube-track.schema';
import { CreateYoutubeTrackDto } from './dto/create-youtube-track.dto';
import { userObjectId } from '../common/utils/object-id.util';

@Injectable()
export class YoutubeTracksService {
  constructor(
    @InjectModel(YoutubeTrack.name) private youtubeTrackModel: Model<YoutubeTrackDocument>,
  ) {}

  async findAllByUser(userId: string): Promise<YoutubeTrackDocument[]> {
    return this.youtubeTrackModel
      .find({ userId: userObjectId(userId) })
      .select('-userId')
      .sort({ addedAt: -1 })
      .exec();
  }

  async create(userId: string, dto: CreateYoutubeTrackDto): Promise<YoutubeTrackDocument> {
    const videoId = dto.videoId || this.extractVideoId(dto.url);

    const track = new this.youtubeTrackModel({
      userId: userObjectId(userId),
      url: dto.url,
      videoId,
      title: dto.title,
    });

    const saved = await track.save();
    saved.set('userId', undefined, { strict: false });
    return saved;
  }

  async delete(userId: string, trackId: string): Promise<void> {
    const result = await this.youtubeTrackModel
      .findOneAndDelete({
        _id: trackId,
        userId: userObjectId(userId),
      })
      .exec();

    if (!result) {
      throw new NotFoundException('YouTube track not found');
    }
  }

  private extractVideoId(url: string): string {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return url;
  }
}
