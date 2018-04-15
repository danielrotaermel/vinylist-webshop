import { AppPage } from './app.po';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeAll(() => {
    browser.driver.manage().window().maximize();
  })

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Hello, world!');
    console.log("it works lol");
  });

  // it('demo test 1', () => {
  //   const list = element(By.id("navlist")).all(By.tagName("li"));
  //   list.count().then((val) => {
  //     list.last().click();
  //   });
  // });
});
