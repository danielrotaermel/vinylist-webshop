import {browser, element, by, By, $, $$, ExpectedConditions, ProtractorExpectedConditions} from 'protractor';
import { UserPage } from './user.page';
import { Globals } from '../globals';

/**
 * @author Alexander Merker
 */
describe('User Testcases', () => {
    
    let userPage : UserPage;
    let globals : Globals;

    beforeAll(() => {
        userPage = new UserPage();
        globals = new Globals();
    });

    it('should locate the login dialogue', () => {
        userPage.login_btn.click();

        expect(userPage.email_field).toBeDefined();
        expect(userPage.login_btn).toBeDefined();

        userPage.closeOverlay.click();
    });

    it('should login to vinylist', () => {
        
        userPage.login_btn.click();

        //Using globally declared testuser : email/pw
        userPage.email_field.sendKeys(globals.g_login_email);
        userPage.password_field.sendKeys(globals.g_login_pw);

        userPage.submit.click();

        expect(userPage.snackbar).toBeDefined();
    });

});