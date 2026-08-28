import { WallpapersService } from './wallpapers.service';
import { WallpaperType } from './schemas/wallpaper.schema';

function createQuery<T>(value: T) {
  return {
    select: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(value),
  };
}

describe('WallpapersService', () => {
  it('filters list queries by authenticated user', async () => {
    const query = createQuery([]);
    const model = { find: jest.fn().mockReturnValue(query) };
    const service = new WallpapersService(model as never);

    await expect(service.findAllByUser('507f1f77bcf86cd799439011')).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({
      userId: expect.objectContaining({ _bsontype: 'ObjectId' }),
    });
  });

  it('creates a wallpaper with the authenticated user and supplied data', async () => {
    const saved = { set: jest.fn() };
    const model = jest
      .fn()
      .mockImplementation(() => ({ save: jest.fn().mockResolvedValue(saved) }));
    const service = new WallpapersService(model as never);

    await expect(
      service.create('507f1f77bcf86cd799439011', {
        url: 'https://example.com/wallpaper.jpg',
        type: WallpaperType.IMAGE,
        label: 'Desk',
      }),
    ).resolves.toBe(saved);

    expect(model).toHaveBeenCalledWith({
      userId: expect.objectContaining({ _bsontype: 'ObjectId' }),
      url: 'https://example.com/wallpaper.jpg',
      type: WallpaperType.IMAGE,
      label: 'Desk',
    });
  });
});
