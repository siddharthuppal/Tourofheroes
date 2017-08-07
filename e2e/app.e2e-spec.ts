import { Angular2WorkshopPage } from './app.po';

describe('angular2-workshop App', () => {
  let page: Angular2WorkshopPage;

  beforeEach(() => {
    page = new Angular2WorkshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
