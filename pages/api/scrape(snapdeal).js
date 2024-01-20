const { Builder, By, until } = require("selenium-webdriver");

export default async (req, res) => {
  const searchQuery = req.query.q; // Extract search query from request parameters

  const searchSnapdeal = async (searchQuery) => {
    const driver = await new Builder().forBrowser("chrome").build();

    try {
      // Navigate to Snapdeal
      await driver.get(
        `https://www.snapdeal.com/search?keyword=${encodeURIComponent(
          searchQuery
        )}&sort=plth`
      );

      // Wait for search results to load
      await driver.wait(until.elementLocated(By.css(".product-tuple-listing")));

      // Extract and display search results
      const searchResults = await driver
        .findElements(By.css(".product-tuple-listing")) // Changed the CSS selector
        .then(async (items) => {
          const results = [];

          for (const item of items) {
            const elements = {
              title: await item.findElements(By.css(".product-title")),
              price: await item.findElements(By.css(".product-price")),
              links: await item.findElements(By.css("a")),
              imgURL: await item.findElements(By.css(".product-image ")), // Changed to findElements
            };

            const data = {};

            for (const key in elements) {
              if (elements[key].length > 0) {
                if (key === "links") {
                  data[key] = await Promise.all(
                    elements[key].map((element) => element.getAttribute("href"))
                  );
                } else if (key === "imgURL") {
                  data[key] = await elements[key][0].getAttribute("src"); // Get the src attribute
                } else {
                  data[key] = await elements[key][0].getText();
                }
              } else {
                data[key] = null;
              }
            }

            if (data.title !== null && data.price !== null) {
              data.price = data.price.split("Rs.").join("");
              data.price = data.price.replace("Rs.", "");
              const priceNumber = parseFloat(data.price);
              if (!isNaN(priceNumber)) {
                data.price = priceNumber;
              }
              results.push(data);
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
  const searchResults = await searchSnapdeal(searchQuery);
  res.status(200).json(searchResults);
};
