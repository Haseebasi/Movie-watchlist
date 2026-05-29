const watchList = (JSON.parse(localStorage.getItem("watchList")))
const emptyText = document.getElementById("empty-text") 
const main = document.getElementById("mainSection")
if(watchList && watchList.length >0){
    emptyText.classList.add("hide")
    for(i=0;i<watchList.length;i++){
                renderEach(watchList[i])
            }
   
}else{
    emptyText.classList.remove("hide")
}

function renderEach(movieObj){
    console.log(movieObj)
}