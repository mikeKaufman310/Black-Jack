package main.java.com.backend;

import java.util.*;
import java.lang.*;
import spark.Spark;
import com.google.gson.*;

public class Game{
    public static void main(String[] argv){
        //System.out.println("Main");
        Spark.port(4567);
        Deck gameDeck = new Deck();
        Hand dealerHand = gameDeck.deal();
        Hand playerHand = gameDeck.deal();
        final Gson gson = new Gson();
        //send hand values to front end to display
        Spark.get("/hands", (req, res) -> {
            ApiResponse<Hand[]> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Initial Hands for Game");
            Hand[] hands = {dealerHand, playerHand};
            response.setData(hands);
            res.type("application/json");
            return new Gson().toJson(response);
        });
    }

}