console.log("page loaded")

const apiKey = "b630455af027c22d340f93421b3c1d3a";
const limit = 10;
const client_key = "flixter_starter";
const search_term = document.querySelector("#search");
const gifForm = document.querySelector("form");
const results = document.querySelector("#results");

 pageNum = 1;
let offset = pageNum*limit;
var searchTerm ='';

search_term.addEventListener("input",getResults);

//async function handleFormSubmit(evt){
    //evt.preventDefault();
    //results.innerHTML = ` `;
    //searchTerm = search_term.value;
    //const pageResults = await getResults(searchTerm);
    //displayResults(results)
    //searchTerm.value = '';
    //pageNum++;  
//}
async function getResults(evt){
    console.log("start of getResults",pageNum)
    evt.preventDefault();
    clear();
    pageNum=1
    const input = evt.target.value;
    searchTerm = input
    if(!input){
        trending(pageNum);
     }
     searchData(input)
     console.log("end of getResults",pageNum)
    /*const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${input}&page=1&include_adult=false`;
const response = await fetch(search_url)
const jsonResponse = await response.json();
const data = jsonResponse.results
console.log(111,jsonResponse)
data.forEach(el => displayResults(el));*/



}
async function searchData (search_term){
    console.log("start of searchData",pageNum)
    
    const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search_term}&page=${pageNum}&include_adult=false`;
const response = await fetch(search_url)
const jsonResponse = await response.json();
const data = jsonResponse.results
console.log(111,jsonResponse)
data.forEach(el => displayResults(el));
console.log("end of searchData",pageNum)
}

function clear(){
    results.innerHTML = ` `;
}

 function displayResults(movieData){
    
    let moviePoster = movieData.poster_path;
   let movieTitle = movieData.original_title;
   let movieRating = movieData.vote_average;
   let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;
    results.innerHTML+=
    `<div id="movieInfo">
      <img class = "poster" src="${posterSrc}" alt="${movieTitle}"> </img>
      <h4 id= "titles">${movieTitle} </h4>
      <div id="ratings">
         <p>&#11088;</p>
         <h3 id= "rating">${movieRating} </h3>
      </div>
   </div>    
   `

}

async function trending(pageNum){
    console.log("start of trending",pageNum)
    
    console.log("trending",pageNum)
const currentMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`;
const response = await fetch(currentMovies)
const jsonResponse = await response.json();
const tdata = jsonResponse.results
console.log(111,jsonResponse)
tdata.forEach(el => displayTrending(el));
console.log("end of trending",pageNum)
}


const trendingSpace = document.querySelector("#results");

function displayTrending(movieData){
    /*console.log("start of display Trending",pageNum)*/
    let moviePoster = movieData.poster_path;
    let movieTitle = movieData.original_title;
    let movieRating = movieData.vote_average;
    let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;
    
     trendingSpace.innerHTML+=
     `<div id="movieInfo">
       <img class = "poster" src="${posterSrc}" alt="Trending Poster"> </img>
       <h4 id= "titles">${movieTitle} </h4>
       <div id="ratings">
          <p>&#11088;</p>
          <h3 id= "rating">${movieRating} </h3>
       </div>
    </div>    
    `
    /*console.log("end of displayTrending",pageNum)*/
}

trending(pageNum);


const moreMovies = document.querySelector(".more")


 function showMore() {
    //*pageNum++;*//
   //* evt.preventDefault();*//
    pageNum++;
    trending(pageNum)
}


moreMovies.addEventListener("click",showMore);
