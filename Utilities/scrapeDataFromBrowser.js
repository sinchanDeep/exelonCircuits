const puppeteer = require("puppeteer");
const insertScrape = require("../Utilities/insertScrape");
const productModel = require("../models/productModel");

const scrapeDataFromBrowser = async () => {
  const maxIdProduct = await productModel.findOne({}).sort({ prodId: -1 });
  let newId = maxIdProduct ? Number(maxIdProduct.prodId) + 1 : 1;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.flipkart.com/mobiles/pr?sid=tyy%2C4io&p%5B%5D=facets.brand%255B%255D%3Dvivo&param=1811&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InRpdGxlIjp7Im11bHRpVmFsdWVkQXR0cmlidXRlIjp7ImtleSI6InRpdGxlIiwiaW5mZXJlbmNlVHlwZSI6IlRJVExFIiwidmFsdWVzIjpbIlZpdm8gc21hcnRwaG9uZXMiXSwidmFsdWVUeXBlIjoiTVVMVElfVkFMVUVEIn19fX19&wid=42.productCard.PMU_V2_27",
    { waitUntil: "domcontentloaded" }
  );

  await page.waitForNetworkIdle();
  await Promise.all([
    page.waitForSelector(".KzDlHZ", { timeout: 10000 }),
    page.waitForSelector(".Nx9bqj", { timeout: 10000 }),
    page.waitForSelector(".XQDdHH", { timeout: 10000 }),
  ]);

  const products = await page.evaluate((startingId) => {
    const items = [];
    const phoneNames = document.querySelectorAll(".KzDlHZ");
    const phonePrice = document.querySelectorAll(".Nx9bqj");
    const ratings = document.querySelectorAll(".XQDdHH");

    let currentId = startingId;

    for (let i = 0; i < phoneNames.length; i++) {
      items.push({
        prodId: String(currentId),
        productName: phoneNames[i]?.innerHTML.trim() || "Not available",
        price: phonePrice[i]?.innerHTML.trim() || "Not Available",
        description: phoneNames[i]?.innerHTML.trim() || "Not available",
        ratings: ratings[i]?.textContent.trim() || "Not Available",
      });

      currentId++;
    }
    return items;
  }, newId);

  if (products.length > 0) {
    insertScrape(products);
  } else {
    console.log("Data did not push to DB; some error occurred.");
  }

  await browser.close();
};

module.exports = scrapeDataFromBrowser;
