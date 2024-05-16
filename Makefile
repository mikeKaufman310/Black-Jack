build:
	mvn clean package

run:
	java -jar target/backend-1.0-SNAPSHOT.jar

clean:
	mvn clean