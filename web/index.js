const backendUrl = 'http://localhost:4567';
let numDealerCards = 0;
let numPlayerCards = 0;


console.log("Waiting for game to start");
function gameStart(){
    console.log("Starting game");
    const playButton = document.getElementById("playButton");
    playButton.style.display = "none";
    fetch(`${backendUrl}/hands`)
    .then(response => response.json())
    .then(data => {
        numDealerCards = 2;
        numPlayerCards = 2;
        console.log("Dealing initial hands");
        displayHands(data, numDealerCards, numPlayerCards);
        displayValue(data, numDealerCards, numPlayerCards);
    })  
    .catch(error => {
        console.error("Error in response");
    });
}

function playerHit(){
    console.log("Player hits");
    fetch(`${backendUrl}/playerHit`)
    .then(response => response.json())
    .then(data => {
        numPlayerCards++;
        displayHands(data, numDealerCards, numPlayerCards);
        displayValue(data, numDealerCards, numPlayerCards);
    })
    .catch(error => {
        console.error("Error in response");
    });
    //if bust end game
    let playerHandValue = 0;
    fetch(`${backendUrl}/handValueP`)
    .then(response => response.json())
    .then(data => {
        playerHandValue = data.data;
        if(playerHandValue > 21){
            endGame(true, false, true);
        }
    })
    .catch(error => {
        console.error("Error in response");
    });
}

function dealerHandCheck(){
    let dealerHandValue = 0;
    fetch(`${backendUrl}/handValueD`)
    .then(response => response.json())
    .then(data => {
        dealerHandValue = data.data;
        if(dealerHandValue > 16 ){
            endGame(false, false, false);
        }
    })
    .catch(error => {
        console.error("Error in response");
    });
}

function dealerTurn(){
    console.log("Dealers turn");
    let dealerHandValue = 0;
    fetch(`${backendUrl}/handValueD`)
    .then(response => response.json())
    .then(data => {
        dealerHandValue = data.data;
        if(dealerHandValue > 16 ){
            endGame(false, false, false);
            return;
        }
        console.log("Dealer hits");
        fetch(`${backendUrl}/dealerHit`)
        .then(response => response.json())
        .then(data => {
            numDealerCards++;
            displayHands(data, numDealerCards, numPlayerCards);
            displayValue(data, numDealerCards, numPlayerCards);
            dealerTurn();
        })
        .catch(error => {
            console.error("Error in response");
        });
    })
    .catch(error => {
        console.error("Error in response");
    });
    
}

function doubleDown(){
    //double down code
    dealerTurn();
}

function endGame(bust, blackjack, dealerWin){
    console.log("Game over");
    //end game code
    //calculate scores and display output
    //make sure to terminate game in backend server
    if(bust||dealerWin){//dealer wins
        document.write("Dealer Wins!!!");
    }else{
        let dealerScore = 0;
        let playerScore = 0;
        fetch(`${backendUrl}/handValueD`)
        .then(response => response.json())
        .then(data => {
            dealerScore = data.data;
            fetch(`${backendUrl}/handValueP`)
            .then(response => response.json())
            .then(data => {
                playerScore = data.data;
                let winnerBox = document.getElementById("winnerBox");
                if(playerScore > dealerScore){
                    console.log("Player wins");
                    winnerBox.innerHTML = "You win!!!";
                }else if(playerScore == dealerScore){
                    console.log("Push");
                    winnerBox.innerHTML = "Push";
                }else{
                    console.log("Dealer wins")
                    winnerBox.innerHTML = "Dealer wins!!!";
                }
                fetch(`${backendUrl}/restart`)
                .then(response => response.json())
                .then(data => {
                    console.log("Restarting server");
                })
                .catch(error => {
                    console.error("Error in response");
                });
            })
            .catch(error => {
                console.error("Error in response");
            });
        })
        .catch(error => {
            console.error("Error in response");
        });
    }
}

function displayValue(data, numDealerCards, numPlayerCards){
    let dealerValueElement = document.getElementById("dealerValue");
    let playerValueElement = document.getElementById("playerValue");
    let dealerValue = 0;
    let playerValue = 0;
    for(let i = 0; i < numDealerCards; i++){
        dealerValue+=data.data[0].hand[i].value;
    }
    for(let i = 0; i < numPlayerCards; i++){
        playerValue+=data.data[1].hand[i].value;
    }
    dealerValueElement.innerHTML = "Total: " + dealerValue;
    playerValueElement.innerHTML = "Total: " + playerValue;
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