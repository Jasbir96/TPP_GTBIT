let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId = process.argv[2];
let scorecardId = process.argv[3];
let url = `https://www.espncricinfo.com/series/${seriesId}/scorecard/${scorecardId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`;
// npm install request 
console.log("sending Request");
request(url, function (err, response, data) {
    console.log("Data Recieved");
    // console.log(response);clear
    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("scorecard.html", data);
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
    // page selection
    let bowlersArr = $(".table.bowler tbody tr");
    // console.log(bowlersArr.length);
    let maxWicketTaker = "";
    let maxWickets = 0;
    for (let i = 0; i < bowlersArr.length; i++) {
        // name
        // tr => td => 9
        // $(selector)=> represent => page
        // $=> elements search => find
        // 
        let name = $($(bowlersArr[i]).find("td")[0]).text();
        let wickets = $($(bowlersArr[i]).find("td")[4]).text();

        // console.log(name + " " + wickets);
        // wickets
        if (maxWickets < wickets) {
            maxWickets = wickets;
            maxWicketTaker = name;
        }
    }
    console.log(maxWicketTaker + " " + maxWickets)
    // fs.writeFileSync("bowlers.html",bowlers);
    console.log("########################")
    // console.log(text);
}