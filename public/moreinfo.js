// 'use strict'
categoryImage = qSA('.image');
rating = qS('#avnumber');
categoryTitle = qS('#movieTitle');
categoryRelease = qS('#release-date');
categoryInfo = qS('#overview');
Genre = qS('#genre');
Status = qS('#status');
voteCount = qS('#vcnumber');
Duration = qS('#dvalue');
tagLine = qS('#tagline');
backGround = qS('#background');
overview = qS('#overview');
const cast = qS('#cast');
let castImages, castRealName, castName, eachCast, hour, minute;
let eachLanguage = qS('#each-language');
let revenue = qS('#revenue');
let budget = qS('#budget');
const backToBegin = qS('#back-to-begin');
let genreHeader = qS('#genre--header');
let languagesSpokenHeader = qS('#languages-spoken--header');
let releaseDateHeader = qS('#release-date--header');
let recommendationsHeader = qS('.recommendations--header');
let productionCompaniesContainer = qS('#production-companies--container');
let budgetAndRevenueDiv = qS('.budget-revenue-div');
let castParentDiv = qS('#casts--parent-div');
let recommendationsParentDiv = qS('#recommendations-parent-div');
let episodeAndSeason = qS('#episode-and-season');
var recommendationsDiv;
let quickinfo1 = qS('#quickinfo1');

let moreInfoVotePerc = (vote_average, rating, vote_count) =>{
	if (vote_average === undefined) {
		rating.style.display = 'none';
		rating.textContent = '';
	}else{
		if (vote_count !== 0) {
			ratingPercent = parseInt((vote_average * 10));
			rating.textContent = ratingPercent + '%';	
			if (ratingPercent >= 80) {
		  		rating.style.color = "hsl(120, 100%, 35%)";
		  	} else if (ratingPercent >= 50) {
		  		rating.style.color = "hsl(66, 100%, 35%)";
		  	} else {
		  		rating.style.color = "hsl(0, 100%, 35%)";
		  	}
		} else{
			rating.textContent = 'N/A';
		}
	}
}


//Converts into hours and minutes
let durationConversion = (rawDuration, episodeDuration) =>{
	switch (true) {
		case typeof rawDuration === 'number':			
			hour = Math.floor(rawDuration / 60);
			minute = (rawDuration % 60) <= 10 ? `0${rawDuration % 60}` : (rawDuration % 60);
			return `${hour}:${minute}`;
		break;

		case episodeDuration != undefined || episodeDuration != null:
			hour = Math.floor(episodeDuration[0] / 60);
			minute = (episodeDuration[0] % 60)  <= 10 ? `0${episodeDuration[0] % 60}` : (episodeDuration[0] % 60);
			return `${hour}:${minute}`;
		break;
		default:
			return '--:--'
		break;
	}
}

//Since it could be a movie or tv show, the api will either return name or title, 
//so it's just to check for which is available and assign it
let showTheNameOfMovieOrTv = (title, original_title, name, original_name) =>{
	return title ? title 
	: original_title ? original_title 
	: name ? name : original_name;
}

//It creates a new array that is sort of a mapped version of the array
//and a comma and whitespace to the end of the element
//or return that element if it's the last in the array
let addComma = array =>{
	let arrayLength = array.length;
	let updatedArray = [];
	array.forEach((item, index) =>{
		if (index < arrayLength - 1) {
			updatedArray[index] = `${array[index]}, `
		} else {
			updatedArray[index] = array[index]
		}
	})
	return updatedArray.join('')
}


