import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type YoutubeTrackDocument = HydratedDocument<YoutubeTrack>;

@Schema({ timestamps: false, collection: 'youtube_tracks' })
export class YoutubeTrack {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  videoId: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: () => new Date() })
  addedAt: Date;
}

export const YoutubeTrackSchema = SchemaFactory.createForClass(YoutubeTrack);

// Compound index for user's tracks
YoutubeTrackSchema.index({ userId: 1, addedAt: -1 });
