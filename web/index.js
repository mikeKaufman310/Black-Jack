const backendUrl = 'http://localhost:4567';
let numDealerCards = 0;
let numPlayerCards = 0;

console.log("Waiting for game to start");
function gameStart(){
    console.log("Starting game");
    fetch(`${backendUrl}/hands`)
    .then(response => response.json())
    .then(data => {
        numDealerCards = 2;
        numPlayerCards = 2;
        console.log("Dealing initial hands");
        displayHands(data, numDealerCards, numPlayerCards);
    })  
    .catch(error => {
        console.error("Error in response");
    });
}

function playerHit(){
    //player hit code
    //if bust end game
}

function dealerTurn(){
    //dealer's turn code
    endGame();
}

function doubleDown(){
    //double down code
    dealerTurn();
}

function endGame(){
    //end game code
    //calculate scores and display output
}


function displayHands(data, numDealerCards, numPlayerCards){
    let dealerCards = document.getElementById("dealerCards");
    let dealerCardsStr = "";
    let playerCards = document.getElementById("playerCards");
    let playerCardsStr = "";
    for(let i = 0; i < numDealerCards; i++){
        dealerCardsStr += "Card " + (i+1) + ": " + data.data[0].hand[i].name + " of " + suitParse(data.data[0].hand[i].suit) + "<br>";
    }
    for(let i = 0; i < numPlayerCards; i++){
        playerCardsStr += "Card " + (i+1) + ": " + data.data[1].hand[i].name + " of " + suitParse(data.data[1].hand[i].suit) + "<br>";
    }
    dealerCards.innerHTML = dealerCardsStr;
    playerCards.innerHTML = playerCardsStr;
}

function suitParse(suit){
    let res = "";
    if(suit.club){
        res = "Club";
    }else if(suit.diamond){
        res = "Diamond";
    }else if(suit.heart){
        res = "Heart";
    }else{
        res = "Spade";
    }
    return res;
}

function initiateStart(bool){
    bool = true;
}