var theCategory, theCategoryInfo, theCategoryCredit, callRecommendations;
//Calls the API and receives evey info about the movie and assigns them
function categoryinfo () {
	fetch(theCategoryInfo)
	.then(response => response.json())
	.then(data =>{		
		switch (true) {
			case theCategory.includes('//person'): //Checks whether '//person' is in the theCategory's text
				console.log(data);
				const{also_known_as, biography, birthday, deathday, known_for_department, place_of_birth, profile_path} = data
				var{name} = data; //Using var because it shows issue of the 'name' variable being declared already;
				// get images = ${theCategory}/images?api_key=${api_key}
			break;
			default:
				quickinfo1.style.display = 'flex';
				budgetAndRevenueDiv.style.display = 'grid';
				castParentDiv.style.display = 'block';
				recommendationsHeader.style.display = 'block';

				const{backdrop_path, belongs_to_collection, budget, episode_run_time, genres, homepage, id, last_air_date, number_of_episodes, number_of_seasons, original_title, original_name, overview, poster_path, production_companies, production_countries, spoken_languages, status, release_date, revenue, tagline, title, vote_average, vote_count, runtime} = data;
				var {name} = data;

				//Replaces the title of the wepbage with the title of the movie or tv show
				document.title = `${showTheNameOfMovieOrTv(title, original_title, name, original_name)}`;

				//Gets and shows the episde and season number
				episodeAndSeason.textContent = `Currently on S${number_of_seasons} E${number_of_episodes}`
				if (typeof number_of_episodes == 'number') {episodeAndSeason.style.display = 'block'};

				//Maps over the spoken_language array from the api and calls a function which gets it's result and displays it
				let spokenLanguagesName = spoken_languages.map(item =>item.english_name);
				eachLanguage.textContent = `${addComma(spokenLanguagesName)}`;
				languagesSpokenHeader.textContent = spoken_languages.length > 1 ? 'Languages Spoken:' : 'Language Spoken:';

				//Displays the vote percentage and also calls moreInfoVotePerc() to assign th eright text color
				moreInfoVotePerc(vote_average, rating, vote_count);
				voteCount.textContent = vote_count;

				//calls durationConversion which converts the runtime into hours and minutes
				Duration.textContent = durationConversion(runtime, episode_run_time);
				
				//Calls the function to check for whichever one is available and makes them the title
				categoryTitle.textContent = showTheNameOfMovieOrTv(title, original_title, name, original_name)

				//If release_date is available it'll show 'released' for that movie if not 'last aired on'  for tv shows
				//Also does the same thing for the date it was released or last aired on
				releaseDateHeader.textContent = release_date ? 'Released:' : 'Last aired on:';
				categoryRelease.textContent = release_date ? release_date : last_air_date;

				tagLine.textContent = `...${tagline}....`;

				categoryImage.forEach((element, index) =>{
					size = 'w400';
					categoryImage[index].setAttribute('src', `${images}${size}${poster_path}`);
				});

				// Status.textContent = `Status: ${status}`;
				//What i did here is similar to addComma() but kinda much stressful
				genreHeader.textContent = genres.length > 1 ? 'Genres:' : 'Genre:'
				let theGenres = '';
				 genres.forEach((element, index) =>{
				 	if (genres.length > 1) {
						if (index === genres.length - 1) {
							theGenres += genres[index].name + '.';
						}else{					
							theGenres += genres[index].name + ', ';
						}
					}else {
						theGenres += genres[index].name;
					}
				})
				Genre.textContent = `${theGenres}`;

				size = 'w200'
				//Shows the comapnies that produced the films
				let mappedProductionName = production_companies.map(item => item.name)
				let mappedProductionImage = production_companies.map(item => `${images}${size}${item.logo_path}`)
				mappedProductionName.forEach((item, index) =>{
					loadCompanies(mappedProductionImage[index], mappedProductionName[index])
				})
				productionCompaniesContainer.style.display = mappedProductionName ? 'grid' : 'none'

				size = 'w300';
				backGround.style.background = `url('${images}${size}${backdrop_path}') no-repeat center`;
				backGround.style.backgroundSize = 'cover';
				this.overview.textContent = overview;//This is confusing, this,overview is the variable I made, overview is the destructured variable
				
				if (budget == undefined || revenue == undefined) {
					budgetAndRevenueDiv.style.display = 'none'
				}
				this.budget.textContent = `$${budget}`;
				this.revenue.textContent = `$${revenue}`;
	
				//Look for recommendations
				recommendations()
				recommendationsHeader.style.display = 'block';

				//Fetch the cast, the no parameter is to tell the function to 
				//display a maximum of 15 casts when callling the function
				fetchCast('no');
			break;
		}
	});
}

//Create html elements for the production companies
let loadCompanies = (imageSrc, companyName) =>{
	let eachProductionCompanyDiv = document.createElement('div');
	eachProductionCompanyDiv.classList.add('each-production-company-div');
	let productionCompanyImage = document.createElement('img');
	imageSrc.includes('null') ? '' : productionCompanyImage.setAttribute('src', imageSrc);
	productionCompanyImage.classList.add('production-companies--image');
	let productionCompanyName = document.createElement('p');
	productionCompanyName.textContent = companyName;
	productionCompanyName.classList.add('production-companies--name');
	eachProductionCompanyDiv.appendChild(productionCompanyImage);
	eachProductionCompanyDiv.appendChild(productionCompanyName);
	productionCompaniesContainer.appendChild(eachProductionCompanyDiv);
}


