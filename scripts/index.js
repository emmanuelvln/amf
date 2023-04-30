$(document).ready(function(){
    appendContent();
    var test1 = (Math.trunc((window.innerWidth-100)/258))*248+(Math.trunc((window.innerWidth-100)/258)-1)*10;
    document.getElementById('content').style.width = test1+"px";
});

function resize() {
    var test1 = (Math.trunc((window.innerWidth-100)/258))*248+(Math.trunc((window.innerWidth-100)/258)-1)*10;
    document.getElementById('content').style.width = test1+"px";
}

window.onresize = resize;

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
    for (i = 0; i < data.length; i++) {
        if(data[i].nom.length > 19) {
            if(data[i].nom.slice(15, 16) == " ") {
                data[i].nom = data[i].nom.slice(0, 15)+"..."
            } else {
                data[i].nom = data[i].nom.slice(0, 16)+"..."
            }
        }

        if(data[i].numero >= 100) {
            numeroDisplay = data[i].numero
        } else if (data[i].numero >= 10) {
            numeroDisplay = "0"+data[i].numero
        } else if (data[i].numero < 10) {
            numeroDisplay = "00"+data[i].numero
        }

        $('#content').append("<div class='tiles'><div class='tile'><div class='frame'><img height='216' width='216' class='photo' src='photos/flower"+data[i].numero+".png'></div><span class='number'>"+numeroDisplay+"</span><img onclick='openPlus("+i+")' class='plus' src='imgs/plus.png'><span class='title'>" + data[i].nom + "</span><span class='details'>" + data[i].nomscient + "</span></div></div>");
    }
    if ($(window).width() < 450) {
        document.getElementById('menu').style.width = '300px';
    }
}


function makeItSmile() {
    document.getElementById("header").innerHTML = "always more flowers <span onclick='makeItSad();'>:)</span>";
    document.getElementById("ribbonBot").innerHTML = "<img class='ribbonImg' src='imgs/ruban1.png'><div class='ribbonText' id='ribbonText' onclick='makeItGrin();'>that\'s all folks!</div>";
}

function makeItGrin() {
    document.getElementById("header").innerHTML = "always more flowers <span onclick='makeItSad();'>(つ✧ω✧)つ</span>";
}

function makeItSad() {
    document.getElementById("header").innerHTML = "always more flowers";
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $('#gotop-button').fadeOut();
    windowScroll = false;
}

var windowScroll = false;
$(window).scroll(function(){
    if (!windowScroll) {
        if($(window).scrollTop()>=500){
            $('#gotop-button').fadeIn();
            windowScroll = true;
        }
    } else {
        if($(window).scrollTop()<=500){
            $('#gotop-button').fadeOut();
            windowScroll = false;
        }
    }
});

function flowerProfile(string) {
    sessionStorage.setItem('flower', string);
    location.href = 'pages/flowerprofile.html';
}

function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}

function goTopShade() {
    document.getElementById("gotop-button").innerHTML = "<a onmouseover='goTopShade()' onmouseout='goTopUnshade()' onclick='goTop()'><img id='gotop-img' src='imgs/gotopbutton2.png'></a>";
}

function goTopUnshade() {
    document.getElementById("gotop-button").innerHTML = "<a onmouseover='goTopShade()' onmouseout='goTopUnshade()' onclick='goTop()'><img id='gotop-img' src='imgs/gotopbutton1.png'></a>";
}

function openPlus(string) {
    sessionStorage.setItem('flower', string);
    location.href = 'pages/flowerprofile.html';
}
