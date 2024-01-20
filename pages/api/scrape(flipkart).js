// pages/api/scrapeFlipkart.js
const { Builder, By, Key, until } = require("selenium-webdriver");

export default async (req, res) => {
  const searchQuery = req.query.q; // Extract search query from request parameters

  const searchFlipkart = async (searchQuery) => {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
      // Navigate to Flipkart
      await driver.get("https://www.flipkart.com");

      // Type the search query into the search input field
      await driver
        .findElement(By.css("input[type='text'][name='q']"))
        .sendKeys(searchQuery, Key.RETURN);

      // Wait for search results to load
      await driver.wait(until.elementsLocated(By.css("._1AtVbE")));

      // Extract and display search results
      let searchResults = await driver
        .findElements(By.css("._1AtVbE"))
        .then(async (elements) => {
          let results = [];
          for (let element of elements) {
            let titleElement = await element
              .findElement(By.css("._4rR01T"))
              .catch(() => null);
            if (!titleElement) {
              titleElement = await element
                .findElement(By.css(".s1Q9rs"))
                .catch(() => null);
            }
            const title = titleElement ? await titleElement.getText() : null;
            const priceElement = await element
              .findElement(By.css("._30jeq3"))
              .catch(() => null);
            let price = null;
            if (priceElement) {
              let priceText = await priceElement.getText();
              priceText = priceText.split(",").join("");
              priceText = priceText.replace("₹", ""); // Assuming the price is in Rupees
              const priceNumber = parseFloat(priceText);
              if (!isNaN(priceNumber)) {
                price = priceNumber;
              }
            }
            const reviewsElement = await element
              .findElement(By.css("._2_R_DZ"))
              .catch(() => null);
            const reviews = reviewsElement
              ? await reviewsElement.getText()
              : null;

            if (title !== null && reviews !== null) {
              results.push({ title, price });
            }
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
  const searchResults = await searchFlipkart(searchQuery);
  res.status(200).json(searchResults);
};
