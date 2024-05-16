build:
	mvn clean package

run:
	java -cp target/backend-1.0-SNAPSHOT.jar main.java.com.backend.Game

clean:
	mvn clean