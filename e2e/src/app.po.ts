import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getNumberCards(): ElementArrayFinder {
    return element(by.css('sv-root div')).all(by.tagName('sv-number-card'));
  }
}
