let proxy = "https://api.themoviedb.org/3/";
let api_key = "44ae4b9d7f7d9b75d4fc1729f0360036";
let images = "https://image.tmdb.org/t/p/original/";
var type;
var timeWindow = 'day';
let qSA = (qSA) => document.querySelectorAll(qSA);
let qS = (qS) => document.querySelector(qS);
let trendingSection = qS('#trending-section');
let popularSection = qS('#popular-section');
let trendingDiv = qS('#trending-movies-div');
let popularDiv = qS('#popular-movies-div');
let main = qS('#main');
let container = qS('#container');
for (var k = 0; k < 17; k++) {
	load();
}
let category;
var categoryImage;
var rating;
var ratingBg;
var categoryTitle;
var categoryRelease;
let trendingAll = qS(`#trending-section .all`);
let trendingMovies = qS(`#trending-section .movies`);
let trendingTV = qS(`#trending-section .tv-shows`);
let popularAll = qS(`#popular-section .all`);;
let popularMovies = qS(`#popular-section .movies`);
let popularTV = qS(`#popular-section .tv-shows`);
let daiilyTrending = qS('.daily');
let weeklyTrending = qS('.weekly');

let infos = (theDiv, something)=>{
	category = theDiv.querySelectorAll('.movie-link');
	categoryImage = document.querySelectorAll(`${something} .movie-image`);
	rating = document.querySelectorAll(`${something} .rating`);
	ratingBg = document.querySelectorAll(`${something} .rating-bg`);
	categoryTitle = document.querySelectorAll(`${something} .movie-title`);
	categoryRelease = document.querySelectorAll(`${something} .movie-release-date`);
}

let searchForm = qSA('.search');
let searchInput = qSA('.search-bar');
let searchSection = qS('#search');
let searchDiv;
let searchImage;
let searchRating;
let searchResultTitle;
let searchResultDescription;
let searchResultDate;
let searchResultPerson;
let resultQuery = qS('#search-response');
let searchResultsContainer = qS('#search');
let ratingPercent;
let page_no;
let timer = 0;
daiilyTrending.style.backgroundColor = '#120D31';
var counter;
var Num = 1;
var searchValue;
let anyValue = (value) =>{
	let anyNum = Math.floor(Math.random() * value);
	return anyNum;
}
let loading = qS('#loading');
let loadingAnimation = qS('#loading-animation');
let loadingText = qS('#loading-text');
let loadingCircles = qSA('.loading-circles');

container.onscroll = () =>{
	// console.log(container.scrollTop)
	counter = container.scrollTop;
	if (counter >= 100) {
		popularSection.style.animation = 'comeIn 1s linear forwards'
	}
	return counter;
}

container.onclick = () =>{
	if (searchInput[0].value !== '') {
		searchValue = searchInput[0].value
		searchInput[1].textContent = '';
		searchInput[1].textContent = '';
	} else if (searchInput[1].value !== '') {
		searchValue = searchInput[1].value
		searchInput[0].textContent = '';
		searchInput[0].textContent = '';
	} else{
		searchValue = '';
	}
}


let Loader = () =>{
	loadingCircles.forEach( function(element, index) {
		loadingCircles[index].style.bottom = '-80vh';
	});
	loading.style.display = 'inline-flex';
	loadingText.style.animation = 'textFadeIn 1.5s forwards';
	loadingCircles[0].style.animation = 'loadingFlyIn 2.5s infinite';
	loadingCircles[1].style.animation = 'loadingFlyIn 2.5s 0.08s infinite';
	loadingCircles[2].style.animation = 'loadingFlyIn 2.5s 0.16s infinite';
	let myFunc = () =>{
		loading.style.display = 'none';
		loadingText.style.animation = '';
		loadingCircles.forEach((element, index) =>{
			loadingCircles[index].style.animation = '';
		});
	}
	const ANINTERVAL = setTimeout(myFunc, 2500);
}


