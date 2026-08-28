import { BadRequestException } from '@nestjs/common';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

describe('ParseObjectIdPipe', () => {
  it('accepts a valid ObjectId', () => {
    const pipe = new ParseObjectIdPipe();
    const id = '507f1f77bcf86cd799439011';

    expect(pipe.transform(id)).toBe(id);
  });

  it('rejects malformed ids with a 400 error', () => {
    const pipe = new ParseObjectIdPipe();

    expect(() => pipe.transform('not-an-id')).toThrow(BadRequestException);
  });
});