//To fetch the casts of the movie/tv show
function fetchCast(more){
	fetch(theCategoryCredit)
	.then(response => response.json())
	.then(data =>{
		// console.log(data);

		switch (more === 'no') {//If the user clicks "load more" or not in the casts place
			case false:
				for (var i = 15; i <= data.cast.length - 1; i++) {
					eachCast[i].style.display = 'block';
				}
				qS('.more').style.display = 'none';
			break;
			default:
				data.cast.forEach( (element, index) =>{
					const{name, character, profile_path} = data.cast[index];
					createCastsTemplate();
					castImages = qSA('.cast-members-img');
					castRealName = qSA('.cast-real-name');
					castName = qSA(".cast-name");
					eachCast = qSA('.eachCast');
					size = 'w200';
					switch (profile_path === null || profile_path === undefined) {
						case false:
							castImages[index].setAttribute('src',  `${images}${size}${profile_path}`);
						break;
						default:
							castImages[index].setAttribute('src',  `./images/photo1.webp`);
						break;
					}
					castRealName[index].textContent = name;
					castName[index].textContent = character;
				});

				if (data.cast.length > 15) {
					loadMoreCasts();
					for (var i = 15; i <= data.cast.length - 1; i++) {
						eachCast[i].style.display = 'none';
					}
				}
			break;
		}
	});
};

let loadMoreCasts = () =>{
	let moreDiv = document.createElement('div');
	let moreP = document.createElement('p');
	let forwardIconMore = document.createElement('ion-icon');
	forwardIconMore.setAttribute('name', 'chevron-forward-outline');
	// moreA.setAttribute('href', '#');
	moreP.textContent = 'Load more';
	moreP.classList.add('more-link');
	moreDiv.appendChild(moreP);
	moreDiv.appendChild(forwardIconMore);
	moreDiv.classList.add('more');
	cast.appendChild(moreDiv);
	let moreCast = qS('.more-link'); 
	moreCast.onclick = () => fetchCast('yes');
}


cast.onscroll = () =>{
	switch (cast.scrollLeft >= 150){
		case true:
		backToBegin.style.display = 'block';
		break;

		default:
		backToBegin.style.display = 'none';
		break;
	}
}

backToBegin.onclick = () =>{
	cast.scrollTo({left: 0, behavior: 'smooth'});
}

// To add the basic templates for the casts section
function createCastsTemplate(){
	let outerDiv = document.createElement('div');
	outerDiv.classList.add('eachCast');
	let aTag = document.createElement('a');
	aTag.setAttribute('href', 'javascript:void');
	let anImg = document.createElement('img');
	anImg.classList.add('cast-members-img');
	anImg.setAttribute('loading', 'lazy')
	let innerDiv = document.createElement('div');
	innerDiv.classList.add('cast-info')
	let firstP = document.createElement('p');
	firstP.classList.add('cast-real-name');
	let secondP = document.createElement('p');
	secondP.classList.add('cast-name');
	outerDiv.appendChild(aTag);
	outerDiv.appendChild(innerDiv);
	aTag.appendChild(anImg);
	innerDiv.appendChild(firstP);
	innerDiv.appendChild(secondP);
	cast.appendChild(outerDiv);
}


//Look for recommendations
let recommendations = () =>{
	fetch(callRecommendations)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		data.results.forEach((item, index) =>{
			const{id, media_type, name, title, original_name, original_title, poster_path, vote_average, vote_count} = data.results[index];
			let recommendationLink = `${proxy}/${media_type}/${id}`
			let posterImage = `${images}${size}${poster_path}`;

			recommendationTemplate(title, original_title, name, original_name, posterImage, index, vote_average, media_type);
			if (recommendationsDiv == undefined || recommendationsDiv == null) return
				recommendationsDiv[index].onclick = () =>{
				localStorage.setItem('moreInfo', recommendationLink)
				window.location.reload();
			}
		})
	})
}

let recommendationTemplate = (title, original_title, name, original_name, posterImage, index, vote_average, media_type) =>{
	let links = document.createElement('a');
	links.classList.add('movie-link');
	links.setAttribute('href', 'javascript:void(0)');

	links.innerHTML = `
							<div class="category-movies recommendations-div">
							<img class="category-image skeletonImg" loading='lazy' src=${posterImage} alt='recommeded ${media_type}'>
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info recommendationsTitleAndDate">
								<h4 class="movie-title headings">${showTheNameOfMovieOrTv(title, original_title, name, original_name)}</h4>
							</div>
						</div>`
	recommendationsParentDiv.appendChild(links);
	recommendationsDiv = qSA('.recommendations-div');
	rating = qSA('.rating');
	ratingBg = qSA('.rating-bg');
	votePerc(index, rating, vote_average);
}


window.onload = () =>{
	theCategory = localStorage.getItem('moreInfo');
	theCategoryInfo = `${theCategory}?api_key=${api_key}`;
	theCategoryCredit = `${theCategory}/credits?api_key=${api_key}`;
	callRecommendations = `${theCategory}/recommendations?api_key=${api_key}&page=1`
	categoryinfo();
	backToBegin.style.display = 'none';
}