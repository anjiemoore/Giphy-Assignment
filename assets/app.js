// // Function for displaying movie data
// function renderButtons() {
//   // Deleting the movies prior to adding new movies
//   // (this is necessary otherwise we will have repeat buttons)
//   $("#buttons-view").empty();
//   // Looping through the array of movies
//   for (var i = 0; i < movies.length; i++) {
//     // Then dynamicaly generating buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adding a class of movie to our button
//     a.addClass("movie");
//     // Adding a data-attribute
//     a.attr("data-name", movies[i]);
//     // Providing the initial button text
//     a.text(movies[i]);
//     // Adding the button to the HTML
//     $("#buttons-view").append(a);
//   }
// }

 // Event listener for all button elements
 $("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var input = $(this).attr("data-typed");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      input + "&api_key=4zx8FOtD0cfAvnHCgfg40VbhW8GmMaBx";
      

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var image = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            image.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(image);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

// Initial array of movies
var gifs = ["Cats", "Dogs", "Why", "What"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gif = $(this).attr("data-typed");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=4zx8FOtD0cfAvnHCgfg40VbhW8GmMaBx";
  
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div with the class "item"
        var gifDiv = $("<div class='item'>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var image = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        image.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(image);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-typed", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();