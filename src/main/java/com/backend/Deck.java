package main.java.com.backend;

import java.util.*;
import java.lang.*;

/**
 * Class to model a deck of cards in game backend
 */
public class Deck{
    ArrayList<Card> deck = new ArrayList<>();//data structure to hold card data for deck object to use

    /**
     * Constructor
     */
    public Deck(){
        //heart
        for(int i = 1; i <= 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(1), i+1));
        }
        deck.add(new Card("Jack", new Suit(1), 10));
        deck.add(new Card("Queen", new Suit(1), 10));
        deck.add(new Card("King", new Suit(1), 10));
        deck.add(new Card("Ace", new Suit(1), 11));
        //spade
        for(int i = 1; i <= 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(2), i+1));
        }
        deck.add(new Card("Jack", new Suit(2), 10));
        deck.add(new Card("Queen", new Suit(2), 10));
        deck.add(new Card("King", new Suit(2), 10));
        deck.add(new Card("Ace", new Suit(2), 11));
        //club
        for(int i = 1; i <= 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(3), i+1));
        }
        deck.add(new Card("Jack", new Suit(3), 10));
        deck.add(new Card("Queen", new Suit(3), 10));
        deck.add(new Card("King", new Suit(3), 10));
        deck.add(new Card("Ace", new Suit(3), 11));
        //diamond
        for(int i = 1; i <= 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(4), i+1));
        }
        deck.add(new Card("Jack", new Suit(4), 10));
        deck.add(new Card("Queen", new Suit(4), 10));
        deck.add(new Card("King", new Suit(4), 10));
        deck.add(new Card("Ace", new Suit(4), 11));
        shuffle();
    }

    /**
     * Function to simulate drawing a card of the top of the deck
     * @return Card object on top of the deck
     */
    public Card dealHit(){
        Card card = this.deck.get(0);
        this.deck.remove(0);
        return card;
    }

    /**
     * Function to deal an initial hand in the game of black jack
     * @return Black Jack "Hand" object
     */
    public Hand deal(){
        Hand hand = new Hand(this.deck.get(0), this.deck.get(1));
        this.deck.remove(0);
        this.deck.remove(0);
        return hand;
    }

    /**
     * Function to shuffle card objects indices in deck for pseudo randomness
     */
    public void shuffle(){
        Random rand = new Random();
        for(int i = 0; i < 52; i++){
            int tempIndex1 = rand.nextInt(51);
            int tempIndex2 = rand.nextInt(51);
            Card tempCard = this.deck.get(tempIndex1);
            this.deck.set(tempIndex1, this.deck.get(tempIndex2));
            this.deck.set(tempIndex2, tempCard);
        }
    }
}