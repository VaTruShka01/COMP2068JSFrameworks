const { Console } = require('console');
var prompt = require('prompt');


async function getUsersChoice() {

    const schema = {
        properties: {
            choice: {
                pattern: /^[rps]$/,
                message: 'Choice is r, p or s!!!',
                required: true 
            }
        }
    };
    
    prompt.start();
    

    
    console.log("Choose Rock - r, Paper - p, Scissors - s")
    
    const userResult = await prompt.get(schema);

    return userResult.choice;

}


function getComputerChoice(){
    let result = Math.random();

    switch (true){
        case (result >= 0.00 && result <0.34): 
            return "p";
        case (result >= 0.34 && result < 0.67):
            return "s";
        default:
            return "r";
    }

    
}

async function startGame() {

    let userChoice = await getUsersChoice();
    console.log(`Your choice is ${userChoice}`);

    let computerChoice = getComputerChoice();
    console.log(`Computer chose: ${computerChoice}`);

    switch (true) {
        case (userChoice === computerChoice): 
            console.log("That's a TIE!!!");
            break;
        case (
        (userChoice === "r" && computerChoice === "s") || 
        (userChoice === "p" && computerChoice === "r") ||
        (userChoice ==="s" && computerChoice === "p")
        ):
            console.log("It's a WIN !!!");
            break;
        default: console.log("It's a LOOSE !!!"); 
        break;
    }
}

startGame();







