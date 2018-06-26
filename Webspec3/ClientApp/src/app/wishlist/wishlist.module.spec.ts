import { WishlistModule } from './wishlist.module';

describe('WishlistModule', () => {
  let wishlistModule: WishlistModule;

  beforeEach(() => {
    wishlistModule = new WishlistModule();
  });

  it('should create an instance', () => {
    expect(wishlistModule).toBeTruthy();
  });
});
