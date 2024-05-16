package main.java.com.backend;

import java.util.ArrayList;

public class Hand{
    ArrayList<Card> hand;
    public Hand(Card one, Card two){
        this.hand = new ArrayList<Card>();
        this.hand.add(one);
        this.hand.add(two);
    }
    public int initialValue(Card first, Card second){
        return first.value + second.value;
    }
    public void addToHand(Card newCard){
        this.hand.add(newCard);
    }
    public int handValue(){
        int value = 0;
        for(Card i: this.hand){
            value+=i.value;
            if(value > 21 && i.name.compareTo("Ace")==0){
                value-=i.value;
                value+=1;
            }
        }
        return value;
    }
    public static Hand newHand(Deck deck){
        return deck.deal();
    }
    public boolean bust(){
        if(this.handValue() > 21){
            return true;
        }
        return false;
    }
}