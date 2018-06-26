import {browser, element, by, By, $, $$, ExpectedConditions, ProtractorExpectedConditions} from 'protractor';
import { ProductPage } from './product.page';
import { Globals } from '../globals';

/**
 * @author Alexander Merker
 */
describe('User Testcases', () => {
    
    let productPage : ProductPage;
    let globals : Globals;

    beforeAll(() => {
        productPage = new ProductPage();
        globals = new Globals();
    });

    //Goes to the product details of a product and tries to add it to the wishlist
    xit('should add a product to wishlist', () => {
        //Go to product details of first product
        productPage.tiles_first.click();

        //Check product information to be displayed
        expect(productPage.title.getText()).not.toBe("");
        expect(productPage.artist.getText()).not.toBe("");
        expect(productPage.label.getText()).not.toBe("");
        expect(productPage.description.getText()).not.toBe("");
        expect(productPage.price.getText()).not.toBe("");

        //Wishlist button must be present
        expect(productPage.wishlistBtn).toBeDefined();
        productPage.wishlistBtn.click();

        //Click to open wishlist overlay and see if an element has been added

        //TODO: Write this

        globals.g_home_btn.click();
    });

    //Goes to the product details of a product and tries to add it to the shopping cart
    it('should add a product to cart', () => {
        //Go to product details of first product
        productPage.productTile.first().click();

        //Check product information to be displayed
        expect(productPage.title.getText()).not.toBe("");
        expect(productPage.artist.getText()).not.toBe("");
        expect(productPage.label.getText()).not.toBe("");
        expect(productPage.description.getText()).not.toBe("");
        expect(productPage.price.getText()).not.toBe("");

        //Wishlist button must be present
        expect(productPage.cartBtn).toBeDefined();
        productPage.cartBtn.click();

        //Click to open wishlist overlay and see if an element has been added
        productPage.cartOverlay.click();

        //Count objects on the cart list and check if something has been added
        productPage.cartList.count().then((ct) => {
            expect(ct).toBeGreaterThan(0);
        });

        globals.g_home_btn.click();
    });
});
