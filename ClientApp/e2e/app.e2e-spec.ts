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

  //TODO: Configure protractor.conf so the testing doesnt crash when this is missing or implement a suitable global test
  it('dummy test', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Hello, world!');
  });

});
