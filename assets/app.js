//Javascript //

// Topics //
var topics = ["Jurassic Park", "Rush Hour", "Mrs. Doubtfire", "Shawshank Redemption", "Forrest Gump", "Sixth Sense", "Silence of the Lambs",
  "Green Mile", "Home Alone", "Dumb and Dumber"
];

// Creates the button
function renderButtons() {

  $("#buttons-view").empty();

  // For loop //
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button class = 'button'>");
    a.addClass("giphy");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
  displayGiphy();
}

function displayGiphy() {
  $("button").on("click", function () {

    var giphy = $(this).attr("data-name");
    if (giphy === "") {
      alert("Add a movie!");
    } else {
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=W6h9JJho7gVM51hZFSlwtCiweD0aElnO&limit=10&width=5";
      console.log("giphy" + giphy);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function (response) {
        var topicResults = response.data;
        console.log(topicResults);


        $("#gifs-view").empty(topicDisplay);

        // For loop //
        for (var i = 0; i < topicResults.length; i++) {
          var topicDisplay = $("<div class='card'>");
          var rating = topicResults[i].rating;
          var p = $("<div class = 'card-title'>").text("Rating: " + rating + "  " + giphy);
          var giphyImage = $("<img>");
          giphyImage.attr("src", topicResults[i].images.fixed_height_still.url);
          giphyImage.attr("data-state", "still");
          giphyImage.attr("data-still", topicResults[i].images.fixed_height_still.url);
          giphyImage.attr("data-animate", topicResults[i].images.fixed_height.url);
          giphyImage.addClass("gif");

          $(".gif").on("click", function () {

            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
          topicDisplay.prepend(p);
          topicDisplay.prepend(giphyImage);
          console.log(giphyImage);
          $("#gifs-view").prepend(topicDisplay);
        }
      });
    }
  }

  )
}

$("#add-gifs").on("click", function (event) {
  event.preventDefault();


  var giphy = $("#gifs-input").val().trim();

  if (giphy === "") {
    alert("Add a movie!");
    $("#gifs-input").focus();
  } else {

    topics.push(giphy);
    console.log(topics)

    renderButtons();
    $("#gifs-input").val("");
  }
});

renderButtons();
