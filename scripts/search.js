function resize() {
    var found = sessionStorage.getItem('found');
    console.log("SSS"+found);
    if (found*258 > window.innerWidth) {
        var test1 = (Math.trunc(window.innerWidth/258))*248+((Math.trunc(window.innerWidth/258))-1)*10
        document.getElementById('content').style.width = test1+"px";
    } else {
        var test1 = found*248+(found-1)*10;
        document.getElementById('content').style.width = test1+"px";
    }
}

window.onresize = resize;

$(document).on("keypress", "input", function(e){
    if(e.which == 13){
        getInputValue();
    }
});

function getInputValue(){
    var found = 0
    sessionStorage.setItem('found', found);

    document.getElementById("content").innerHTML = "";
    document.getElementById("notfound").innerHTML = "";

    var inputVal = document.getElementById("searchInput").value;
    console.log(inputVal);

    fetch('https://emmanuelvln.github.io/amf/lists/liste.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            inputVal = inputVal.trim();
            var lengthSearch = inputVal.length
            console.log(lengthSearch);
            var found = false

            for (i = 0; i < data.length; i++) {
                var searchStart = (data[i].nom).substring(0,lengthSearch);
                var searchStartAlias = searchStart.toLowerCase();

                var searchStartScient = (data[i].nomscient).substring(0,lengthSearch);
                var searchStartScientAlias = searchStartScient.toLowerCase();

                if (searchStart == inputVal) {
                    console.log("1");
                    addCard(data);
                    found = true
                } else if (searchStartAlias == inputVal) {
                    console.log("2");
                    addCard(data);
                    found = true
                } else if (data[i].numero == inputVal) {
                    console.log("3");
                    addCard(data);
                    found = true
                } else if (searchStartScient == inputVal) {
                    console.log("4");
                    addCard(data);
                    found = true
                } else if (searchStartScientAlias == inputVal) {
                    console.log("4");
                    addCard(data);
                    found = true
                }
            }

            if (found != true) {
                document.getElementById("content").innerHTML = "";
                $('#notfound').append("	<div id='notFound'>No flower found</div>");
            }


        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
}

function addCard(data) {
    var found = (parseInt(sessionStorage.getItem('found')))+1;
    sessionStorage.setItem('found', found);

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
    $('#content').append("<div class='tiles'><div class='tile'><div class='frame'><img class='photo' src='../photos/flower"+data[i].numero+".png'></div><span class='number'>"+numeroDisplay+"</span><img onclick='openPlus("+i+")' class='plus' src='../imgs/plus.png'><span class='title'>" + data[i].nom + "</span><span class='details'>" + data[i].nomscient + "</span></div></div>");
    resize();
}

function slideUp(string) {
    document.getElementById(string).style.animation = "slide 0.6s linear";
}

function slideDown(string) {
    document.getElementById(string).style.animation = "slide2 0.6s linear";
}

function openPlus(string) {
    sessionStorage.setItem('flower', string);
    location.href = 'flowerprofile.html';
}

