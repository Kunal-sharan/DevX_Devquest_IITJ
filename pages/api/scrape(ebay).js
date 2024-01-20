// pages/api/scrape.js
import { Builder, By, until } from "selenium-webdriver";
export default async (req, res) => {
  const searchQuery = req.query.q; // Extract search query from request parameters

  const searchEbay = async (searchQuery) => {
    const driver = await new Builder().forBrowser("firefox").build();

    try {
      // Navigate to eBay
      await driver.get("https://www.ebay.com");

      // Type the search query into the search input field
      await driver.findElement(By.id("gh-ac")).sendKeys(searchQuery);

      // Click the search button
      await driver.findElement(By.id("gh-btn")).click();

      // Wait for search results to load
      await driver.wait(until.elementsLocated(By.css(".s-item , .clipped")));

      // Extract and display search results
      const searchResults = await driver
        .findElements(By.css(".s-item"))
        .then(async (items) => {
          const results = [];
          for (const item of items) {
            const titleElement = await item.findElement(
              By.css(".s-item__title")
            );
            const title = (await titleElement.getText()) || null;

            const priceElement = await item.findElement(
              By.css(".s-item__price")
            );
            const imgElement = await item.findElement(By.css("img"));
            const linkElement = await item.findElement(By.css(".s-item__link"));

            const imgURL = await imgElement.getAttribute("src");
            const links = await linkElement.getAttribute("href");

            let price = null;
            if (priceElement) {
              let priceText = await priceElement.getText();
              priceText = priceText.replace("$", "");
              const priceNumber = parseFloat(priceText);
              if (!isNaN(priceNumber)) {
                price = priceNumber * 80;
              }
            }

            results.push({ title, price, links, imgURL });
          }
          return results;
        });

      return searchResults;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the browser
      await driver.quit();
    }
  };

  // Use the search query from the request parameters
  const searchResults = await searchEbay(searchQuery);
  res.status(200).json(searchResults);
};
