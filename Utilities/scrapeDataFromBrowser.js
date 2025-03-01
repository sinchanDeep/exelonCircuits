const puppeteer = require("puppeteer");
const insertScrape = require("./insertScrape");

const scrapeDataFromBrowser = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.cashify.in/buy-refurbished-mobile-phones", {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForNetworkIdle();
  await page.waitForSelector(".undefined-0",{timeout : 30000}); 

  const products = await page.evaluate(() => {
    const items = [];
    const phones = document.getElementsByClassName(".undefined-0"); 
    console.log("this is ", phones);

    phones.forEach(phone => {
      const productName = phone.querySelector(".subtitle3") ? phone.querySelector(".subtitle3").innerText : null;
      const price = phone.querySelector(".subtitle3") ? phone.querySelector(".subtitle3").innerText : null;
      const description = phone.querySelector(".subtitle3") ? phone.querySelector(".subtitle3").innerText : null;
      const ratings = phone.querySelector(".body2") ? phone.querySelector(".body2").innerText : null;


      if (productName && price) {
        items.push({
          productName,
          price,
          description,
          ratings,
        });
      }
    });

    return phones;
  });

  console.log('Scraped Products:', products);
  await browser.close();
  insertScrape(products); 
};

module.exports = scrapeDataFromBrowser;
