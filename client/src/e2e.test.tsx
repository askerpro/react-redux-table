import puppeteer, { Browser, Page } from 'puppeteer';

jest.setTimeout(30000);

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  page.emulate({
    viewport: {
      width: 360,
      height: 600,
    },
    userAgent: '',
  });
});

describe('on page load ', () => {
  test('Loading spinner works correctly', async () => {
    const html = await page.$eval('h1', (e) => e.innerHTML);
    expect(html).toBe('Загрузка');
  }, 5000);
});

describe('filter tests ', () => {
  test('markets filters loads correctly', async () => {
    const selector = '#market-filters .MuiGrid-item';
    await page.waitForSelector(selector);
    const marketsFilters = await page.$$(selector);
    expect(marketsFilters.length).toBe(5);
  }, 5000);
  test('markets filters works correctly', async () => {
    let bnbButton;
    const selectedMarket = 'BNB';
    const selector = '#market-filters .MuiGrid-item button';
    await page.waitForSelector(selector);
    const marketsFilterButtons = await page.$$(selector);
    // eslint-disable-next-line no-restricted-syntax
    for (const button of marketsFilterButtons) {
      // eslint-disable-next-line no-await-in-loop
      const buttonLabel = await page.evaluate((el) => el.innerText, button);
      if (buttonLabel === selectedMarket) bnbButton = button;
    }
    await bnbButton?.click();
    const isCorrectlyFiltered = await page.evaluate((selectedMarketArg) => {
      const elements = Array.from(
        document
          .querySelectorAll(
            '.ReactVirtualized__Grid__innerScrollContainer .ReactVirtualized__Table__rowColumn[aria-colindex="1"] .MuiTableCell-body',
          )
          .values(),
      );
      return (
        elements.reduce((count, element) => {
          const market = element.textContent?.split('/')[1].replace(/ /g, '');
          if (market === selectedMarketArg) return count + 1;
          return count;
        }, 0) === elements.length
      );
    }, selectedMarket);

    expect(isCorrectlyFiltered).toBe(true);
  }, 5000);

  test('search filter works correctly', async () => {
    let bnbButton;
    const filterText = 'ba';
    const selectedMarket = 'BNB';
    const selector = '#market-filters .MuiGrid-item button';
    await page.waitForSelector(selector);
    const marketsFilterButtons = await page.$$(selector);
    // eslint-disable-next-line no-restricted-syntax
    for (const button of marketsFilterButtons) {
      // eslint-disable-next-line no-await-in-loop
      const buttonLabel = await page.evaluate((el) => el.innerText, button);
      if (buttonLabel === selectedMarket) bnbButton = button;
    }
    await bnbButton?.click();
    await page.type('#search-field', filterText);
    const isCorrectlyFiltered = await page.evaluate((filterTextArg) => {
      const elements = Array.from(
        document
          .querySelectorAll(
            '.ReactVirtualized__Grid__innerScrollContainer .ReactVirtualized__Table__rowColumn[aria-colindex="1"] .MuiTableCell-body',
          )
          .values(),
      );

      return (
        elements.reduce((count, element) => {
          const coinName = element.textContent?.split('/')[0].replace(/ /g, '');
          if (coinName?.toLowerCase().includes(filterTextArg)) return count + 1;
          return count;
        }, 0) === elements.length
      );
    }, filterText);
    expect(isCorrectlyFiltered).toBe(true);
  }, 5000);
});
