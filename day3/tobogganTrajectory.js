const fs = require('fs');
const readline = require('readline');


// if they reach index 31 go back to start
const TREE_MAP = []
const SLOPE_LIST = [
    { x: 3, y: 1 },
    { x: 1, y: 1},
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
]

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
    let partOneAnswer = traverseRow(SLOPE_LIST[0])
    console.log("Part 1", partOneAnswer)
    
    let allSlopeValues = SLOPE_LIST.map(slope => {
        return traverseRow(slope)
    })
    let partTwoAnswer = allSlopeValues.reduce((a, b)=> a * b, 1)
    console.log("Part 2", partTwoAnswer)
})

function traverseRow(slope){
    let columnIndex = 0;
    let treeCount = 0;
    
    for (i = 0; i < TREE_MAP.length; i++){
        let addingOne = false
         if (TREE_MAP[i][columnIndex] == "#"){
            addingOne = true
            treeCount++;
        }
        console.table({
            "Row (i)": i,
            "columnIndex": columnIndex,
            "value": TREE_MAP[i][columnIndex],
            "incrementing": addingOne,
            "total": treeCount
        })

        columnIndex += slope.x;
        if (columnIndex > 30) {
            let onesDigit = (columnIndex).toString().split("");
            onesDigit = onesDigit[onesDigit.length - 1];
            columnIndex =  parseInt(onesDigit) - 1;
            console.log("greater than 30 setting index to", columnIndex)
        }

        if (slope.y > 1){
            i += slope.y - 1
        }

    }

    return treeCount;
}