let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let pageName = process.argv[3];
let postToLike = process.argv[4];
let url, pwd, user;
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.url;
    user = credentials.user;
    pwd = credentials.pwd;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo: 400
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(url, {
        waitUntil: "networkidle2"
    });

    await tab.waitForSelector("#email");
    await tab.type("#email", user, { delay: 200 });
    await tab.type("input[data-testid='royal_pass']", pwd, { delay: 200 });
    await tab.click("#u_0_b");
    console.log("User logged in");
    await tab.goto(`https://www.facebook.com/${pageName}/`, { waitUntil: "networkidle2" });
    // multiple url  change
    await Promise.all([tab.click("div[data-key='tab_posts']"), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    let idx = 0
    do {
        // _1xnd> ._4-u2.4-u8
        await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");

        let allposts = await tab.$$("#pagelet_timeline_main_column ._1xnd>._4-u2._4-u8");
        let cPost = allposts[idx];
        let cPostLike = await cPost.$("._666k ._8c74 a");
        await cPostLike.click({ delay: 200 });
        idx++;

        await tab.waitForSelector(".uiMorePageLoader", { hidden: true });

    } while (idx < postToLike)

    // user,pwd,url
})()