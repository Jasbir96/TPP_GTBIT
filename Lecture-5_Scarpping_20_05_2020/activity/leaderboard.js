let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let count = 0;
let seriesId = process.argv[2];
let url = `https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results`;
let leaderboard = [];
// npm install request 
console.log("sending Request");
// series page request 
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
// filter => t20 /ODI matches
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
        if (test == true) {
            // console.log(matchType);
            // scorecard => href
            // request every page 
            // array => 1st element => attr,html 
            let link = $(AllCards[i]).find(".match-cta-container a[data-hover='Scorecard']").attr("href");
            // console.log(link);
            // request 
            let fullLink = `https://www.espncricinfo.com${link}`;

            // console.log(fullLink);
            count++;
            matchHandler(fullLink);
            // => finish 
        }
    }
    console.log("########################")
    // console.log(text);
}
// request => ODI and T20 Matches
function matchHandler(link) {
    request(link, function (err, response, data) {
        // console.log("Match Data Recieved");
        // console.log(response);clear
        if (err === null && response.statusCode === 200) {
            // console.log(`match${count} recieved`);
            fs.writeFileSync(`match${count}.html`, data);
            count--;
            handleEachMatch(data);
            if (count == 0) {
                // console.log("All match processed");
                console.table(leaderboard);
            }
            // console.log("Processing Data");
        } else if (response.statusCode === 404) {
            console.log("Page Not found");
        } else {
            console.log(err);
            console.log(response.statusCode)
        }
    })
}
// every page => batsmanName, runs,team, format
function handleEachMatch(data) {
    let $ = cheerio.load(data);
    let format = $(".match-page-wrapper .desc.text-truncate").text();

    if (format.includes("ODI")) {
        format = "ODI";
    } else {
        format = "T20I";
    }
    console.log(format);
    // 3 table => india inning ,nz inning , stats
    let inningsArr = $(".match-scorecard-table");
    let fti = inningsArr[0];
    let sti = inningsArr[1];
    // team name
    // 1st inning 
    let ftiName = $(fti).find(".header-title.label").text();
    let fInnigPlayers = $(fti).find(".table.batsman tbody tr");
    ftiName = ftiName.split("Innings")[0];
    // console.log(ftiName)
    for (let i = 0; i < fInnigPlayers.length; i++) {
        let isBatsman = $(fInnigPlayers[i]).find("td").hasClass("batsman-cell");
        // console.log(isBatsman);
        if (isBatsman == true) {
            let pName = $($(fInnigPlayers[i]).find("td")[0]).text();
            let runs = $($(fInnigPlayers[i]).find("td")[2]).text();
            // console.log(pName + " " + runs);
            createLeaderBoard(pName, format, runs, ftiName);
        }
    }
    // console.log("``````````````````");
    let stiName = $(sti).find(".header-title.label").text();
    stiName = stiName.split("Innings")[0];
    // console.log(stiName);
    let sInnigPlayers = $(sti).find(".table.batsman tbody tr");
    for (let i = 0; i < sInnigPlayers.length; i++) {
        let isBatsman = $(sInnigPlayers[i]).find("td").hasClass("batsman-cell");
        if (isBatsman == true) {
            let pName = $($(sInnigPlayers[i]).find("td")[0]).text();
            let runs = $($(sInnigPlayers[i]).find("td")[2]).text();
            // console.log(pName + " " + runs);
            createLeaderBoard(pName, format, runs, stiName);
        }
    }
    // console.log(sInnigPlayers.length);
    console.log("222222222222222222222222222222222222222");
    // console.log(format);
}
// object => name,runs,team,format
function createLeaderBoard(name, format, runs, team) {
    //create a leaderboard
    // VK=> 
    // check => leaderboard => playe exist => update
    runs=parseInt(runs);
    for (let i = 0; i < leaderboard.length; i++) {
        let player = leaderboard[i];
        if (player.Name === name && player.Team === team && player.Format === format) {
            //  update runs
            // return;
            player.Total += runs;
            return;
        }
    }
    // create new player
    let pObj = {
        Name: name,
        Format: format,
        Total: runs,
        Team: team
    }
    // add to leaderboard
    leaderboard.push(pObj);
    // create a new entry

}