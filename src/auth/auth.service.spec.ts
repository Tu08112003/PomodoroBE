import { ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed'),
}));

describe('AuthService', () => {
  it('maps a duplicate email race to ConflictException', async () => {
    const usersService = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockRejectedValue({ code: 11000 }),
    };
    const service = new AuthService(usersService as never, {} as never, {} as never);

    await expect(
      service.register({
        email: 'user@example.com',
        password: 'password',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
