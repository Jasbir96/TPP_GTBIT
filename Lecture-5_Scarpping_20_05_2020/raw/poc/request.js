// npm install request 
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187686/new-zealand-vs-india-2nd-test-india-in-new-zealand-2019-20";
console.log("Work start");
request(url, function (err, response, data) {
    console.log("Come back later");
    // console.log(response);clear

    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("index.html", data);
        parseHTML(data);
    } else if (response.statusCode === 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(response.statusCode)
    }
})
console.log("Doing other stuff");
function parseHTML(data) {
    // page => cheerio
    let $ = cheerio.load(data);
    // Page=> selector pass  => text => text  
    let text = $("title").text();
    console.log(text);
}