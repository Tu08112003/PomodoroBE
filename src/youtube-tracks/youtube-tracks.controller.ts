import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { YoutubeTracksService } from './youtube-tracks.service';
import { CreateYoutubeTrackDto } from './dto/create-youtube-track.dto';
import { CurrentUser, JwtAuthGuard, ParseObjectIdPipe } from '../common';

@Controller('youtube-tracks')
@UseGuards(JwtAuthGuard)
export class YoutubeTracksController {
  constructor(private readonly youtubeTracksService: YoutubeTracksService) {}

  @Get()
  async findAll(@CurrentUser('sub') userId: string) {
    return this.youtubeTracksService.findAllByUser(userId);
  }

  @Post()
  async create(@CurrentUser('sub') userId: string, @Body() dto: CreateYoutubeTrackDto) {
    return this.youtubeTracksService.create(userId, dto);
  }

  @Delete(':id')
  async delete(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseObjectIdPipe) trackId: string,
  ) {
    await this.youtubeTracksService.delete(userId, trackId);
    return { message: 'YouTube track deleted successfully' };
  }
}
