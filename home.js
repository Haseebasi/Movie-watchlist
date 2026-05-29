const mainSection = document.getElementById("main-section")
let watchlistArray = []
async function handleSearch(){
    const searchKeyword = document.getElementById("search-text").value
    const emptyParagraph = document.getElementById("empty-text")
    const mainSection = document.getElementById("main-section")
    if(searchKeyword){
        const res = await fetch ( `https://www.omdbapi.com/?s=${encodeURIComponent(searchKeyword)}&type=movie&apikey=b48d998a`)
        const data = await res.json()
        if(data.Response === "True"){
            mainSection.innerHTML=''
            const searchArray = data.Search
            for(i=0;i<data.Search.length;i++){
                renderEach(searchArray[i].imdbID)
            }    
        }
        else{
        mainSection.mainSection.innerHTML=`<section class="not-found" id="not-found"><p>Unable to find what you&#39;re looking for. Please try another search.</p></section>`
        emptyParagraph.classList.add("hide")
        }
    }else{
        mainSection.innerHTML=`<section class="not-found" id="not-found"><p>Unable to find what you&#39;re looking for. Please try another search.</p></section>`
        emptyParagraph.classList.add("hide")
    }
}



async function renderEach(MovieId){
    const res = await fetch(`https://www.omdbapi.com/?i=${MovieId}&plot=full&apikey=b48d998a`)
    const data = await res.json()
    mainSection.innerHTML += `
            <div class="movie-details" id="${data.imdbID}">
                <img class="poster" src="${data.Poster}" alt="${data.Title} poster">
                <div class="movie-description">
                    <div class="movie-name">
                        <p class="title">${data.Title}</p><i class="fa-solid fa-star star-icon"></i><p class="rating">${data.Ratings[0].Value}</p>
                    </div>
                    <div class="movie-genre">
                        <p class="runtime">${data.Runtime}</p><p class="genre">${data.Genre}</p> <div class="add-watchlist" data-add="${data.imdbID}" id="w${data.imdbID}"><i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p></div>
                    </div>
                    <div class="movie-plot-container" id="pc${data.imdbID}">
                    <p class="movie-plot" id="plot${data.imdbID}">${data.Plot}
                    <a href="#" class="readBtn readlessBtn hide" data-readless="plot${data.imdbID}">Read less</a></p>
                    <p class="readBtn-container hide" id="rbc${data.imdbID}">...<a href="#" data-readBtn="plot${data.imdbID}" class="readBtn">Read more</a></p>
                    </div>
                </div>
            </div>`
            // const mPlot = document.getElementById(`plot${data.imdbID}`)
            checkPlotOverflow(data.imdbID) 
}



function checkPlotOverflow(id) {
    
    const plot = document.getElementById(`plot${id}`)
        if (plot) {
        const container = document.getElementById(`pc${id}`)
        const readBtnContainer = container.querySelector('.readBtn-container')
        
        
        if (plot.scrollHeight > plot.clientHeight) {
            readBtnContainer.classList.remove('hide')
        }
    }
}

async function idDetailsPicker(id){
    const addElement = document.getElementById(`w${id}`)  
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b48d998a`)
        const data = await res.json()

        if(! watchlistArray.find(movie => movie.imdbId === id)){
            
            watchlistArray.push({
                imdbId:data.imdbID,
                Title:data.Title,
                Ratings:data.Ratings[0].value,
                Runtime:data.Runtime,
                Genre:data.Genre,
                Plot:data.plot
            }) 
            addElement.style.color = "#00ff00"
            addElement.innerHTML = `<i class="fa-solid fa-circle-check"></i> <p>Watchlist</p>`
            

        }else{
            watchlistArray = watchlistArray.filter(movie => movie.imdbId != id)
            addElement.style.color = "black"
            addElement.innerHTML = `<i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>`
            console.log(watchlistArray)
        }
        storingLocally()

}

function storingLocally(){

    localStorage.setItem("watchList",JSON.stringify (watchlistArray))
    console.log(JSON.parse(localStorage.getItem("watchList")))
}




document.addEventListener("click",function(e){
    if(e.target.id === "search-btn"){
        e.preventDefault()
        handleSearch()
    }
    if (e.target.dataset.readbtn) {
        e.preventDefault();
        
        const targetId = e.target.dataset.readbtn;
        const plotText = document.getElementById(targetId);
        const container = plotText.closest('.movie-plot-container');
        
        const readMoreContainer = container.querySelector('.readBtn-container');
        const readlessBtn = container.querySelector('.readlessBtn');

        plotText.style.webkitLineClamp = 'none';
        plotText.style.lineClamp = 'none';
        
        readMoreContainer.classList.add('hide')
        readlessBtn.classList.remove('hide')
    }

    if (e.target.dataset.readless) {
        e.preventDefault();
        const targetId = e.target.dataset.readless;
        const plotText = document.getElementById(targetId);
        const container = plotText.closest('.movie-plot-container');
        
        const readMoreContainer = container.querySelector('.readBtn-container');
        const readlessBtn = container.querySelector('.readlessBtn');

        plotText.style.webkitLineClamp = '3';
        plotText.style.lineClamp = '3';
        

        readMoreContainer.classList.remove('hide');
        readlessBtn.classList.add('hide');
    }
    if(e.target.closest('[data-add]')){
        const watchlistAdd = e.target.closest('[data-add]')
        if(watchlistAdd){
            const id=watchlistAdd.dataset.add
            idDetailsPicker(id)
        }
    }
})






