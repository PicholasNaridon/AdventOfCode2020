const fs = require('fs');
const readline = require('readline');


// if they reach index 31 go back to start
const TREE_MAP = []
const SLOPE = { x: 3, y: 1 }

async function readInputFile(){
    const file = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        output: process.stdout,
        terminal: false
    });
    
    for await (const line of file) {
        TREE_MAP.push(line.split(""))
    }
}

readInputFile().then(function(){
   console.log(traverseRow())
})
[[1,2,3], [1,2,3]]


function traverseRow(){
    var rowIndex = 0;
    let columnIndex = 0;
    let treeCount = 0;

    TREE_MAP.forEach((treeRow) => {
        if (treeRow[columnIndex] == "#"){
            treeCount++;
        }
        if (columnIndex + 3 > 30){
            let onesDigit = (columnIndex + 3).toString().split("")[-1];
            let newColumnIndex = onesDigit - 1 // account for 0 index
            columnIndex = newColumnIndex
        }else {
            columnIndex += 3
        }
    })

    return treeCount;
}