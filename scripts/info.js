$(document).ready(function(){
    appendContent();
    appendContentBis();
});

var appendContent=function(){
    fetch('https://emmanuelvln.github.io/amf/lists/liste.json')
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

    document.getElementById("card2").innerHTML = (data.length);

    var na = 0;
    var identified = 0;
    var lieux = ["Saint-Rémy-de-Provence"];
    var nbrLieux = 1;
    var osef = 0;

    for (i = 0; i < data.length; i++) {
        if (data[i].nomscient == "n / a") {
            na = na+1;
        } else {
            identified = identified+1;
        }
    }

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < lieux.length; j++) {
            if (lieux[j] == data[i].lieu) {
            } else {
                osef = osef + 1;
            }
        }
        if (osef == lieux.length) {
            lieux.push(data[i].lieu);
            nbrLieux++;
            console.log(lieux);
        }
        osef = 0;
    }

    document.getElementById("card3").innerHTML = na;
    document.getElementById("card4").innerHTML = identified;
    document.getElementById("card6").innerHTML = nbrLieux;
}

var appendContentBis=function(){
    fetch('https://emmanuelvln.github.io/amf/lists/liste-lessflowers.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendDataBis(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
};

function appendDataBis(data) {
    document.getElementById("card5").innerHTML = data.length;
}

function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}
