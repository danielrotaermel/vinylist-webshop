

import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

/**
 * @author Alexander Merker
 */
export class UserPage{

    //LOGIN
    public email_login = element (By.id("login_email"));
    public pw_login = element(By.id("login_pw"));

    //REGISTER
    public fN_register = element(By.id("register_firstName"));
    public lN_register = element(By.id("register_lastName"));
    public email_register = element(By.id("register_email"));
    public pw_register = element(By.id("register_password"));

    //SUBMIT BTN
    public submit = element(By.id("submit"));

    //SUCCESS_SNACK_BAR
    public snackbar = $("mat-simple-snackbar");
}