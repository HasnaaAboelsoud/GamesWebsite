let games=document.querySelector(".games");
let details=document.querySelector(".details");
let elements=document.querySelectorAll("a");
let active=document.querySelector(".active")
let row=document.querySelector(".row");
let rowDetails=document.querySelector("#rowDetails");
let eles=document.querySelectorAll(".element");

window.addEventListener("load",function(){
    getGames("Mmorpg");
});

(function(){
    for(let i=0 ; i<elements.length ;i++){
        elements[i].addEventListener("click",function(eventInfo){
            eventInfo.preventDefault();
            $(this).attr("style","color:#09c !important");
            $("a").not(this).css("color","white");
            let caterory= eventInfo.target.getAttribute("data-ca");
            getGames(caterory);
        })
    }
})();
let response=[];
async function getGames(caterory){
    $(".loading").fadeIn(500);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0285dc1b13msheaa395fe031e303p17698ejsn418e8e23be35',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${caterory}`,options)
    let response= await api.json();
    displayData(response);
    showDetails();
    $(".loading").fadeOut(500);
}
let element;
function displayData(response){
    let box="";
    for (let i = 0; i < response.length; i++) {
        box+=`
        <div class="col-md-4 mt-2 mb-3 element">
            <div class="card text-white h-100" onclick="getDetails(${response[i].id})">
                <div class="card-body mb-3">
                    <img src="${response[i].thumbnail}" class="card-img-top mb-2 w-100" alt="image's game">
                    <div class="content d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${response[i].title}</h5>
                        <span class="badge text-bg-primary p-2 fw-semibold">free</span>
                    </div>
                    <p class="card-text opacity-50 text-center">${response[i].short_description.split(" ").slice(0,8).join(",")}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a href="#" class="text-decoration-none badge text-white">${response[i].genre}</a>
                    <a href="#" class="text-decoration-none ms-auto badge text-white">${response[i].platform}</a>
                </div>
            </div>
        </div>
        `
    }
    row.innerHTML=box;
}

function showDetails(){
    $(".card").click(function(){
        $(".games").addClass("d-none");
        $(".details").removeClass("d-none");
        $(".loading").fadeIn(500,function(){
            $(".loading").fadeOut(500);
        })
    })
}

// details section
let data={};
async function getDetails(id){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0285dc1b13msheaa395fe031e303p17698ejsn418e8e23be35',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
    let data= await api.json();
    displayDetails(data);
    closeFun();
}

function displayDetails(data){
    let box="";
    box+=`
        <div class="image col-md-4">
            <img src="${data.thumbnail}"  class="w-100" alt="game image">
        </div>
        <div class="info col-md-8">
            <h2 class="fw-light">Title: ${data.title}</h2>
            <p class="fw-bold">
                Category:
                <span class="badge text-bg-info">${data.genre}</span>
            </p>
            <p class="fw-bold">
                Platform::
                <span class="badge text-bg-info">${data.platform}</span>
            </p>
            <p class="fw-bold">
                Status:
                <span class="badge text-bg-info">${data.status}</span>
            </p>
            <p>${data.description}</p>
            <button class="btn btn-outline-warning text-white fs-6 fw-bold">show Game</button>
        </div>
    `
    rowDetails.innerHTML=box;
}

function closeFun(){
    $(".icon").click(function(){
        $(".details").addClass("d-none");
        $(".games").removeClass("d-none");
    })
}

window.addEventListener("load",function(){
    $(".loading").fadeOut(800,function(){
        $(".games").fadeIn(500);
    })
})
