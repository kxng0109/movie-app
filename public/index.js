// import * as variable from "./variables.js";

for (var k = 0; k < 17; k++) {
	load();
}
dailyTrending.style.backgroundColor = '#120D31';

window.onscroll = () =>{
	counter = window.scrollY;//used to be container.scrollTop
	if (counter >= 200) {
		popularSection.style.animation = 'comeIn 0.5s linear forwards'
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
		loadingCircles[index].style.bottom = '-10vh';
	});
	container.style.overflowY = 'hidden';
	loading.style.display = 'inline-flex';
	loadingText.style.animation = 'textFadeIn 1.5s forwards';
	loadingCircles[0].style.animation = 'loadingFlyIn 2.5s infinite';
	loadingCircles[1].style.animation = 'loadingFlyIn 2.5s 0.08s infinite';
	loadingCircles[2].style.animation = 'loadingFlyIn 2.5s 0.16s infinite';
	let myFunc = () =>{
		container.style.overflowY = 'scroll';
		loading.style.display = 'none';
		loadingText.style.animation = '';
		loadingCircles.forEach((element, index) =>{
			loadingCircles[index].style.animation = '';
		});
	}
	value === undefined ? value = 2500 : value;
	var numeric = value;
	value = undefined
	const ANINTERVAL = setTimeout(myFunc, numeric);
}

// let everyLink = document.querySelectorAll('a');
// everyLink.forEach( function(element, index) {
// 	everyLink[index].addEventListener('click', Loader);
// });


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

let possibilities = (index, first, second, circular, title, date, images, poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department) =>{
	if (typeof profile_path === 'undefined') {
		circular[index].style.display = 'none';
		first[index].style.display = 'none';
		if (poster_path === undefined || poster_path === null) {
			second[index].style.height = '195px';
			second[index].setAttribute('alt', `${original_title}`);
		} else{
			second[index].setAttribute('src', `${images}${size}${poster_path}`);					  			
		}
	}else if(profile_path !== null) {
		first[index].setAttribute('src', `${images}${size}${profile_path}`);
		first[index].style.display = 'block';
		second[index].style.display = 'none';
		circular[index].style.display = 'block';
	} else{
		first[index].setAttribute('src', `images/photo1.webp`);
		first[index].style.display = 'block';
		second[index].style.display = 'none';
		circular[index].style.display = 'block';
	}

	if (original_title !== undefined) {
		title[index].textContent = `${original_title}`; 			  			
	} else if(original_name !== undefined){
		title[index].textContent = `${original_name}`; 
	}else {
		title[index].textContent = `${name}`
	}

	if (release_date !== undefined){
		date[index].textContent = `${release_date}`;
	} else if(first_air_date !== undefined){
		date[index].textContent = `${first_air_date}`;
	} else{
		date[index].textContent = `Forte: ${known_for_department}`;
	}

	if(poster_path === undefined) return;
}


