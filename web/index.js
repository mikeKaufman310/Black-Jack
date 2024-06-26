const backendUrl = 'http://localhost:4567';
let numDealerCards = 0;
let numPlayerCards = 0;


console.log("Waiting for game to start");

/**
 * Function tto initiate beginning of game (Deals both hands and checks for black jack)
 */
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
        let playerHandValue = 0;
        let dealerHandValue = 0;
        fetch(`${backendUrl}/handValueD`)
        .then(response => response.json())
        .then(data => {
            dealerHandValue = data.data;
            if(dealerHandValue == 21){
                endGame(false, false, true);
            }
            fetch(`${backendUrl}/handValueP`)
            .then(response => response.json())
            .then(data => {
                playerHandValue = data.data;
                if(playerHandValue == 21){
                    endGame(false, true, false);
                }
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

/**
 * Function to communicate to backend that the player would like to add a card to their hand
 * This function handles tthe "hit" implications that follow response from backend
 */
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

/**
 * Function to check if the dealer should continue to play their turn
 */
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

/**
 * Function to communicate with backend when dealing with dealer turn play logic
 * This function handles implications of dealer play after responses from backend
 */
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

/**
 * UNIMPLEMENTED
 * Function for player to double down their hand 
 */
function doubleDown(){
    //double down code
    dealerTurn();
}

/**
 * Function to deal with the frontend reaction to end of game
 * @param {*} bust boolean of whether the player "busted"
 * @param {*} blackjack boolean of whether the player drew a black jack hand
 * @param {*} dealerWin boolean if the dealer won during their turn
 * Note: after completion of this function, this function signals to backend that it should shut down
 */
function endGame(bust, blackjack, dealerWin){
    console.log("Game over");
    //end game code
    //calculate scores and display output
    //make sure to terminate game in backend server
    let winnerBox = document.getElementById("winnerBox");
    if(blackjack){
        console.log("Player Wins")
        winnerBox.innerHTML = "You Win by Blackjack!!!";
        fetch(`${backendUrl}/restart`)
        .then(response => response.json())
        .then(data => {
            console.log("Restarting server");
        })
        .catch(error => {
            console.error("Error in response");
        });
    }
    if(bust||dealerWin){//dealer wins
        console.log("Dealer Wins");
        if(bust){
            winnerBox.innerHTML = "Dealer Wins by Bust!!!";
        }else{
            winnerBox.innerHTML = "Dealer Wins by Blackjack!!!";
        }
        fetch(`${backendUrl}/restart`)
        .then(response => response.json())
        .then(data => {
            console.log("Restarting server");
        })
        .catch(error => {
            console.error("Error in response");
        });
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
                if((playerScore < dealerScore) && (dealerScore <= 21)){
                    console.log("Dealer wins")
                    winnerBox.innerHTML = "Dealer wins!!!";
                }else if(playerScore == dealerScore){
                    console.log("Push");
                    winnerBox.innerHTML = "Push";
                }else{
                    console.log("Player wins");
                    winnerBox.innerHTML = "You win!!!";
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

/**
 * Function to display the current value of both players hands
 * @param {*} data data from ajax passed to the function for display usage
 * @param {*} numDealerCards current number of cards in dealers hand
 * @param {*} numPlayerCards current number of cards in players hand
 */
function displayValue(data, numDealerCards, numPlayerCards){
    let dealerValueElement = document.getElementById("dealerValue");
    let playerValueElement = document.getElementById("playerValue");
    let playerHandValue = 0;
    let dealerHandValue = 0;
    fetch(`${backendUrl}/handValueD`)
    .then(response => response.json())
    .then(data => {
        dealerHandValue = data.data;
        dealerValueElement.innerHTML = "Total: " + dealerHandValue;
        fetch(`${backendUrl}/handValueP`)
        .then(response => response.json())
        .then(data => {
            playerHandValue = data.data;
            playerValueElement.innerHTML = "Total: " + playerHandValue;
        })
        .catch(error => {
            console.error("Error in response");
        });
    })
    .catch(error => {
        console.error("Error in response");
    });
}

/**
 * Function to display individual cards of player hand
 * @param {*} data data from ajax to be used for the display
 * @param {*} numDealerCards current number of cards in dealer hand
 * @param {*} numPlayerCards current number of cards in players hand
 */
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

/**
 * Function to parse what suit a card based on its suit value received in ajax responsee
 * @param {*} suit data field from ajax response
 * @returns string of correct suit to use for card display
 */
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

/**
 * Function to access differently scoped boolean data and change its value to true
 * @param {*} bool Boolean data to mutate
 */
function initiateStart(bool){
    bool = true;
}