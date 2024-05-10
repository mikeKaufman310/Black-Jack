//package src;

import java.util.*;
public class Card {
    //name
    //suit
    //value
    public String name;
    public Suit suit;
    public int value;
    public boolean dealt;
    public Card(String name, Suit suit, int value){
        this.name = name;
        this.suit = suit;
        this.value = value;
        dealt = false;
    }
}