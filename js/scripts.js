'use strict';

fetch("https://api.chucknorris.io/jokes/random?category=dev")
.then(function (response) {
    console.log(response);
    return response.json();
})
.then(function(data) {
    updateBody(data.value);
})
.catch(function(error){
    console.error("ERROR:", error);
    return error;
});

function updateBody(quote) {
    const chuckSays = document.querySelector("#chuckSays");
    chuckSays.innerHTML = quote;
}
