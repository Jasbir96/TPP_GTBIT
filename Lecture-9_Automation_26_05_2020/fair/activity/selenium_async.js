// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");
let credentialsFile = process.argv[2];
let questionsFile = process.argv[3];
// build browser
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
// username,pwd
console.log("Before");
(async function () {
    try {

        // ***************************************Login Page***************************
        await loginHelper();
        console.log("User loggedin");
        let profileTab = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        await profileTab.click();
        let adminBtn = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
        await adminBtn.click();
        //************Manage Challenges page******************************************
        await waitForLoader();
        let manageTabs = await driver.findElements(swd.By.css(".administration ul li a"));
        await manageTabs[1].click();
        let challengePageLink = await driver.getCurrentUrl();
        // console.log(challengePageLink);
        // get data
        let challenges = require(questionsFile);
        // loop => serially => create challenge
        for (let i = 0; i < challenges.length; i++) {
            await createChallenge(challenges[i], challengePageLink);
            await driver.get(challengePageLink);
        }

    } catch (err) {
        console.log(err);
    }
})();
console.log("After");

async function loginHelper() {
    await driver.manage().window().maximize();
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login;
    email = credentials.email;
    pwd = credentials.pwd;
    // go to login page
    let loginPWillBeOpenedP = driver.get(login);
    // set implicit 
    await loginPWillBeOpenedP;
    // findelement 
    await driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000
    })
    let emailBox = await driver.findElement(swd.By.css("#input-1"));
    await emailBox.sendKeys(email);
    let pBox = await driver.findElement(swd.By.css("#input-2"));
    await pBox.sendKeys(pwd);
    let loginBtn = await driver.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
    await loginBtn.click();

}

async function createChallenge(challenge) {
    try {
        let createChallengeBtn = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
        await createChallengeBtn.click();
        console.log(1)
        let chBox = await driver.findElement(swd.By.css("#name"));
        let DescBox = await driver.findElement(swd.By.css("#preview"));
        let psBox = await driver.findElement(swd.By.css("#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
        let ifBox = await driver.findElement(swd.By.css("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
        let cnBox = await driver.findElement(swd.By.css("#constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
        let ofBox = await driver.findElement(swd.By.css("#output_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
        let tags = await driver.findElement(swd.By.css(".tagsinput input"))

        // let cSelector = ".CodeMirror.cm-s-default.CodeMirror-wrap textarea";
        // let selectors = ["#name", "#preview",
        //     `#problem_statement-container ${cSelector}`, `#input_format-container ${cSelector}`,
        //     `#constraints-container ${cSelector}`, `#output_format-container ${cSelector}`, ".tagsinput input"];
        // let elementsP = selectors.map(function (s) {
        //     return driver.findElement(swd.By.css(s));
        // })
        // let eArr = await Promise.all(elementsP);
        
        await chBox.sendKeys(challenge["Challenge Name"]);
        await DescBox.sendKeys(challenge["Description"]);
        // await (await driver).execute
        await sendData("#problem_statement-container", psBox, challenge["Problem Statement"]);
        await sendData("#input_format-container", ifBox, challenge["Input Format"]);
        await sendData("#constraints-container", cnBox, challenge["Constraints"]);
        await sendData("#output_format-container", ofBox, challenge["Output Format"]);
        await tags.sendKeys(challenge["Tags"]);
        await tags.sendKeys(swd.Key.ENTER);
        let submitBtn = await driver.findElement(swd.By.css("button.save-challenge.btn.btn-green"));
        await submitBtn.click();
        // Page DOWN
        // let ps = await driver.findElement(swd.By.css("label[for='problem_statement']"));
        // await ps.click();
        // await driver.actions().sendKeys(swd.Key.PAGE_DOWN).perform();
        // driver.actions().mouseDown().perform();
        // let toclick = await driver.findElement(swd.By.css(".CodeMirror-scroll"));
        // await toclick.click();
        // console.log(2);
        // await driver.actions().sendKeys(challenge["Problem Statement"]).perform();
    } catch (err) {
        console.log(err)
    }
}
async function sendData(parentId, element, data) {
    // Selenium => browser =>? JS Execute
    await driver.executeScript(
        `document.querySelector('${parentId} .CodeMirror.cm-s-default.CodeMirror-wrap div').style.height='10px'`);
    await element.sendKeys(data);
}
async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    // explicit wait 
    await driver.wait(swd.until.elementIsNotVisible(loader));
}