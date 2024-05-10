//package src;

public class Suit {
    public boolean heart;//1
    public boolean spade;//2
    public boolean club;//3
    public boolean diamond;//4
    public Suit(int suitChoice){
        if(suitChoice == 1){
            heart = true;
            spade = club = diamond = false;
        }else if(suitChoice == 2){
            spade = true;
            heart = club = diamond = false;
        }else if(suitChoice == 3){
            club = true;
            heart = spade = diamond = false;
        }else{
            diamond = true;
            heart = club = spade = false;
        }
    }
}