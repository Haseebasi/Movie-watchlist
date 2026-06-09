let watchList = (JSON.parse(localStorage.getItem("watchList"))) //parsing the watchlist array from local storage
const emptyText = document.getElementById("empty-text") 
const main = document.getElementById("mainSection")

/* ======================================
            function to show the text when watchlist is empty
   ====================================== */

if(watchList && watchList.length >0){
    emptyText.classList.add("hide")
    renderArray()
   
}else{
    emptyText.classList.remove("hide")
}

/* ======================================
            function to get each movies from the list of watchlist array and render them on the page
   ====================================== */

function renderArray(){
    for(i=0;i<watchList.length;i++){
                renderEach(watchList[i])
            }
    
        
}


/* ======================================
            function for render each movie card
   ====================================== */

function renderEach(movieObj){
    main.innerHTML += `<div class="movie-details" id="${movieObj.imdbId}">
                <img class="poster" src="${movieObj.Poster}">
                <div class="movie-description">
                    <div class="movie-name">
                        <p class="title">${movieObj.Title}</p><i class="fa-solid fa-star star-icon"></i><p class="rating">${movieObj.Ratings}</p>
                    </div>
                    <div class="movie-genre">
                        <p class="runtime">${movieObj.Runtime}</p><p class="genre">${movieObj.Genre}</p> <div class="add-watchlist" id="m${movieObj.imdbId}" data-remove = "${movieObj.imdbId}"><i class="fa-solid fa-circle-minus"></i><p></p>Remove</p></div>
                    </div>
                    <p class="movie-plot">${movieObj.Plot}</p>
                </div>
            </div>`
}


/* ======================================
            function to remove movies from watchlist
   ====================================== */

function removeItem(id){
    console.log(id)
    watchList = watchList.filter(movie => movie.imdbId != id)
    console.log(watchList)
    storingLocally()
    main.innerHTML = ""
  if(watchList.length <=0){
    main.innerHTML =`<section class="empty-text" id="empty-text">
                <p>Your watchlist is looking a little empty...</p>

                <div class="watchlist dir-home"><a href="home.html"><i class="fa-solid fa-circle-plus"></i>let&#39;s add some movies!</a></div>
            </section>`
  }else{
    renderArray()
  }

}

/* ======================================
            function to store on local storage
   ====================================== */

function storingLocally(){
    localStorage.setItem("watchList",JSON.stringify (watchList))
    console.log(JSON.parse(localStorage.getItem("watchList")))
}


/* ======================================
            event listener for removing movies from watchlist
   ====================================== */

document.addEventListener("click",function(e){
    if(e.target.closest('[data-remove]')){
        const watchlistRemove = e.target.closest('[data-remove]')
        if(watchlistRemove){
            const id=watchlistRemove.dataset.remove
            removeItem(id)
        }
    }
})