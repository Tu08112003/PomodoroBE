import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true, collection: 'todos' })
export class Todo {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 500 })
  content: string;

  @Prop({ trim: true, maxlength: 100, index: true })
  clientId?: string;

  @Prop({ default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.index({ userId: 1, createdAt: -1 });
TodoSchema.index({ userId: 1, clientId: 1 }, { unique: true, sparse: true });
