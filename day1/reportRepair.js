const fs = require('fs');
const readline = require('readline');

const targetYear = 2020;
const expenseArr = []

function findNumbers(targetYear, yearList) {
    let year1;
    const year2 = yearList.find(year => {
        year1 = targetYear - year;
        return yearList.includes(year1);
    });

    return {year1, year2};
}

async function readInputFile(){
    const file = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        output: process.stdout,
        terminal: false
    });
    
    for await (const line of file) {
        expenseArr.push(parseInt(line))
    }
}

readInputFile().then(function(){
    const years = findNumbers(targetYear, expenseArr);
    console.log(years, years.year1 * years.year2)
})


