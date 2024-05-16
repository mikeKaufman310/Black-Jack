const backendUrl = 'http://localhost:4567';
fetch(`${backendUrl}/hands`)
.then(response => response.json())
.then(data => {
    const firstName = data.data[0].hand[0].name;
    const firstValue = data.data[0].hand[0].value;
    const firstSuitClub = data.data[0].hand[0].suit.club;
    const firstSuitDiamond = data.data[0].hand[0].suit.diamond;
    const firstSuitHeart = data.data[0].hand[0].suit.heart;
    let suit = "";
    if(firstSuitClub){
        suit = "Club";
    }else if(firstSuitDiamond){
        suit = "Diamond";
    }else if(firstSuitHeart){
        suit = "Heart";
    }else{
        suit = "Spade";
    }
    document.write("Card: " + firstName + "<br>Suit: " + suit);
    console.log(data.data[0]);
})
.catch(error => {
    console.error("Error in response");
})