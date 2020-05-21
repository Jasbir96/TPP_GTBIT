let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId = process.argv[2];
let commentaryId = process.argv[3];
let url = `https://www.espncricinfo.com/series/${seriesId}/commentary/${commentaryId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`
// npm install request 
console.log("sending Request");
request(url, function (err, response, data) {
    console.log("Data Recieved");
    // console.log(response);clear
    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("index.html", data);
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
    console.log("########################")
    // give concatenated result of the text matching that selector
    // let text = $(".match-comment-long-text").text();
    // $().
    let AllCArr = 
    $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    // alternative => first 
    
    // let text = AllCArr.html();
    // 
       let text= $(AllCArr[0]).text();
    console.log(text);
    console.log("########################")
    // console.log(text);
}