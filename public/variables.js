let proxy = "https://api.themoviedb.org/3/";
let api_key = "44ae4b9d7f7d9b75d4fc1729f0360036";
let images = `https://image.tmdb.org/t/p/`;//used to be original not w200
var timeWindow = 'day';
let qSA = (qSA) => document.querySelectorAll(qSA);
let qS = (qS) => document.querySelector(qS);
let homePageBackground = qS('#homePageBackground')
let trendingSection = qS('#trending-section');
let popularSection = qS('#popular-section');
let trendingDiv = qS('#trending-movies-div');
let popularDiv = qS('#popular-movies-div');
let nav = qS('#nav');
let menuBtn = qS('#header-menu');
let main = qS('.main');
let container = qS('#container');
let trendingAll = qS(`#trending-section .all`);
let trendingMovies = qS(`#trending-section .movies`);
let trendingTV = qS(`#trending-section .tv-shows`);
let popularMovies = qS(`#popular-section .movies`);;
let popularTV = qS(`#popular-section .tv-shows`);
let popularPeople = qS(`#popular-section .popular-people`);
let size = 'w200/';
let page_no;
let timer = 0;
var counter;
var Num = 1;
var type;
let category;
var categoryImage;
var rating;
var ratingBg;
var categoryTitle;
var categoryRelease;
var categoryInfo;
let ratingPercent;
var searchValue;
let searchDiv;
let searchImage;
let searchRating;
let searchResultTitle;
let searchResultDescription;
let searchResultDate;
let searchResultPerson;
let searchResultsDiv;
let theId;
var Genre, companies, languages, countries, Status, tagLine, voteCount, posterPath, belongsTo, homePage, ID, Duration, backGround, overview;

let infos = (theDiv, something)=>{
	category = theDiv.querySelectorAll('.movie-link');
	categoryImage = document.querySelectorAll(`${something} .category-image`);
	rating = document.querySelectorAll(`${something} .rating`);
	ratingBg = document.querySelectorAll(`${something} .rating-bg`);
	categoryTitle = document.querySelectorAll(`${something} .movie-title`);
	categoryRelease = document.querySelectorAll(`${something} .movie-release-date`);
	categoryInfo = document.querySelectorAll(`${something} .movie-first-info`);
}
let dailyTrending = qS('.daily');
let weeklyTrending = qS('.weekly');
let searchForm = qSA('.search');
let searchInput = qSA('.search-bar');
let searchSection = qS('#search');
let resultQuery = qS('#search-response');
let searchResultsContainer = qS('#search');
let anyValue = (value) =>{
	let anyNum = Math.floor(Math.random() * value);
	return anyNum;
}
let loading = qS('#loading');
let loadingAnimation = qS('#loading-animation');
let loadingText = qS('#loading-text');
let loadingCircles = qSA('.loading-circles');
let userIcon = qS('#user');
let welcomeUsername = qS('#welcome-username');
let userHover = qS('#user-hover');
let hoverUsername = qS('#user-hover-username');
let hoverChangeUsername = qS('#user-hover-change');
let newUsernameField = qS('#new-username-field');
let submitUsername = qS('#submit-new-username');
let changeUsernameScreen = qS('#change-name');
let inside = qS('#change-name');
let changeNameForm = qS('#change-name-form');
let exitChangeUsernameScreen = qS('#exit-change-username');
let username;
let searchAll = qS('#search-all');
let searchMovies = qS('#search-movies');
let searchTV = qS('#search-tv');
let searchPeople = qS('#search-people');

if(localStorage.getItem('name') === null){
	username = `Guest${anyValue(9)}${anyValue(9)}${anyValue(9)}`;
	localStorage.setItem('name', `${username}`);
}else {
	username = localStorage.getItem('name');
}

userIcon.onclick = () =>{
	userHover.style.display = 'inline-flex';
	if (userHover.display = 'inline-flex') {
		userHover.display = 'none';
	}
}

hoverChangeUsername.onclick = () =>{
	changeUsernameScreen.style.display = "inline-flex";
	container.style.overflow = 'hidden';
	exitChangeUsernameScreen.style.display = "block";
	exitChangeUsernameScreen.style.animation = "exitenter 1s forwards";
}

exitChangeUsernameScreen.onclick = () =>{
	container.style.overflow = 'initial';
	exitChangeUsernameScreen.style.display = "none";
	changeUsernameScreen.style.display = 'none';
}

changeNameForm.onsubmit = (e) =>{
	if (newUsernameField.value === '') {
		alert('please type in a name');
		e.preventDefault();
	} else{
		username = `${newUsernameField.value}`;
		localStorage.setItem('name', `${username}`);
	}
}

if (menuBtn){
	menuBtn.onclick = () =>{
		if (nav.style.animation === '1s ease 0s 1 normal forwards running showMenu') {
			nav.style.animation = 'hideMenu 1s normal forwards'
		} else{
			nav.style.animation = 'showMenu 1s normal forwards';
		}
	}
}

let votePerc = (index, varName, vote_average, vote_count) =>{
	if (vote_average === undefined) {
		varName[index].style.display = 'none';
		ratingBg[index].style.display = 'none';
		varName[index].textContent = '';
		varName[index].style.backgroundColor = "transparent";
	}else{
		if (vote_count !== 0) {
			ratingPercent = parseInt((vote_average * 10));
			varName[index].textContent = ratingPercent + '%';	
			if (ratingPercent >= 80) {
		  		varName[index].style.backgroundColor = "hsl(120, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(120, 100%, 25%)";
		  	} else if (ratingPercent >= 50) {
		  		varName[index].style.backgroundColor = "hsl(66, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(66, 100%, 25%)";
		  	} else {
		  		varName[index].style.backgroundColor = "hsl(0, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(0, 100%, 25%)";
		  	}
		} else{
			varName[index].textContent = 'N/A';
			varName[index].style.backgroundColor = "grey";
		}
	}
}



// export {proxy, api_key, images, timeWindow, qS, qSA, trendingSection, username,
// 	popularSection, trendingDiv, popularDiv, main, container, trendingAll, trendingMovies,
// 	trendingTV, popularMovies, popularTV, popularPeople, dailyTrending, weeklyTrending,
// 	menuBtn, loading, searchForm, searchInput, searchSection, resultQuery,
// 	searchResultsContainer, anyValue, loadingAnimation, loadingText, loadingCircles, 
// 	userIcon, userHover, welcomeUsername,	hoverUsername, hoverChangeUsername, 
// 	newUsernameField, submitUsername, changeUsernameScreen, inside, changeNameForm,
// 	 exitChangeUsernameScreen};