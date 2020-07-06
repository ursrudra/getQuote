const fs = require("fs");
/**
 * @class Standings
 */
module.exports = class Standings {
  /**
   * @constructor
   */
  constructor(browser, page, url) {
    this.browser = browser;
    this.page = page;
    this.url = url;

    this.standings = [];
  }

  /**
   * @method main
   */
  async main() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    // await this.page.waitFor(2000);

    // Decided to add more data for fun. Notice how I also refactored to cut down on some boilerplate
    // by adding a reusable function inside of the map statement.
    this.standings = await this.page.evaluate(() => {
      const container = document.querySelector('.bqQt');
      const childrenList = container && container.children;

      const imageUrl = container && container.querySelector('.mblCenterPhot > a > img').dataset.imgUrl;
      const quote = childrenList && childrenList[1].children[0].textContent;
      const author = childrenList && childrenList[1].children[1].textContent;
      
      return { imageUrl,quote,author}

    }

      // Array.from(document.querySelectorAll("tbody > tr")).map(team => {
      //   const getData = child =>
      //     team
      //       .querySelector(`td:nth-child(${child})`)
      //       .getAttribute("data-value");

      //   return [getData(2), getData(3), getData(4), getData(5), getData(7)];
      // })

    );

    this.writeToJson();
    return this.standings;
  }

  /**
   * @method writeToJson
   */
  writeToJson() {
  fs.writeFileSync('./data/standings.json', JSON.stringify(this.standings), function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
 });
  }
};