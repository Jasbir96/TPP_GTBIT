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
        args: ["--start-maximized"]
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
    await navigationHelper(tab, "a[data-analytics='NavBarProfileDropDownAdministration']")
    //************Manage Challenges page******************************************
    let manageTabs = await tab.$$(".administration ul li a");
    await Promise.all([manageTabs[1].click(), tab.waitForNavigation({
        waitUntil: "networkidle2"
    })])

    await handleSinglePage(tab, browser);
    console.log("All questions processed");
})()
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}
// serially every page 
async function handleSinglePage(tab, browser) {
    await tab.waitForSelector(".backbone.block-center");
    let qonPage = await tab.$$(".backbone.block-center");
    let cPageQsolvedp = [];
    for (let i = 0; i < qonPage.length; i++) {
        // qonPage[i].getAttribute("href");
        let href = await tab.evaluate(function (q) {
            return q.getAttribute("href");
        }, qonPage[i]);

        let chref = "https://www.hackerrank.com" + href;
        let newTab = await browser.newPage();
        //
        let cPageQwillBeSolvedP = solveOneQuestion(chref, newTab);
        cPageQsolvedp.push(cPageQwillBeSolvedP);
    }
    // 1 page all process
    await Promise.all(cPageQsolvedp);
    console.log("visited all questions of one page");
    // if next button is enabled=> next click
    let pList = await tab.$$(".pagination ul li");
    let nextBtn = pList[pList.length - 2];
    function getter(elem) {
        return elem.getAttribute("class");
    }
    let className = await tab.evaluate(getter, nextBtn);
    if (className === "disabled") {
        return;
    } else {
        await Promise.all([nextBtn.click(), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
        handleSinglePage(tab, browser);
    }
    // you have reached the last page
    // go to next page until reached the last page


}
// promise => resolve when a new tab is opened
async function solveOneQuestion(chref, newTab) {
    await newTab.goto(chref, { waitUntil: "networkidle0" });
    await newTab.waitForSelector("li[data-tab='moderators']");
    await navigationHelper(newTab, "li[data-tab='moderators']");
    await newTab.waitForSelector("#moderator", { visible: true });
    await newTab.type("#moderator", "vejohom272");
    // 
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector(".save-challenge.btn.btn-green")
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
}

