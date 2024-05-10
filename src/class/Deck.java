//

import java.util.ArrayList;
import java.lang.*;

public class Deck{
    ArrayList<Card> deck = new ArrayList<>();
    public Deck(){
        //heart
        for(int i = 1; i < 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(1), i+1));
        }
        deck.add(new Card("Jack", new Suit(1), 10));
        deck.add(new Card("Queen", new Suit(1), 10));
        deck.add(new Card("King", new Suit(1), 10));
        deck.add(new Card("Ace", new Suit(1), 11));
        //spade
        for(int i = 1; i < 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(2), i+1));
        }
        deck.add(new Card("Jack", new Suit(2), 10));
        deck.add(new Card("Queen", new Suit(2), 10));
        deck.add(new Card("King", new Suit(2), 10));
        deck.add(new Card("Ace", new Suit(2), 11));
        //club
        for(int i = 1; i < 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(3), i+1));
        }
        deck.add(new Card("Jack", new Suit(3), 10));
        deck.add(new Card("Queen", new Suit(3), 10));
        deck.add(new Card("King", new Suit(3), 10));
        deck.add(new Card("Ace", new Suit(3), 11));
        //diamond
        for(int i = 1; i < 9; i++){
            deck.add(new Card(Integer.toString(i+1), new Suit(4), i+1));
        }
        deck.add(new Card("Jack", new Suit(4), 10));
        deck.add(new Card("Queen", new Suit(4), 10));
        deck.add(new Card("King", new Suit(4), 10));
        deck.add(new Card("Ace", new Suit(4), 11));
    }
    public Hand deal(){
        Hand hand = new Hand(this.deck.get(0), this.deck.get(1));
        this.deck.remove(0);
        this.deck.remove(1);
        return hand;
    }
    public void shuffle(){
        //random indexes
        //swap em in the deck
        //do that 52 times
    }
}