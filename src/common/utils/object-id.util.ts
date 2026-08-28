import { UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';

export function userObjectId(userId: string): Types.ObjectId {
  if (!Types.ObjectId.isValid(userId)) {
    throw new UnauthorizedException('Invalid authenticated user');
  }

  return new Types.ObjectId(userId);
}
