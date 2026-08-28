import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeTrack, YoutubeTrackSchema } from './schemas/youtube-track.schema';
import { YoutubeTracksService } from './youtube-tracks.service';
import { YoutubeTracksController } from './youtube-tracks.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: YoutubeTrack.name, schema: YoutubeTrackSchema }])],
  controllers: [YoutubeTracksController],
  providers: [YoutubeTracksService],
})
export class YoutubeTracksModule {}
