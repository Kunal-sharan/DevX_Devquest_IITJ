// pages/api/scrapeCroma.js
import { Builder, By, until } from "selenium-webdriver";

export default async (req, res) => {
  const searchQuery = req.query.q; // Extract search query from request parameters

  const searchCroma = async (searchQuery) => {
    const driver = await new Builder().forBrowser("chrome").build();

    try {
      // Navigate to Croma
      await driver.get(
        `https://www.croma.com/searchB?q=${encodeURIComponent(
          searchQuery
        )}%3Arelevance&text=${encodeURIComponent(searchQuery)}`
      );

      // Wait for search results to load
      await driver.wait(until.elementLocated(By.css(".product-item")));

      // Extract and display search results
      const searchResults = await driver
        .findElements(By.css(".product-item"))
        .then(async (items) => {
          const results = [];

          for (const item of items) {
            const titleElement = await item.findElement(
              By.css(".product-title")
            );
            const priceElement = await item.findElement(
              By.css(".amount.plp-srp-new-amount")
            );
            const linkElement = await item.findElement(By.css("a"));
            const imgElement = await item.findElement(By.css("img"));

            // Get the src attribute of the image element
            const imgUrl = await imgElement.getAttribute("src");

            const title = titleElement ? await titleElement.getText() : null;
            let price = priceElement ? await priceElement.getText() :null;
            let links = linkElement
              ? await linkElement.getAttribute("href")
              : null;
            price = price.split(",").join("");
            price = price.replace("₹", ""); // Assuming the price is in Rupees
            const priceNumber = parseFloat(price);
            if (!isNaN(priceNumber)) {
              price = priceNumber;
            }
            if (title !== null && price !== null && links !== null) {
              results.push({ title, price, links,imgUrl });
            }
          }

          return results;
        });

      return searchResults;
    } catch (error) {
      console.error("Error:", error);
      return []; // Return an empty array on error
    } finally {
      // Close the browser
      await driver.quit();
    }
  };

  try {
    // Use the search query from the request parameters
    const searchResults = await searchCroma(searchQuery);

    // Send a JSON response with proper headers
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(searchResults));
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
