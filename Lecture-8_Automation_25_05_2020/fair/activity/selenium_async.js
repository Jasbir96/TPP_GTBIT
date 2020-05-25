// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");
let credentialsFile = process.argv[2];
// build browser
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
// username,pwd
console.log("Before");
(async function () {
    try {
        let data = await fs.promises.readFile(credentialsFile, "utf-8");
        let credentials = JSON.parse(data);
        login = credentials.login;
        email = credentials.email;
        pwd = credentials.pwd;
        // go to login page
        let loginPWillBeOpenedP = driver.get(login);
        // set implicit 
        await loginPWillBeOpenedP;
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
        console.log("User loggedin");
        let profileTab = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        await profileTab.click();
        let adminBtn = await driver.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
    await adminBtn.click();
    } catch (err) {

    }
})();
console.log("After");