let everyLink = document.querySelectorAll('a');
everyLink.forEach( function(element, index) {
	everyLink[index].addEventListener('click', Loader);
});


let votePerc = (index, varName, vote_average, rating, vote_count) =>{
	if (vote_average === undefined) {
		rating[index].style.display = 'none';
		ratingBg[index].style.display = 'none';
		rating[index].textContent = '';
		rating[index].style.backgroundColor = "transparent";
	}else{
		if (vote_count !== 0) {
			ratingPercent = vote_average * 10;
			varName[index].textContent = ratingPercent + '%';	
			if (ratingPercent >= 80) {
		  		rating[index].style.backgroundColor = "hsl(120, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(120, 100%, 25%)";
		  	} else if (ratingPercent >= 50) {
		  		rating[index].style.backgroundColor = "hsl(66, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(66, 100%, 25%)";
		  	} else {
		  		rating[index].style.backgroundColor = "hsl(0, 100%, 35%)";
		  		ratingBg[index].style.backgroundColor = "hsl(0, 100%, 25%)";
		  	}
		} else{
			rating[index].textContent = 'N/A';
			rating[index].style.backgroundColor = "grey";
		}
	}
}


function load () {
	let links = document.createElement('a');
	links.classList.add('movie-link');
	links.setAttribute('href', '#');

	links.innerHTML = `
							<div class="category-movies">
							<img class="movie-image skeletonImg">
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info">
								<h4 class="movie-title"></h4>
								<p class="movie-release-date"></p>
							</div>
						</div>`
	trendingDiv.appendChild(links);
}


qSA('.section-link').onclick = (e) =>{
	for (let count2 = 0; count2 < qSA('.section-link').length - 1; count2++) {
			e.preventDefault();
		container.scrollTop = counter;
	}
}

searchForm.forEach((item, index) =>{
	searchForm[index].onsubmit = (e) =>{
		e.preventDefault();
		if (searchValue !== '') {
			searching('person');
		} else{
			alert('Please write something.')//change this
		}
	}
})
		// searchInput.forEach((item, index) =>{
		// 	searchValue[index] = searchInput[index].value;
		// 	return searchValue;
		// });
