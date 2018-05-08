var gifs = ["Cats", "Dogs", "Why", "What"];

function displayGifInfo() {


  var gif = $(this).attr("data-typed");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=4zx8FOtD0cfAvnHCgfg40VbhW8GmMaBx";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var image = $("<img>");
        image.addClass("gif")
        image.attr("src", results[i].images.fixed_width_still.url);
        image.attr("data-animated", results[i].images.fixed_width.url)
        image.attr("data-still", results[i].images.fixed_width_still.url)
        image.attr("data-state", "still");
       
        gifDiv.append(p);
        gifDiv.append(image);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  })
}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {

    var a = $("<button>");

    a.addClass("gif-btn btn-info");

    a.attr("data-typed", gifs[i]);

    a.text(gifs[i]);

    $("#buttons-view").append(a);
  }
}

$("body").on("click", ".gif", function() {

  var state = $(this).attr("data-state");

  if(state == "still"){
    $(this).attr("src", $(this).attr("data-animated"));
    $(this).attr("data-state", "animate");
  }else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  gifs.push(gif);

  renderButtons();
});

$(document).on("click", ".gif-btn", displayGifInfo);

renderButtons();