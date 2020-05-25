// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");
let credentialsFile = process.argv[2];
// build browser
let bldr = new swd.Builder();
let login, pwd, email, h3Array, highArr, gCode, gTextArea, gtBox, gQurl;
// represents single tab 
let driver = bldr.forBrowser("chrome").build();
// username,pwd
let fileWillBeReadPromise = fs.promises.readFile(credentialsFile, "utf-8");
// credentials.json
// {
//     "email":"lafibex383@aprimail.com",
//     "pwd":"yourpassword",
//     "login":"https://www.hackerrank.com/auth/login"
// }
// read credentials
fileWillBeReadPromise
    // go to login page
    .then(function (data) {
        let credentials = JSON.parse(data);
        login = credentials.login;
        email = credentials.email;
        pwd = credentials.pwd;
        let loginPWillBeOpenedP = driver.get(login);
        // login page open wait 
        return loginPWillBeOpenedP;
    }).then(function () {
        let waitForEveryonePromise = driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 10000
        })
        return waitForEveryonePromise;
    })
    .then(function () {
        // select element 
        let emailBoxWillBeSelectedPromise = driver.findElement(swd.By.css("#input-1"));
        return emailBoxWillBeSelectedPromise;
    }).then(function (emailBox) {
        let emailWillBeEnteredPromise = emailBox.sendKeys(email);
        return emailWillBeEnteredPromise;
    }).then(function () {
        let pBoxWillBefoundP = driver.findElement(swd.By.css("#input-2"));
        return pBoxWillBefoundP;
    }).then(function (pBox) {
        let pWillBeSendP = pBox.sendKeys(pwd);
        return pWillBeSendP;
    }).then(function () {
        let loginBtnWillBeClickedPromise = navigatorfn("button[data-analytics='LoginPassword']")
        return loginBtnWillBeClickedPromise;
    }).then(function () {
        let ipBtnWillBeClickedPromise = navigatorfn("#base-card-1-link")
        return ipBtnWillBeClickedPromise;
    }).then(function () {
        let wpBtnWillBeCLickedPromise = navigatorfn("a[data-attr1='warmup']")
        return wpBtnWillBeCLickedPromise;
    })
// .then(function () {
//     let qpUrlP = driver.getCurrentUrl();

//     return qpUrlP;
// })
.
then(function () {
    // how to resolve (n)promises in series
    // get the list of questions 
    // let qWillBesolvePromise = questionSolver(qpurl);
    // return qWillBesolvePromise;
    let qListP = driver.findElements(swd.By.css("a.challenge-list-item"));
    return qListP;
}).then(function (qList) {
    let hrefArr = [];
    for (let i = 0; i < qList.length; i++) {
        let qLinkP = qList[i].getAttribute("href");
        hrefArr.push(qLinkP);
    }
    return Promise.all(hrefArr);
}).then(function (cLinkArr) {
    // serially question submit
    let thenp = questionSolver(cLinkArr[0])
    for (let i = 1; i < cLinkArr.length; i++) {
        thenp = thenp.then(function () {
            console.log("Question number " + i + "solved");
            return questionSolver(cLinkArr[i]);
        })
    }
    return thenp;
})
    .catch(function (err) {
        console.log(err);
    })
// Promise creation=> return 
// resolve
function navigatorfn(selector) {
    // resolve => element select ,click 
    return new Promise(function (resolve, reject) {
        let waitForSelector = driver.findElement(swd.By.css(selector));
        waitForSelector
            .then(function (element) {
                let elementWillBeClickedPromise = element.click();
                return elementWillBeClickedPromise;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}
// submit email,
// submit password
// login click
// {
//     "pwd":
//     "email":
//     "link"
// }
function questionSolver(questionLink) {
    return new Promise(function (resolve, reject) {
        let goToQUrlP = driver.get(questionLink);
        goToQUrlP
            .then(function () {
                let goToEditorial = navigatorfn("a[data-attr2='Editorial']");
                return goToEditorial;
            }).then(function () {
                let clickOnLockP = navigatorfn("button.ui-btn.ui-btn-normal.ui-btn-primary");
                return clickOnLockP;
            }).catch(function (err) {
                if (err.message.includes('no such element: Unable to locate element: {"method":"css selector","selector":".ui-btn.ui-btn-normal.ui-btn-primary"}')) {
                    console.log("Lock element not found");
                }
            })
            // .then(function () {
            //     let cAreaWillBeSelectedP = driver.findElement(swd.By.css(".challenge-editorial-block.editorial-setter-code .editorial-code-box .hackdown-content"));
            //     return cAreaWillBeSelectedP;
            // })
            // Juggad
            .then(function () {
                let AllH3Promise = driver.findElements(swd.By.css("h3"));
                let highP = driver.findElements(swd.By.css(".highlight"));
                // All=> array promise=> promise=> all promises of that array get resolved
                let combinedP = Promise.all([AllH3Promise, highP]);
                return combinedP;
            }).then(function (elementsArr) {
                h3Array = elementsArr[0];
                highArr = elementsArr[1];

                let h3tPArr = [];
                for (let i = 0; i < h3Array.length; i++) {
                    let tPromise = h3Array[i].getText();
                    h3tPArr.push(tPromise);
                }
                // get text from every h3 and then get the index of the c+++ code 
                // get code from highArr
                return Promise.all(h3tPArr);

            }).then(function (h3TextArr) {
                // console.log(h3Text);
                let codeP;
                for (let i = 0; i < h3TextArr.length; i++) {
                    if (h3TextArr[i].includes("C++")) {
                        codeP = highArr[i].getText();
                    }
                }
                return codeP;
            }).then(function (code) {
                // console.log(code);
                gCode = code;
                let goToProblemPageP = navigatorfn("a[data-attr2='Problem']")
                return goToProblemPageP;
            }).then(function () {
                let inputBoxClickedP = navigatorfn(".custom-input-checkbox");
                return inputBoxClickedP;
            }).then(function () {
                let textAreaP = driver.findElement(swd.By.css(".custominput"));
                return textAreaP;
            }).then(function (textArea) {
                gTextArea = textArea;
                let codeWillBeSubmittedP = textArea.sendKeys(gCode);
                return codeWillBeSubmittedP;
            }).then(function () {
                let sendCTRLaP = gTextArea.sendKeys(swd.Key.CONTROL + "a");
                return sendCTRLaP;
            }).then(function () {
                let sendCTRLcP = gTextArea.sendKeys(swd.Key.CONTROL + "x");
                return sendCTRLcP
            })
            .then(function () {
                let tBoxWillSelectedP = driver.findElement(swd.By.css(".inputarea"));
                return tBoxWillSelectedP;
            }).then(function (tBox) {
                // 
                gtBox = tBox;
                let sendCTRLaP = tBox.sendKeys(swd.Key.CONTROL + "a");
                return sendCTRLaP;
            }).then(function () {
                let sendCTRLvP = gtBox.sendKeys(swd.Key.CONTROL + "v");
                return sendCTRLvP;
            }).then(function () {
                let submitCodeP = navigatorfn(".hr-monaco-submit");
                return submitCodeP
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err.message);
                reject();
            })
    })
}
