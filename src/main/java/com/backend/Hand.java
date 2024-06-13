package main.java.com.backend;

import java.util.ArrayList;

/**
 * Class to model hand in black jack game for use in back end
 */
public class Hand{
    ArrayList<Card> hand;//list of cards to hold hand data

    /**
     * Constructor
     * @param one first card dealt to hand
     * @param two second card dealt to hand
     */
    public Hand(Card one, Card two){
        this.hand = new ArrayList<Card>();
        this.hand.add(one);
        this.hand.add(two);
    }

    /**
     * Method to get the initial value of a hand
     * @param first first card dealt to hand
     * @param second second card dealt to hand
     * @return integer value of initial value of hand
     */
    public int initialValue(Card first, Card second){
        return first.value + second.value;
    }

    /**
     * Function to add a new card to the hand
     * @param newCard card to be added to the hand
     */
    public void addToHand(Card newCard){
        this.hand.add(newCard);
    }

    /**
     * Function to get value of current iteration of the hand
     * @return integer value of the hand
     */
    public int handValue(){
        int value = 0;
        for(Card i: this.hand){
            value+=i.value;
        }
        for(Card i: this.hand){
            if(value > 21 && i.name.compareTo("Ace")==0){
                value-=i.value;
                value+=1;
            }
        }
        return value;
    }

    /**
     * Static function to get a new hand
     * @param deck deck object to deal the hand
     * @return Hand object in its initial state
     */
    public static Hand newHand(Deck deck){
        return deck.deal();
    }

    /**
     * Function to determine whether a hand has "busted"
     * @return boolean of whether hand has "busted" or not
     */
    public boolean bust(){
        if(this.handValue() > 21){
            return true;
        }
        return false;
    }
}