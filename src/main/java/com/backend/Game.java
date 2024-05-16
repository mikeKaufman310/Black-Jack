package main.java.com.backend;

import java.util.*;
import java.lang.*;
import spark.Spark;
import com.google.gson.*;

public class Game{
    public static void main(String[] argv){
        System.out.println("Main");
        Deck gameDeck = new Deck();
        Hand dealerHand = gameDeck.deal();
        Hand playerHand = gameDeck.deal();
        final Gson gson = new Gson();
        //send hand values to front end to display
        
    }
}