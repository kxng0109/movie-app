// import * as variable from "./variables.js";
dailyTrending.style.backgroundColor = '#120D31';

window.onscroll = () =>{
	counter = window.scrollY;//used to be container.scrollTop
	if (counter >= 200) {
		popularSection.style.animation = 'comeIn 0.5s linear forwards'
	}
	return counter;
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


qSA('.section-link').onclick = (e) =>{
	for (let count2 = 0; count2 < qSA('.section-link').length - 1; count2++) {
			e.preventDefault();
		container.scrollTop = counter;
	}
}


function trendingInfo () {
	let trending = `${proxy}trending/${type}/${timeWindow}?api_key=${api_key}`;
	fetch(trending)
	 .then(response => response.json())
	 .then(data => {
	 	category = trendingDiv.querySelectorAll('.movie-link');

	 	//IF the length of category is 3(because we already rendered three of them in the html file)
	 	//, then add 17(or so) more to it
	 	if (category.length === 3) {
			for (var k = 0; k < data.results.length - 3; k++) {
				let links = document.createElement('a');
				links.classList.add('movie-link');

				links.innerHTML = `
										<div class="category-movies">
										<img class="category-image skeletonImg" loading='lazy'>
										<p class="rating">N/A</p>
										<div class="rating-bg"></div>
										<div class="movie-first-info">
											<h4 class="movie-title headings"></h4>
											<p class="movie-release-date"></p>
										</div>
									</div>`
				trendingDiv.appendChild(links);
			}
	 	}

		infos(trendingDiv, '#trending-section');
		trendingDiv.scrollTo({left: 0, behavior: 'smooth'});

		//Add a background image
	  	size = 'w400/'
	  	homePageBackground.style.background = `url('${images}${size}${data.results[anyValue(data.results.length)].poster_path}')`;
	  	homePageBackground.style.backgroundSize = 'cover';
	  	homePageBackground.style.backgroundPosition = 'center';
	  	homePageBackground.style.backgroundRepeat = 'no-repeat';

		category.forEach((item, index) =>{
			category[index].setAttribute('href', `./moreinfo.html?${data.results[index].media_type}/${data.results[index].id}`);
		  	size = 'w200/';
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
		  	votePerc(index, rating, vote_average);
		})
	})
}


function popularInfo(type){
	var popularPersonImage;
	var popularCircular;
	let popular = `${proxy}${type}/popular?api_key=${api_key}`;
	fetch(popular)
	.then(response => response.json())
	.then(data => {
		infos(popularDiv, '#popular-section');
		popularDiv.scrollTo({left: 0, behavior: 'smooth'});
		
		var resultDivNum;
		if (category.length === data.results.length){
			category.forEach( function(element, index) {
				popularDiv.removeChild(category[index]);
			});
		}
		for (var resultDivNum = 0; resultDivNum <= data.results.length - 1; resultDivNum++) {
			let alinks = document.createElement('a');
			alinks.classList.add('movie-link');
			alinks.setAttribute('href', `./moreinfo.html?${type}/${data.results[resultDivNum].id}`);

			alinks.innerHTML = `
									<div class="category-movies popular">
							<img class="category-image skeletonImg" loading="lazy">
							<div class="popular-circular-portrait">
								<img src=""class="popular-person-image">
							</div>
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info">
								<h4 class="movie-title headings"></h4>
								<p class="movie-release-date"></p>
							</div>
						</div>`
			popularDiv.appendChild(alinks);
			popular = qSA('.popular')
			infos(popularDiv, '#popular-section');
			popularPersonImage = qSA('.popular-person-image');
			popularCircular = qSA('.popular-circular-portrait');
			index = resultDivNum
		  	const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path, id} = data.results[index];
		  	possibilities(index, popularPersonImage, categoryImage, popularCircular, categoryTitle, categoryRelease, images, poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
		  	votePerc(index, rating, vote_average);
		  	if (type === 'person') {
		  		category[index].style.height = '300px';
		  		categoryInfo[index].style.top = '200px'
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
	// trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

trendingTV.onclick = ()=>{
	type = 'tv';
	trendingInfo();
	trendingAll.style.backgroundColor = 'transparent';
	trendingMovies.style.backgroundColor = 'transparent';
	trendingTV.style.backgroundColor = '#120D31';
	// trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}
// timeWindow = 'day';

dailyTrending.onclick = ()=>{
	timeWindow = 'day';
	trendingInfo();
	weeklyTrending.style.backgroundColor = 'transparent';
	dailyTrending.style.backgroundColor = '#120D31';
	// trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

weeklyTrending.onclick = ()=>{
	timeWindow = 'week';
	trendingInfo();
	dailyTrending.style.backgroundColor = 'transparent';
	weeklyTrending.style.backgroundColor = '#120D31';
	// trendingDiv.style.animation = 'fakeLoading 1s linear forwards running';
}

popularMovies.onclick = () =>{	
	popularInfo('movie');
	popularMovies.style.backgroundColor = '#120D31';
	popularTV.style.backgroundColor = 'transparent';
	popularPeople.style.backgroundColor = 'transparent';
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