let searching = (theType) =>{
	page_no;
	type = theType;
	let search = `${proxy}search/${type}?api_key=${api_key}&query=${searchValue}&page=${page_no}`;
	fetch(search)
	.then(response => response.json())
	.then(search => {
	  	// timEr(search);
	  	console.log(search);	  
	  	if(search.results.length == 0) {
	  		alert(`${type} does not exist`)
	  	}else{
	  		searchSection.style.display = 'block';
	  		if (searchSection.style.display == 'block') {
	  			searchSection.style.overflowY = 'auto';
	  		}
	  		if (searchDiv !== undefined) {
	  			searchDiv.forEach((item, index)=>{
	  				searchSection.removeChild(searchDiv[index]);	  				
	  			})
	  		}
  			for (var resultDivNum = 1; resultDivNum <= search.results.length; resultDivNum++) {
				searchResultsDiv = document.createElement('a');
				searchResultsDiv.classList.add('search-info');
				searchResultsDiv.setAttribute('href', '#');

				searchResultsDiv.innerHTML = `
										<img src="" class="search-image">
										<div class="circular-portrait">
											<img src=""class="search-person-image">
										</div>
										<div class="search-rating"></div>
										<div class="search-text">
											<h3 class="search-result-title"></h3>
											<p class="search-result-description"></p>
											<p class="search-result-date"></p>
										</div>`
				searchResultsContainer.appendChild(searchResultsDiv);
				searchDiv = qSA('.search-info');
				searchImage = qSA('.search-image');
				searchRating = qSA('.search-rating');
				searchResultTitle = qSA('.search-result-title');
				searchResultDescription = qSA('.search-result-description');
				searchResultDate = qSA('.search-result-date');
				searchResultPerson = qSA('.search-person-image');
				if (resultDivNum === search.results.length) {
			  		searchDiv.forEach((item, index) =>{
				  		const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = search.results[index];

				  		if (profile_path === undefined) {
				  			searchResultPerson[index].style.display = 'none';
				  			if (poster_path === undefined) {
					  			searchImage[index].style.height = '195px';
					  		} else{
					  			searchImage[index].setAttribute('src', `${images}${poster_path}`);					  			
					  		}
				  		}else if(profile_path !== null) {
				  			searchResultPerson[index].setAttribute('src', `${images}${profile_path}`);
				  			searchResultPerson[index].style.display = 'block';
				  			searchImage[index].style.display = 'none';
				  		} else{
				  			searchResultPerson[index].setAttribute('src', `images/photo1.webp`);
				  			searchResultPerson[index].style.display = 'block';
				  			searchImage[index].style.display = 'none';
				  		}

				  		if (original_title !== undefined) {
				  			searchResultTitle[index].textContent = `${original_title}`; 			  			
				  		} else if(original_name !== undefined){
				  			searchResultTitle[index].textContent = `${original_name}`; 
				  		}else {
				  			searchResultTitle[index].textContent = `${name}`
				  		}

				  		if (release_date !== undefined){
				  			searchResultDate[index].textContent = `${release_date}`;
				  		} else if(first_air_date !== undefined){
				  			searchResultDate[index].textContent = `${first_air_date}`;
				  		} else{
				  			searchResultDate[index].textContent = `Forte: ${known_for_department}`;
				  		}

				  		if (overview !== undefined) {
				  			searchResultDescription[index].textContent = `${overview}`;
				  		}else {
				  			if (known_for.length === 3) {
				  				searchResultDescription[index].textContent = `Featured on: ${known_for[0].original_title || known_for[0].original_name}, ${known_for[1].original_title || known_for[1].original_name}, ${known_for[2].original_title || known_for[2].original_name}`;
				  			} else if(known_for.length === 2){
				  				searchResultDescription[index].textContent = `Featured on: ${known_for[0].original_title || known_for[0].original_name}, ${known_for[1].original_title || known_for[1].original_name}`;
				  			} else if(known_for.length === 1){
				  				searchResultDescription[index].textContent = `Featured on: ${known_for[0].original_title || known_for[0].original_name}`;
				  			} else return
				  		}
				  		votePerc(index, searchRating, vote_average, searchRating, vote_count);
				  		resultQuery.textContent = `Result of ${searchValue}`;
				  		searchSection.style.animation = 'flyIn 0.7s linear forwards'
				  		if(poster_path === undefined) return;
				  		searchSection.style.background = `url('${images}${search.results[anyValue(search.results.length)].poster_path}')`;
					  	searchSection.style.backgroundSize = 'contain';
					  	searchSection.style.backgroundPosition = 'center';
			  		});
				}
	  		}
  		}
	})
}


function trendingInfo () {
	let trending = `${proxy}trending/${type}/${timeWindow}?api_key=${api_key}`;
	fetch(trending)
	  .then(response => response.json())
	  .then(data => {
		infos(trendingDiv, '#trending-section');
	  	console.log(trending)
		// timEr(data);
	  	console.log(data);
	  	// const {page} = data;
	  	// const {adult, media_type, title, overview, release_date, poster_path, vote_average} = data.results[0];

	  	container.style.background = `url('${images}${data.results[anyValue(data.results.length)].poster_path}')`;
	  	container.style.backgroundSize = 'contain';
	  	container.style.backgroundPosition = 'center';
	  	category.forEach(aCallback);
	  	function aCallback (item, index) {
		  	const {adult, media_type, title, overview, release_date, poster_path, vote_average, name, first_air_date, vote_count} = data.results[index];
		  	categoryImage[index].setAttribute('src', `${images}${poster_path}`);
		  	if (title == undefined){
		  		categoryTitle[index].textContent = name;
		  	} else{
		  		categoryTitle[index].textContent = title;
		  	}

		  	if (release_date == undefined){
		  		categoryRelease[index].textContent = first_air_date;
		  	} else{
		  		categoryRelease[index].textContent = release_date;
		  	}
		  	votePerc(index, rating, vote_average, rating);		  
		  }
	  }	);
}


