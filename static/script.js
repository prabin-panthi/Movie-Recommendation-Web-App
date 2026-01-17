let openbuttons = document.getElementsByClassName("openbutton");
let homediv = document.querySelector(".homediv");
let moviediv = document.querySelector(".moviediv");

let genreId = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western" };

let TMDB_API_KEY = '5cd52bd2e9a5890c00a128230bb04996';

function moveToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function moveToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

function showmoviediv() {
  smallsearchbox.value = "";
  smallclearbtn.style.display = "none";

  homediv.classList.add("hidden");
  moviediv.classList.remove("hidden");
}

function showhomediv() {
  moveToTop();
  searchbox.value = "";
  clearbtn.style.display = "none";
  showtilesdiv();

  moviediv.classList.add("hidden");
  homediv.classList.remove("hidden");
}

function showerrdiv() {
  moveToBottom();
  document.querySelector(".tilesdiv").classList.add("hidden");
  document.querySelector(".errdiv").classList.remove("hidden");
}

function showtilesdiv() {
  moveToTop();
  document.querySelector(".errdiv").classList.add("hidden");
  document.querySelector(".tilesdiv").classList.remove("hidden");
}

function small_showerrdiv() {
  moveToBottom();
  document.querySelector(".moviediv .tilesdiv").classList.add("hidden");
  document.querySelector(".moviediv .errdiv").classList.remove("hidden");
}

function small_showtilesdiv() {
  moveToTop();
  document.querySelector(".moviediv .errdiv").classList.add("hidden");
  document.querySelector(".moviediv .tilesdiv").classList.remove("hidden");
}

for (let btn of openbuttons) {
  btn.addEventListener("click", () => {
    let parentDiv = btn.parentElement;
    let title = parentDiv.querySelector("p").innerText;
    small_showtilesdiv();
    showmoviediv();
    openBtn_prediction(title);
    oneTMDB(title);
  });
}

let predict_btn = document.getElementById("searchicon");
let searchbox = document.getElementById("searchbox");
let smallpredict_btn = document.getElementById("smallsearchicon");
let smallsearchbox = document.getElementById("smallsearchbox");

searchbox.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    predict_btn.click();
  }
});

smallsearchbox.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    smallpredict_btn.click();
  }
});

async function prediction() {

  let homeparent = document.querySelector(".homediv");
  let infodiv = homeparent.querySelector(".infodiv");
  infodiv.querySelector("p").innerText = "Recommended Movies: ";

  text = searchbox.value;
  let formdata = new FormData();
  formdata.append("text", text);

  let response = await fetch('http://192.168.1.65:5000/predict', {
    method: "POST", body: formdata
  });

  let result = await response.json();
  if (result.prediction[0] === 'err') {
    showerrdiv();
  }
  else {
    showtilesdiv();
    tmdbElements(result.prediction);
  }
}

async function small_prediction() {
  text = smallsearchbox.value;
  let formdata = new FormData();
  formdata.append("text", text);

  let response = await fetch('http://192.168.1.65:5000/predict', {
    method: "POST", body: formdata
  });

  let result = await response.json();
  if (result.prediction[0] === 'err') {
    small_showerrdiv();
  }
  else {
    small_showtilesdiv();
    openBtn_tmdbElements(result.prediction);
    oneTMDB(text);
  }
}

predict_btn.addEventListener("click", prediction);
smallpredict_btn.addEventListener("click", small_prediction);

async function tmdbElements(titles) {
  let count = 1;
  for (let i in titles) {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(titles[i])}`
    );
    let data = await response.json();
    if (data.results && data.results.length > 0) {
      let result = data.results[0];
      if (result.poster_path) {
        document.getElementById(`movietilediv[${count}]`).querySelector("img").src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
      } else {
        document.getElementById(`movietilediv[${count}]`).querySelector("img").src = "static/Replacement.png";
      }
      document.getElementById(`movietilediv[${count}]`).querySelector("p").innerText = titles[i];
    }
    count++;
  }
}

async function oneTMDB(title) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
  );
  let data = await response.json();
  if (data.results && data.results.length > 0) {
    let result = data.results[0];

    const empstr = result.genre_ids.map(i => genreId[i]).join(", ");

    let textparent = document.querySelector(".textdiv");
    let paragraphs = textparent.querySelectorAll("p");
    paragraphs[0].innerText = result.title;
    paragraphs[1].innerText = "Release: " + result.release_date;
    paragraphs[2].innerText = "Genres: " + empstr;
    paragraphs[3].innerText = "Popularity: " + result.popularity;
    paragraphs[5].innerText = result.overview;

    let imgparent = document.querySelector(".imgdiv");
    if (result.poster_path) {
      imgparent.querySelector("img").src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
    } else {
      imgparent.querySelector("img").src = "static/Replacement.png";
    }
  }
}

async function openBtn_tmdbElements(titles) {
  let count = 13;
  for (let i in titles) {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(titles[i])}`
    );
    let data = await response.json();
    if (data.results && data.results.length > 0) {
      let result = data.results[0];
      if (result.poster_path) {
        document.getElementById(`movietilediv[${count}]`).querySelector("img").src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
      } else {
        document.getElementById(`movietilediv[${count}]`).querySelector("img").src = "static/Replacement.png";
      }
      document.getElementById(`movietilediv[${count}]`).querySelector("p").innerText = titles[i];
    }
    count++;
  }
}

async function openBtn_prediction(text) {
  let formdata = new FormData();
  formdata.append("text", text);

  let response = await fetch('http://192.168.1.65:5000/predict', {
    method: "POST", body: formdata
  });

  let result = await response.json();
  openBtn_tmdbElements(result.prediction);
}

let clearbtn = document.getElementById("clearbtn");
let smallclearbtn = document.getElementById("smallclearbtn");

searchbox.addEventListener("input", () => {
  clearbtn.style.display = searchbox.value ? "block" : "none";
});

clearbtn.addEventListener("click", () => {
  showtilesdiv();
  searchbox.value = "";
  clearbtn.style.display = "none";
  searchbox.focus();
});

smallsearchbox.addEventListener("input", () => {
  smallclearbtn.style.display = smallsearchbox.value ? "block" : "none";
});

smallclearbtn.addEventListener("click", () => {
  small_showtilesdiv();
  smallsearchbox.value = "";
  smallclearbtn.style.display = "none";
  smallsearchbox.focus();
});

let homebtn = document.querySelectorAll(".homebtn");

homebtn.forEach((btn) => {
  btn.addEventListener('click', showhomediv);
});

let enlargebtn = document.querySelectorAll(".enlargebtn");

enlargebtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let parentDiv = btn.parentElement;
    let title = parentDiv.querySelector("p").innerText;
    moveToTop();
    showmoviediv();
    openBtn_prediction(title);
    oneTMDB(title);
  });
});