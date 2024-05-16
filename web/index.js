const backendUrl = 'http://localhost:4567';
fetch(`${backendUrl}/hands`)
.then(response => response.json())
.then(data => {
    document.write("Received data from backend");
})
.catch(error => {
    console.error("Error in response");
})