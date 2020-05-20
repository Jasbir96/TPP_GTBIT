let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId = process.argv[2];
let url = `https://www.espncricinfo.com/scores/series/${seriesId}/india-in-new-zealand-2019-20?view=results`;
// npm install request 
console.log("sending Request");
request(url, function (err, response, data) {
    console.log("Data Recieved");
    // console.log(response);clear
    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("series.html", data);
        parseHTML(data);
        console.log("Processing Data");
    } else if (response.statusCode === 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(response.statusCode)
    }
})
function parseHTML(data) {
    // page => cheerio
    // load => html 
    let $ = cheerio.load(data);
    // Page=> selector pass  => text => text
    console.log("########################");
    let AllCards = $(".match-score-block");
    // console.log(AllCards.length);
    for (let i = 0; i < AllCards.length; i++) {
        let matchType = $(AllCards[i]).find("p.small.match-description").text();
        let test = matchType.includes("ODI") || matchType.includes("T20I");
        if(test==true){
            console.log(matchType);
        }
    }
    console.log("########################")
    // console.log(text);
}