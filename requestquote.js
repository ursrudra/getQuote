const puppeteer = require("puppeteer");
const Standings = require("./scrapers/standings");
const Email = require("./utils/email");

/**
 * Run Standings
 */
(async () => {
    let browser;
    let page;
    let url = "https://www.brainyquote.com/quote_of_the_day";



    try {
        browser = await puppeteer.launch({
            headless: true
        });

        page = await browser.newPage();

        const standings = await new Standings(browser, page, url).main();

        // Make sure to uncomment the email code if you want to test out the email functionality.
        // Just remember to add your e-mail credentials in utils/email first.

        const {
            imageUrl,
            quote,
            author
        } = standings;


        await Email.send(
            `<div style="width:600px;box-shadow: 1px 10px 10px #eeeeee;padding-bottom: 40px;">
        <img style="width:100%;" src='https://www.brainyquote.com${imageUrl}' alt='${quote} - ${author}'/>
    <figure>
        <blockquote style="font-size: 24px;font-weight: 600;">
         ${quote}
        </blockquote>
        <figcaption style="float: right;">
          &mdash;${author}</figcaption>
      </figure>  
    </div>`
        );
    } catch (error) {
        await Email.send(error.stack, true);
    }

    await browser.close();
})();