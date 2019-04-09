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
// For loop that assigns rating to each gif
        for (var i=0; i<gifResults.length; i++){
// creating a new giv for each gif
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", gifResults[i]
// storing a gif as a fixed image
            .images.fixed_height_small_still.url); 
            gifImage.attr("data-still",gifResults[i].images.fixed_height_small_still.url)
            gifImage.attr("data-animate",gifResults[i]
// animated gifs
            .images.fixed_height_small.url); 
// setting image state
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
// appending gif image to each gif div
            gifDiv.append(gifImage);
// adding gifs to gifView ID
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling functions 
displayGifButtons();
addNewButton();
// Document event listeners. This is not working. Trying to figure out why the clicks are not registering.
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