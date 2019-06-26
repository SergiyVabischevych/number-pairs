import { AppPage } from './app.po';
import { browser, logging, ElementFinder } from 'protractor';

describe('number-pairs-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display 36 cells', () => {
    expect(page.getNumberCards().count()).toBe(36);
  });

  it('should display 36 values "#"', () => {
    page.getNumberCards().each((element: ElementFinder) => {
      expect(element.getText()).toEqual('#');
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
