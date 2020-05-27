let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login;
    email = credentials.email;
    pwd = credentials.pwd;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--incognito"]
    });
    // creates an empty page
    // await browser.newPage();
    // returns array of curently open tab
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(login, {
        waitUntil: "networkidle2"
    });
    // 2.
    //wait for element
    await tab.waitForSelector("#input-1");
    await tab.type("#input-1", email, { delay: 100 });
    // console.log("Email entered");
    await tab.waitForSelector("#input-2");
    await tab.type("#input-2", pwd, { delay: 100 });
    await tab.waitForSelector("button[data-analytics='LoginPassword']");
    // if a click causes navigation
    // await tab.click("button[data-analytics='LoginPassword']");
    // 3. 
    await navigationHelper(tab, "button[data-analytics='LoginPassword']");
    await tab.waitForSelector("a[data-analytics='NavBarProfileDropDown']");
    await tab.click("a[data-analytics='NavBarProfileDropDown']");
    await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", { visible: true });
    await navigationHelper(tab,"a[data-analytics='NavBarProfileDropDownAdministration']")
    //************Manage Challenges page******************************************
    let manageTabs = await tab.$$(".administration ul li a");
    
    await Promise.all([manageTabs[1].click(), tab.waitForNavigation({
        waitUntil: "networkidle2"
    })])
})()
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}
