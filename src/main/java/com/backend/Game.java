package main.java.com.backend;

import java.util.*;

import javax.xml.crypto.Data;

import java.lang.*;
import spark.Spark;
import com.google.gson.*;

/**
 * Class to hold Apache Spark Endpoints for backend to communicate game logic
 */
public class Game{

    /**
     * Main method containing rest api endpoints
     * @param argv command line arguments (unused)
     */
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

        //player adds card to their hand
        Spark.get("/playerHit", (req, res) -> {
            ApiResponse<Hand[]> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Player adds a card to hand");
            playerHand.addToHand(gameDeck.dealHit());
            Hand[] hands = {dealerHand, playerHand};
            response.setData(hands);
            res.type("application/json");
            return new Gson().toJson(response);
        });

        //dealer adds card to their hand
        Spark.get("/dealerHit", (req, res) -> {
            ApiResponse<Hand[]> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Player adds a card to hand");
            dealerHand.addToHand(gameDeck.dealHit());
            Hand[] hands = {dealerHand, playerHand};
            response.setData(hands);
            res.type("application/json");
            return new Gson().toJson(response);
        });

        //endpoint to get the hand value of the player
        Spark.get("/handValueP", (req, res) -> {
            res.type("application/json");
            ApiResponse<Integer> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Hand value");
            response.setData(playerHand.handValue());
            return new Gson().toJson(response);
        });

        //endpoint to get the hand value of the dealer
        Spark.get("/handValueD", (req, res) -> {
            res.type("application/json");
            ApiResponse<Integer> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Hand value");
            response.setData(dealerHand.handValue());
            return new Gson().toJson(response);
        });

        //endpoint to shutdown or restart backend server
        Spark.get("/restart", (req, res) -> {
            res.type("application/json");
            ApiResponse<Boolean> response = new ApiResponse<>();
            response.setSuccess(true);
            response.setMessage("Hand value");
            response.setData(true);
            System.exit(0);//this is temproary until I can figure out how to get new hands
            return new Gson().toJson(response);
        });
    }

}