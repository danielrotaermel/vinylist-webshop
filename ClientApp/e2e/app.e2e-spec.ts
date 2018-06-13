import { AppPage } from './app.po';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

/**
 * @author Alexander Merker
 */
describe('App', () => {
  let page: AppPage;

  beforeAll(() => {
    browser.driver.manage().window().maximize();
  })

  beforeEach(() => {
    page = new AppPage();
  });

  //Sample test
  it('dummy test', () => {
    page.navigateTo();
    
    let home = element(By.id("home"));

    expect(home).toBeDefined();
    home.click();
  });

});
