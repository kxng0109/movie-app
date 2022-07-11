// import * as variable from "./variables.js";
dailyTrending.style.backgroundColor = '#120D31';

window.onscroll = () =>{
	counter = window.scrollY;//used to be container.scrollTop
	if (counter >= 200) {
		popularSection.style.animation = 'comeIn 0.5s linear forwards'
	}
	return counter;
}

fetch(`${proxy}discover/movie?api_key=${api_key}`)
.then(res =>res.json())
.then(data => console.log(data))

console.log()

let timeOfDay = new Date().getHours();
welcomeText.textContent = timeOfDay > 16 ? 'Good Evening!' : timeOfDay > 12 ? 'Good Afternoon!' : 'Good Morning!';


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
										<img class="category-image skeletonImg" loading='lazy' src="./images/grey.webp" alt="trending movies images">
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
							<img class="category-image skeletonImg" loading="lazy" src="./images/grey.webp" alt="popular movies images">
							<img src="./images/photo1.webp" class="popular-person-image">
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
			index = resultDivNum;
		  	const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path, id} = data.results[index];
		  	possibilities(index, popularPersonImage, categoryImage, categoryTitle, categoryRelease, images, poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
		  	votePerc(index, rating, vote_average);
		}
	})
}

//Changes items background colors
let changeBackgroundColor = (coloured, transparent1, transparent2, transparent3) =>{
	coloured.style.backgroundColor = '#120D31';
	transparent1.style.backgroundColor = 'transparent';
	transparent2 == undefined || transparent2 == null ? '' : transparent2.style.backgroundColor = 'transparent';
	transparent3 == undefined || transparent3 == null ? '' : transparent3.style.backgroundColor = 'transparent';
}

window.onload = () =>{
	type = 'all';
	trendingInfo();
	changeBackgroundColor(trendingAll, trendingMovies, trendingTV);
	changeBackgroundColor(popularMovies, popularTV, popularPeople);
	popularInfo('movie');
}

trendingAll.onclick = () =>{
	// Loader();
	type = 'all';
	trendingInfo();
	changeBackgroundColor(trendingAll, trendingMovies, trendingTV);
}

trendingMovies.onclick = ()=>{
	type = 'movie';
	trendingInfo();
	changeBackgroundColor(trendingMovies, trendingAll, trendingTV);
}

trendingTV.onclick = ()=>{
	type = 'tv';
	trendingInfo();
	changeBackgroundColor(trendingTV, trendingMovies, trendingAll);
}

dailyTrending.onclick = ()=>{
	timeWindow = 'day';
	trendingInfo();
	weeklyTrending.style.backgroundColor = 'transparent';
	dailyTrending.style.backgroundColor = '#120D31';
	changeBackgroundColor(dailyTrending, weeklyTrending);
}

weeklyTrending.onclick = ()=>{
	timeWindow = 'week';
	trendingInfo();
	changeBackgroundColor(weeklyTrending, dailyTrending);
}

popularMovies.onclick = () =>{	
	popularInfo('movie');
	changeBackgroundColor(popularMovies, popularTV, popularPeople);
}

popularTV.onclick = ()=>{
	popularInfo('tv');
	changeBackgroundColor(popularTV, popularMovies, popularPeople);
}

popularPeople.onclick = ()=>{
	popularInfo('person');
	changeBackgroundColor(popularPeople, popularTV, popularMovies);
}