package main.java.com.backend;

import java.util.*;
import java.lang.*;

public class Deck{
    ArrayList<Card> deck = new ArrayList<>();
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
    public Card dealHit(){
        Card card = this.deck.get(0);
        this.deck.remove(0);
        return card;
    }
    public Hand deal(){
        Hand hand = new Hand(this.deck.get(0), this.deck.get(1));
        this.deck.remove(0);
        this.deck.remove(0);
        return hand;
    }
    public void shuffle(){
        Random rand = new Random();
        for(int i = 0; i < 52; i++){
            int tempIndex = rand.nextInt(51);
            Card tempCard = this.deck.get(tempIndex);
            this.deck.set(tempIndex, this.deck.get(51-tempIndex));
            this.deck.set((51-tempIndex), tempCard);
        }
    }
}