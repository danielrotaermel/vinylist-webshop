import { ProductImage } from './product-image';

describe('ProductImage', () => {
  it('should construct base64 image url', () => {
    let image = new ProductImage();
    image.imageType = 'png';
    image.base64String = 'test';

    expect(image.getImageDataString()).toBe('data:png;base64,test');
  });
});