function load () {
	let links = document.createElement('a');
	links.classList.add('movie-link');
	links.setAttribute('href', '#');

	links.innerHTML = `
							<div class="category-movies">
							<img class="category-image skeletonImg">
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
			searchAll.style.backgroundColor = '#120D31';
			searchMovies.style.backgroundColor = 'transparent';
			searchTV.style.backgroundColor = 'transparent';
			searchPeople.style.backgroundColor = 'transparent';
			searching('multi', 1);
		} else{
			alert('Please write something.')//change this
		}
	}
})
		// searchInput.forEach((item, index) =>{
		// 	searchValue[index] = searchInput[index].value;
		// 	return searchValue;
		// });
let searching = (thetype, page_no) =>{
	page_no = 1;
	type = thetype;
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
				let searchCircular = qSA('.circular-portrait');
				if (resultDivNum === search.results.length) {
			  		searchDiv.forEach((item, index) =>{
				  		const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = search.results[index];

				  		possibilities(index, searchResultPerson, searchImage, searchCircular, searchResultTitle, searchResultDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
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
				  		searchSection.style.background = `url('${images}${size}${search.results[anyValue(search.results.length)].poster_path}')`;
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
		trendingDiv.scrollTo({left: 0, behavior: 'smooth'});
		console.log(data)
		// timEr(data);
	  	// const {page} = data;
	  	// const {adult, media_.type, title, overview, release_date, poster_path, vote_average} = data.results[0];

	  	size = 'w400/'
	  	container.style.background = `url('${images}${size}${data.results[anyValue(data.results.length)].poster_path}')`;
	  	container.style.backgroundSize = 'cover';
	  	container.style.backgroundPosition = 'center';
	  	container.style.backgroundRepeat = 'no-repeat';
	  	size = 'w200/';
	  	category.forEach(aCallback);
	  	function aCallback (item, index) {
		  	const {adult, media_type, title, overview, release_date, poster_path, vote_average, name, first_air_date, vote_count, id} = data.results[index];
		  	categoryImage[index].setAttribute('src', `${images}${size}${poster_path}`);
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
		  	category[index].onclick = () => {
		  		const tempInfo = `${proxy}/${media_type}/${id}`;
		  		localStorage.setItem('moreInfo', tempInfo);
		  		window.location.replace('./moreinfo.html');
		  		// setTimeout(categoryinfo(id, media_type), 3000);
		  		// setTimeout(Loader, 100);
		  	}
		  }
	  }	);
}


function popularInfo(type){
	var popularPersonImage;
	var popularCircular;
	let popular = `${proxy}${type}/popular?api_key=${api_key}`;
	fetch(popular)
	.then(response => response.json())
	.then(pdata => {
	infos(popularDiv, '#popular-section');
	popularDiv.scrollTo({left: 0, behavior: 'smooth'});
		// console.log(pdata);
		var resultDivNum;
		if (category.length === pdata.results.length){
			category.forEach( function(element, index) {
				popularDiv.removeChild(category[index]);
			});
		}
		for (var resultDivNum = 1; resultDivNum <= pdata.results.length; resultDivNum++) {
			let alinks = document.createElement('a');
			alinks.classList.add('movie-link');
			alinks.setAttribute('href', '#');

			alinks.innerHTML = `
									<div class="category-movies">
							<img class="category-image skeletonImg">
							<div class="popular-circular-portrait">
								<img src=""class="popular-person-image">
							</div>
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info">
								<h4 class="movie-title"></h4>
								<p class="movie-release-date"></p>
							</div>
						</div>`
			popularDiv.appendChild(alinks);
			infos(popularDiv, '#popular-section');
			popularPersonImage = qSA('.popular-person-image');
			popularCircular = qSA('.popular-circular-portrait');
			if(category.length === 20){
				category.forEach(aCallback);
				function aCallback (item, index) {
				  	const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = pdata.results[index];
				  	possibilities(index, popularPersonImage, categoryImage, popularCircular, categoryTitle, categoryRelease, images, poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
				  	votePerc(index, rating, vote_average, rating);
				  	if (type === 'person') {
				  		category[index].style.height = '300px';
				  		categoryInfo[index].style.top = '200px'
				  	}
				}
			}
		}
	})
}

window.onload = () =>{
	// value = 3800;
	// Loader();
	type = 'all';
	trendingInfo();
	trendingAll.style.backgroundColor = '#120D31';
	trendingMovies.style.backgroundColor = 'transparent';
	trendingTV.style.backgroundColor = 'transparent';
	popularMovies.style.backgroundColor = '#120D31';
	popularTV.style.backgroundColor = 'transparent';
	popularPeople.style.backgroundColor = 'transparent';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
	popularInfo('movie');
	welcomeUsername.textContent = `Welcome ${username}`;
	hoverUsername.textContent = `${username}`;
	let welcomeUser = () => {
		welcomeUsername.style.display = 'block';
		welcomeUsername.style.animation = 'welcomeUsername 8s linear';
		let welcomeUserDelete = () =>{
			welcomeUsername.style.display = 'none';
		}
		setTimeout(welcomeUserDelete, 8000);
	}
	setTimeout(welcomeUser, 4000);
}

trendingAll.onclick = () =>{
	// Loader();
	type = 'all';
	trendingInfo();
	trendingAll.style.backgroundColor = '#120D31';
	trendingMovies.style.backgroundColor = 'transparent';
	trendingTV.style.backgroundColor = 'transparent';
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

dailyTrending.onclick = ()=>{
	timeWindow = 'day';
	trendingInfo();
	weeklyTrending.style.backgroundColor = 'transparent';
	dailyTrending.style.backgroundColor = '#120D31';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

weeklyTrending.onclick = ()=>{
	timeWindow = 'week';
	trendingInfo();
	dailyTrending.style.backgroundColor = 'transparent';
	weeklyTrending.style.backgroundColor = '#120D31';
	trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

popularMovies.onclick = () =>{
		window.onload()
	}

popularTV.onclick = ()=>{
	popularInfo('tv');
	popularMovies.style.backgroundColor = 'transparent';
	popularTV.style.backgroundColor = '#120D31';
	popularPeople.style.backgroundColor = 'transparent';
}

popularPeople.onclick = ()=>{
	popularInfo('person');
	popularMovies.style.backgroundColor = 'transparent';
	popularTV.style.backgroundColor = 'transparent';
	popularPeople.style.backgroundColor = '#120D31';
}

searchAll.onclick = () =>{
	searching('multi', 1);
	searchAll.style.backgroundColor = '#120D31';
	searchMovies.style.backgroundColor = 'transparent';
	searchTV.style.backgroundColor = 'transparent';
	searchPeople.style.backgroundColor = 'transparent';
}

searchMovies.onclick = () =>{
	searching('movie', 1);
	searchAll.style.backgroundColor = 'transparent';
	searchMovies.style.backgroundColor = '#120D31';
	searchTV.style.backgroundColor = 'transparent';
	searchPeople.style.backgroundColor = 'transparent';
}

searchTV.onclick = () =>{
	searching('tv', 1);
	searchAll.style.backgroundColor = 'transparent';
	searchMovies.style.backgroundColor = 'transparent';
	searchTV.style.backgroundColor = '#120D31';
	searchPeople.style.backgroundColor = 'transparent';
}

searchPeople.onclick = () =>{
	searching('person', 1);
	searchAll.style.backgroundColor = 'transparent';
	searchMovies.style.backgroundColor = 'transparent';
	searchTV.style.backgroundColor = 'transparent';
	searchPeople.style.backgroundColor = '#120D31';
}