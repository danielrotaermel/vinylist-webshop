import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

/**
 * @author Alexander Merker
 */
export class ProductPage{

    //Product tile in main overview, click to into product detail view
    public productTile = $$(".product-container");

    public tiles_first = this.productTile.first().element(By.tagName("a"));

    //Product title, artist, label, price, description
    public detail_container = $(".detail-container");
    public title = this.detail_container.element(By.id("productTitleField"));
    public artist =  this.title.$(".artist");
    public label = this.detail_container.$(".label");
    public description = this.detail_container.$(".row.description");
    public price = this.detail_container.$(".price");

    //Add to Wishlist / Cart Button
    public wishlistBtn = element(By.id("addWishlistBtn"));
    public cartBtn = element(By.id("addCartBtn"));

    //Wishlist / Cart Overlays, to check if product has been added
    public wishlistOverlay = element(By.id("wishlistOverlay"));
    public cartOverlay = element(By.id("cartOverlay"));

    public openedOverlay = $(".cart-overlay.mat-card");
    public cartList = this.openedOverlay.element(by.tagName("app-cart-list")).all(by.tagName("li"));
    //wishListList
}