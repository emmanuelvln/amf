$(document).ready(function(){
    appendContent();
});

var appendContent=function(){
    fetch('https://emmanuelvln.github.io/amf/lists/liste-lessflowers.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
};

function appendData(data) {
    console.log(data.length)
    for (i = 0; i < data.length; i++) {
        console.log("hi" + i);
        $('#content').append("<div class='carte'><div class='carteIn'><div class='carteDev'><img class='ribbonPhoto' src='../imgs/rubanphoto.png'><div class='flowerNbr'>Photo " + data[i].numero + "</div><img src='../photos-lessflowers/photo" + data[i].numero + ".png' style='width: 220px; height: 220px;'></div><div class='carteDer'><p id='infoLeg'>INFORMATIONS</p><img id='ribbonLeg' src='../imgs/rubanlegende.png'><div class='legende'><p class='nomLeg'>" + data[i].nom + "</p><p>⚭</p><div id='moreInfos'><p class='lilLeg'>le  <span id='dateLeg'>" + data[i].date + "</span></p><p><span class='lilLeg'>à </span>" + data[i].lieu + "</p></div></div><img class='ribbonPhoto' src='../imgs/rubanphoto.png'><div class='flowerNbr'>Flower " + data[i].numero + "</div></div></div></div>");
    }
}

function makeItSmile() {
    document.getElementById("header").innerHTML = "no <strike>always</strike> more flowers <span onclick='makeItSad();'>:)</span>";
}

function makeItSad() {
    document.getElementById("header").innerHTML = "no <strike>always</strike> more flowers";
}

function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}
