const fs = require('fs');
const readline = require('readline');

const targetYear = 2020;
const expenseArr = []

function findTwoNumbers(targetYear, yearList) {
    let year1;
    const year2 = yearList.find(year => {
        year1 = targetYear - year;
        return yearList.includes(year1);
    });

    return {year1, year2};
}
// this is upsetting... :(
function findYears(yearList, targerYear){
    let res;
    yearList.forEach(year1 => {
        yearList.forEach(year2 => {
            yearList.forEach(year3 => {
                if (year1 + year2 + year3 === targerYear){
                    res = {year1, year2, year3}
                }
            })
        })
    })
    return res
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
    const years = findTwoNumbers(targetYear, expenseArr);
    console.log(years, years.year1 * years.year2)
    const years2 = findYears(expenseArr, targetYear);
    console.log(years2, (years2.year1 * years2.year2 * years2.year3))
})


