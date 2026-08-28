import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WallpaperDocument = HydratedDocument<Wallpaper>;

export enum WallpaperType {
  IMAGE = 'image',
  VIDEO = 'video',
  CUSTOM = 'custom',
}

@Schema({ timestamps: false, collection: 'wallpapers' })
export class Wallpaper {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: Object.values(WallpaperType) })
  type: WallpaperType;

  @Prop({ trim: true, default: '' })
  label: string;

  @Prop({ default: () => new Date() })
  addedAt: Date;
}

export const WallpaperSchema = SchemaFactory.createForClass(Wallpaper);
WallpaperSchema.index({ userId: 1, addedAt: -1 });
