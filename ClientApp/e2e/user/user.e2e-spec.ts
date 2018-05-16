import {browser, element, by, By, $, $$, ExpectedConditions, ProtractorExpectedConditions} from 'protractor';
import { UserPage } from './user.page'

/**
 * @author Alexander Merker
 */
describe('User Testcases', () => {
    
    let userPage : UserPage;
    let EC : ProtractorExpectedConditions;

    //TODO: REFACTOR THIS INTO PAGE FILE
    const link = element(By.id("login_link"));

    beforeAll(() => {
        userPage = new UserPage();
    });

    //TODO: Button click doesnt work yet. Form locked?
    xit('should locate the login dialogue', () => {
        link.click().then(() => {
            userPage.email_login.sendKeys("admin@example.com");
            userPage.pw_login.sendKeys("admin");
            browser.wait(EC.elementToBeClickable(userPage.submit), 5000);
            userPage.submit.click();

            browser.sleep(5000);
            expect(userPage.snackbar).toBeDefined;
            expect(userPage.snackbar.getText()).toBe("Logged in successfully")
        });
    });

    xit('should locate the register dialogue', () => {

    });


});