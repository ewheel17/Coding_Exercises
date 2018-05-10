var myAPI = "E9QrsLKunGruD67h3dPFBQIWhDx5k2BI";
var topic;
var queryURL;
var sports = ["soccer", "golf", "tennis", "swimming", "snowboarding", "skiing"];
var still_gifs = [];
var animated_gifs = [];
var isActive;

function renderButtons() {

    $("#btnBox").empty();

    for(i in sports) {
        var a = $("<button>")
        a.addClass("sport-btn mr-2 mb-1 btn btn-default");
        a.attr("data-name", sports[i]);
        a.text(sports[i]);
        $("#btnBox").append(a);
    }
}

function displayGifs() {

    topic = $(this).attr("data-name");
    
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + myAPI + "&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        console.log(response);
        $("#gifBox").empty();
        still_gifs = [];
        animated_gifs = [];
        isActive = false;

        for (var i = 0; i < 10; i++) {
    
            var sportDiv = $("<div class='sport text-center float-left mr-3'>");
            var rated = response.data[i].rating;
            var gifURL = (response.data[i].images.original_still.url);
            still_gifs.push(gifURL);
            animated_gifs.push(response.data[i].images.fixed_height.url);
            var theGif = $("<img class='aGif' id='gif" + i + "' onclick='changeMe(" + i + ")'>").attr("src", gifURL);
            

            sportDiv.append(theGif);
            sportDiv.append("<br><h4>" + rated.toUpperCase() + "</h4>");

            $("#gifBox").append(sportDiv);
        }

    });
}

function changeMe(x) {
    var thisID = "#gif" + x;

    if ($(thisID)[0].src === animated_gifs[x]) {
        $(thisID).attr("src", still_gifs[x]);
        
    } else {
        $(thisID).attr("src", animated_gifs[x]);
        
    }
}

$("#addBtn").click(function(event) {
    
    event.preventDefault();

    var sport = $("#searchBox").val().trim();
    sports.push(sport);

    renderButtons();

})

renderButtons();

$(document).on("click", ".sport-btn", displayGifs);