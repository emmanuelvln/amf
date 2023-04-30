function resize() {
    if (window.innerWidth < 1200) {
        document.getElementById('content').style.width = "80vw";
    } else {
        document.getElementById('content').style.width = "35vw";
    }

    var found = sessionStorage.getItem('found');
    if (found*258 > window.innerWidth) {
        var test1 = (Math.trunc(window.innerWidth/258))*248+((Math.trunc(window.innerWidth/258))-1)*10
        document.getElementById('photos').style.width = test1+"px";
    } else {
        var test1 = found*248+(found-1)*10;
        document.getElementById('photos').style.width = test1+"px";
    }
}

window.onresize = resize;

$(document).ready(function(){
    appendContent();
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
    var flower = sessionStorage.getItem('flower');

    document.getElementById("title").innerHTML = data[flower].nom;
    document.getElementById("subtitle").innerHTML = data[flower].nomscient;

    sessionStorage.setItem('found', data[flower].version);

    resize();

    if (data[flower].version > 1) {
        document.getElementById("photoNbr").innerHTML = data[flower].version + " photographies disponibles";
    } else {
        document.getElementById("photoNbr").innerHTML = data[flower].version + " photographie disponible";
    }

    var flowerName = data[flower].nomscient;
    var photoNbr = data[flower].version;

    console.log($(window).width());
    $('#photos').append("<div class='tiles'><div class='tile'><div class='frame'><img class='photo' src='../photos/flower"+data[flower].numero+".png'></div><img onclick='fullscreen("+data[flower].numero+",0)' class='fullscreen' src='../imgs/fullscreen.png'></div></div>");

    if (photoNbr > 1) {
        var n = 2
        for (i = 0; i < (photoNbr-1); i++) {
            $('#photos').append("<div class='tiles'><div class='tile'><div class='frame'><img class='photo' src='../photos/flower"+data[flower].numero+"_"+n+".png'></div><img onclick='fullscreen("+data[flower].numero+","+n+")' class='fullscreen' src='../imgs/fullscreen.png'></div></div>");
            n++;
        }
    }
}

function closeIt() {
    document.getElementById("zoomin").style.display = "none";
}

function fullscreen(numero,n) {
    if (n > 0) {
        document.getElementById("zoomin").innerHTML = "<div id='dark-back'></div><div onclick='closeIt()' id='img-container'><img id='zoom-img' src='../photos/flower"+numero+"_"+n+".png'></div>";
    } else {
        document.getElementById("zoomin").innerHTML = "<div id='dark-back'></div><div onclick='closeIt()' id='img-container'><img id='zoom-img' src='../photos/flower"+numero+".png'></div>";
    }
    document.getElementById("zoomin").style.display = "block";

    if (window.innerWidth > window.innerHeight) {
        document.getElementById('zoom-img').style.height = "80vh";
    } else {
        document.getElementById('zoom-img').style.height = "80vw";
    }
}


function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}
