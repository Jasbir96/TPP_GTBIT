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
    // *************************************New,Open,Save****************************************
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
                let cell = {
                    value: "",
                    formula: ""
                };
                row.push(cell);
            }
            db.push(row);
        }
        // clear whole grid
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
                $(rowkeCells[j]).html(db[i][j].value);
            }
        }
        console.log("File Opened");
        // Write onto grid
    })
    // ****************************Formula*******************************************
    // Update
    $("#grid .cell").on("blur", function () {
        let { rowId, colId } = getRC(this);
        db[rowId][colId].value = $(this).html();
        console.log(db);
    })
    $("#formula-input").on("blur", function () {
        // get formula
        let formula = $(this).val();
        // set  formula property of the cell
        let cellElemAdd = $("#address-input").val();
        let { colId, rowId } = getRcfromAdd(cellElemAdd);
        let cellObject = db[rowId][colId];
        cellObject.formula = formula;
        //  evaluate the formula
        let rVal = evaluate(formula);
        // update the cell's  ui
        updateCell(cellObject, rowId, colId, rVal);
    })
    function evaluate(formula) {
        // ( A1 + A2 )
        let formulaComponents = formula.split(" ");
        // [(,A1,+,A2,)]
        console.log(formula)
        for (let i = 0; i < formulaComponents.length; i++) {
            let CharCode = formulaComponents[i].charCodeAt(0);
            if (CharCode >= 65 && CharCode <= 90) {
                let { rowId, colId } = getRcfromAdd(formulaComponents[i]);
                let pValue = db[rowId][colId].value;
                formula = formula.replace(formulaComponents[i], pValue);
            }
        }
        console.log(formula);
        // ( 10 + 20 )
        let rVal = eval(formula);
        console.log(rVal);
        return rVal;
    }
    function updateCell(cellObject, rowId, colId, rVal) {

        cellObject.value = rVal;
        // change on ui also
        $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(rVal);
    }
    function getRcfromAdd(cellElemAdd) {
        let colId = Number(cellElemAdd.charCodeAt(0)) - 65;
        let rowId = Number(cellElemAdd.substring(1)) - 1;
        return { colId, rowId };
    }
    function getRC(element) {
        let rowId = $(element).attr("row-id");
        let colId = $(element).attr("col-id");
        return { rowId, colId };
    }
    function init() {
        $("#New").trigger("click");
    }
    init();
})