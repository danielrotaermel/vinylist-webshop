import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

/**
 * @author Alexander Merker
 */
export class UserPage{

    public login_btn = element(By.id("sign_in_btn"));

    public closeOverlay = $(".close-overlay-button");

    public email_field = element(By.id("mat-input-0"));
    public password_field = element(By.id("mat-input-1"));

    public submit = element(By.id("loginButton"));

    public snackbar = $("mat-simple-snackbar");
}