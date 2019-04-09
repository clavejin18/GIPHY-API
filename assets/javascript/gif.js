$(document).ready(function() {
// array for gifs. New gifs will be pushed to this array
var gifTopics = ["Ants","Lions", "Pandas", "Red Pandas", "Snakes", "Dolphins"];
// Functions for web page
// Function for displaying gifs
function displayGifButtons(){
// Erasing anything in this div id so that it doesnt duplicate the results
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < gifTopics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("newGif");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", gifTopics[i]);
        gifButton.text(gifTopics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new gif button
function addNewButton(){
    $("#addGif").on("click", function(){
    var newGif = $("#gif-input").val().trim();
    if (newGif == ""){
// To prevent the user from adding nothing
      return false;
    }
    gifTopics.push(newGif);
    displayGifButtons();
    return false;
    });
}
// Function for displaying gifs
function displayGifs(){
    var displayGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + displayGif + "&api_key=AbnnhnC1VpxoRW6TQlhBEzKPsWK1PVCZ&limit=10";
    // API Link
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
// clears previous search
        $("#gifsView").empty();
// gif results variable 
        var gifResults = response.data;
        if (gifResults == ""){
          alert("There isn't a gif for this selected button");
        }
// For loop 
        for (var i=0; i<gifResults.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", gifResults[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",gifResults[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",gifResults[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling functions 
displayGifButtons();
addNewButton();
// Document event listeners 
$(document).on("click", ".newGif", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});