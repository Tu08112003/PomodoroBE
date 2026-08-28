import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';

function createQuery<T>(value: T) {
  return {
    select: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(value),
  };
}

describe('TodosService', () => {
  it('rejects an empty update without querying the database', async () => {
    const model = { findOneAndUpdate: jest.fn() };
    const service = new TodosService(model as never);

    await expect(
      service.update('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012', {}),
    ).rejects.toThrow(BadRequestException);
    expect(model.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('uses the authenticated user in update ownership query', async () => {
    const todo = { id: 'todo' };
    const query = createQuery(todo);
    const model = { findOneAndUpdate: jest.fn().mockReturnValue(query) };
    const service = new TodosService(model as never);

    await expect(
      service.update('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012', {
        completed: true,
      }),
    ).resolves.toBe(todo);

    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: '507f1f77bcf86cd799439012',
        userId: expect.objectContaining({
          _bsontype: 'ObjectId',
        }),
      },
      { $set: { completed: true } },
      { new: true, runValidators: true },
    );
  });

  it('returns not found when an owned update does not match', async () => {
    const query = createQuery(null);
    const model = { findOneAndUpdate: jest.fn().mockReturnValue(query) };
    const service = new TodosService(model as never);

    await expect(
      service.update('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012', {
        content: 'Updated',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