function popularInfo(type){
	infos(popularDiv, '#popular-section');
	let popular = `${proxy}${type}/popular?api_key=${api_key}`;
	fetch(popular)
	.then(response => response.json())
	.then(pdata => {
	  	console.log(popular)
		console.log(pdata)
		for (var resultDivNum = 1; resultDivNum <= pdata.results.length - 3; resultDivNum++) {
			let alinks = document.createElement('a');
			alinks.classList.add('movie-link');
			alinks.setAttribute('href', '#');

			alinks.innerHTML = `
									<div class="category-movies">
							<img class="movie-image skeletonImg">
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info">
								<h4 class="movie-title"></h4>
								<p class="movie-release-date"></p>
							</div>
						</div>`
			popularDiv.appendChild(alinks);
			infos(popularDiv, '#popular-section');
			if (resultDivNum === pdata.results.length - 3) {
				category.forEach(aCallback);
				function aCallback (item, index) {
				  	const {adult, media_type, title, overview, release_date, poster_path, vote_average, name, first_air_date, vote_count} = pdata.results[index];
				  	categoryImage[index].setAttribute('src', `${images}${poster_path}`);
				  	if (title == undefined){	
				  		categoryTitle[index].textContent = name;
				  	} else{
				  		categoryTitle[index].textContent = title;
				  	}

				  	if (release_date == undefined){
				  		categoryRelease[index].textContent = first_air_date;
				  	} else{
				  		categoryRelease[index].textContent = release_date;
				  	}
				  	votePerc(index, rating, vote_average, rating);		  
				}
			}
		}	  	
	})
}

window.onload = () =>{
	Loader();
	type = 'all';
	trendingInfo();
	trendingAll.style.backgroundColor = '#120D31';
	trendingMovies.style.backgroundColor = 'transparent';
	trendingTV.style.backgroundColor = 'transparent';
	popularAll.style.backgroundColor = '#120D31';
	popularMovies.style.backgroundColor = 'transparent';
	popularTV.style.backgroundColor = 'transparent';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
	popularInfo('movie');
}

trendingAll.onclick = () =>{
		window.onload()
	}

trendingMovies.onclick = ()=>{
	type = 'movie';
	trendingInfo();
	trendingAll.style.backgroundColor = 'transparent';
	trendingMovies.style.backgroundColor = '#120D31';
	trendingTV.style.backgroundColor = 'transparent';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

trendingTV.onclick = ()=>{
	type = 'tv';
	trendingInfo();
	trendingAll.style.backgroundColor = 'transparent';
	trendingMovies.style.backgroundColor = 'transparent';
	trendingTV.style.backgroundColor = '#120D31';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}
// timeWindow = 'day';

daiilyTrending.onclick = ()=>{
	timeWindow = 'day';
	trendingInfo();
	weeklyTrending.style.backgroundColor = 'transparent';
	daiilyTrending.style.backgroundColor = '#120D31';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

weeklyTrending.onclick = ()=>{
	timeWindow = 'week';
	trendingInfo();
	daiilyTrending.style.backgroundColor = 'transparent';
	weeklyTrending.style.backgroundColor = '#120D31';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

popularAll.onclick = () =>{
		window.onload()
	}

popularMovies.onclick = ()=>{
	type = 'movie';
	popularInfo('movie');
	popularAll.style.backgroundColor = 'transparent';
	popularMovies.style.backgroundColor = '#120D31';
	popularTV.style.backgroundColor = 'transparent';
}

popularTV.onclick = ()=>{
	type = 'tv';
	popularInfo('tv');
	popularAll.style.backgroundColor = 'transparent';
	popularMovies.style.backgroundColor = 'transparent';
	popularTV.style.backgroundColor = '#120D31';
}