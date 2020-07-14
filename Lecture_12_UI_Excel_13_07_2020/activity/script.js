const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(function () {
    let db;
    $("#grid .cell").on("click", function () {
        let rowId = Number($(this).attr("row-id")) + 1;
        let colId = Number($(this).attr("col-id")) + 65;
        let address = String.fromCharCode(colId) + rowId;
        //    val to set value of an input
        $("#address-input").val(address);
    })
    // Create 
    $("#New").on("click", function () {
        // Create a 2d array representing grid
        db = [];
        let rows = $("#grid .row");
        for (let i = 0; i < rows.length; i++) {
            let row = []
            let rowkeCells = $(rows[i]).find(".cell");
            for (let j = 0; j < rowkeCells.length; j++) {
                // Open and save
                // Grid clear
                $(rowkeCells[j]).html("");
                let cell = "";
                row.push(cell);
            }
            db.push(row);
        }
        // clear whole grid
        // console.log(db);
    })

    // Update
    $("#grid .cell").on("blur", function () {
        let { rowId, colId } = getRC(this);
        db[rowId][colId] = $(this).html();
        console.log(db);
    })
    // Save
    $("#Save").on("click", async function () {
        // Open Dialog Box to save 
        // write your db into it
        let sdb = await dialog.showOpenDialog();
        let data = JSON.stringify(db);
        fs.writeFileSync(sdb.filePaths[0], data);
        console.log("File saved to db");
    })
    // Open
    $("#Open").on("click", async function () {
        // open Dialog Box accept input
        let sdb = await dialog.showOpenDialog();
        // Read File
        let bufferData = fs.readFileSync(sdb.filePaths[0]);
        db = JSON.parse(bufferData);
        //  Set Ui
        let rows = $("#grid .row");
        for (let i = 0; i < rows.length; i++) {
            let rowkeCells = $(rows[i]).find(".cell");
            for (let j = 0; j < rowkeCells.length; j++) {
                // Open and save
                // Grid clear
                $(rowkeCells[j]).html(db[i][j]);  
            }
        }
        console.log("File Opened");
        // Write onto grid
    })
    function getRC(element) {
        let rowId = $(element).attr("row-id");
        let colId = $(element).attr("col-id");
        return { rowId, colId };
    }
    // function init() {
    //     $("#New").trigger("click");
    // }
    // init();
})