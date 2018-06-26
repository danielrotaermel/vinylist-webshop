import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

/**
 * @author Alexander Merker
 */
export class UserPage{

    public login_btn = $(".open-overlay-button");

    public closeOverlay = $(".close-overlay-button");

    public email_field = element(By.id("mat-input-0"));
    public password_field = element(By.id("mat-input-1"));

    public submit = $(".mat-raised-button");

    public snackbar = $("mat-simple-snackbar");
}
