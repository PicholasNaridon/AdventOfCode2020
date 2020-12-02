const fs = require('fs');
const readline = require('readline');

const PASSWORD_DATA = []

async function readInputFile(){
    const file = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        output: process.stdout,
        terminal: false
    });
    
    for await (const line of file) {
        let lineContents = line.split(" ");
        let passwordObject = {
            minCount: lineContents[0].split("-")[0],
            maxCount: lineContents[0].split("-")[1],
            targetLetter: lineContents[1][0],
            passwordString: lineContents[2]
        }

        PASSWORD_DATA.push(passwordObject)
    }
}

// Part 1
function countOccurrences(password){
    return password.passwordString.split("").filter((value) => {
        return value == password.targetLetter;
    }).length
}

// Part 2
function checkTargetPositions(passwords){
    return passwords.filter(password => {
        let count = 0;
        if (password.passwordString[password.minCount - 1] == password.targetLetter){
            count++;
        }
        if (password.passwordString[password.maxCount - 1] == password.targetLetter){
            count++;
        }
        return count == 1 ? true : false; 
    }).length
}

readInputFile().then(function(){
    let result1 = 0;
    PASSWORD_DATA.forEach(password => {
        let occurrenceCount = countOccurrences(password);
        if (occurrenceCount >= password.minCount && occurrenceCount <= password.maxCount){
            result1 ++;
        }
    })
    console.log("Part one valid Passwords:", result1);

    let result2 = checkTargetPositions(PASSWORD_DATA);
    console.log("Part two valid Passwords:", result2);

})