// JS DE LA PAGE

function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}

// JS DU JEU

$(document).ready(function(){
    appendContent();
});

var appendContent=function(){
    fetch('https://emmanuelvln.github.io/amf/lists/liste.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var Xdata = data;
            sessionStorage.setItem('gameData', JSON.stringify(Xdata));
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
};

function startGame() {
    var points = 0
    sessionStorage.setItem('points', points);
    document.getElementById("content").innerHTML = "<div id='content'><span id='title'>QUEL EST LE NOM DE CETTE FLEUR ?</span></div>";
    $('#content').append("<div id='compteur'><span class='subtitle'>Vous avez "+ points +" points.</span><div>");
    $('#content').append("<div id='photo-container'><img id='photo' src='../photos/flower1.png'><div>");
    $('#content').append("<div id='button1-container'><button id='button1'><span>Réponse 1</span></button><div>");
    $('#content').append("<div id='button2-container'><button id='button2'><span>Réponse 2</span></button><div>");
    $('#content').append("<div id='button3-container'><button id='button3'><span>Réponse 3</span></button><div>");

    nextRound();
}

function nextRound() {
    sessionStorage.setItem('gameAnswer', '');

    var data = JSON.parse(sessionStorage.getItem('gameData'));
    console.log(data);

    var randPhoto = Math.floor(Math.random() * data.length);

    var randPlace = (Math.floor(Math.random() * 3) + 1);

    if (randPlace == 1) {
        var bPlacing = [2, 3];
    } else if (randPlace == 2) {
        var bPlacing = [1, 3];
    } else if (randPlace == 3) {
        var bPlacing = [1, 2];
    }

    buttonText1 = data[Math.floor(Math.random() * data.length)].nom;
    buttonText2 = data[Math.floor(Math.random() * data.length)].nom;

    while (data[randPhoto].nom == "n / a" || data[randPhoto].nomscient == "n / a") {
        randPhoto = Math.floor(Math.random() * data.length);
    }

    while (buttonText1 == "n / a" || buttonText2 == "n / a" || buttonText1 == data[randPhoto].nom || buttonText2 == data[randPhoto].nom) {
        buttonText1 = data[Math.floor(Math.random() * data.length)].nom;
        buttonText2 = data[Math.floor(Math.random() * data.length)].nom;
    }

    document.getElementById("photo-container").innerHTML = "<img id='photo' src='../photos/flower"+ data[randPhoto].numero + ".png'>";

    document.getElementById("button" + randPlace + "-container").innerHTML = "<button onclick = 'answer(true,"+ randPlace +","+ randPlace +")' id='button"+ randPlace +"'><span id='button"+ randPlace +"-text'>" + data[randPhoto].nom + "</span></button>";

    document.getElementById("button" + bPlacing[0] + "-container").innerHTML = "<button onclick = 'answer(false,"+ bPlacing[0] +","+ randPlace +")' id='button" + bPlacing[0] + "'><span id='button"+ bPlacing[0] +"-text'>" + buttonText1 + "</span></button>";
    document.getElementById("button" + bPlacing[1] + "-container").innerHTML = "<button onclick = 'answer(false,"+ bPlacing[1] +","+ randPlace +")' id='button" + bPlacing[1] + "'><span id='button"+ bPlacing[1] +"-text'>" + buttonText2 + "</span></button>";

    var points = sessionStorage.getItem('points');
    document.getElementById("compteur").innerHTML = "<span class='subtitle'>Vous avez "+ points +" points.</span>";
}

function answer(result,button,rightButton) {
    var answer = sessionStorage.getItem('gameAnswer');
    if (result) {
        if(answer != "right" && answer != "wrong") {
            var points = sessionStorage.getItem('points');
            points++;
            sessionStorage.setItem('points', points);
            console.log(points);
            console.log("button"+button);
            document.getElementById("button"+button).style.backgroundColor = "green";
            document.getElementById("button"+button).style.border = "solid green 1px";
            document.getElementById("button"+button+"-text").style.color = "green";

            sessionStorage.setItem('gameAnswer', 'right');

            setTimeout(function(){ nextRound(); }, 1750);
        }
    } else {
        if(answer != "right" && answer != "wrong") {
            document.getElementById("button"+button).style.backgroundColor = "red";
            document.getElementById("button"+button).style.border = "solid red 1px";

            document.getElementById("button"+button+"-text").style.color = "red";

            sessionStorage.setItem('gameAnswer', 'wrong');

            document.getElementById("button"+rightButton).style.backgroundColor = "green";
            document.getElementById("button"+rightButton).style.border = "solid green 1px";
            document.getElementById("button"+rightButton+"-text").style.color = "green";

            setTimeout(function(){ deathScreen(); }, 1750);
        }
    }
}

function deathScreen() {
    var points = sessionStorage.getItem('points');
    sessionStorage.setItem('points', 0);
    document.getElementById("content").innerHTML = "<div id='content'><span id='title'>Vous avez perdu !</span></div>";
    $('#content').append("<span class='subtitle'>Vous aviez "+ points +" points.</span>");
    $('#content').append("<span class='subtitle'>Vouslez vous recommencer ?</span>");
    $('#content').append("<button id='start-button' onclick='startGame()'><span id='start-button-text'>Recommencer</span></button>");
    $('#content').append("<button id='start-button' onclick='giveUp()'><span id='start-button-text'>Abandonner</span></button>");
}

function giveUp() {
    window.location.href = "index.html";
}
