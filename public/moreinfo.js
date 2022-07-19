'use strict'
var theCategory, theCategoryInfo, theCategoryCredit, callRecommendations;
categoryImage = qS('.image');
rating = qS('#avnumber');
categoryTitle = qS('#movieTitle');
categoryRelease = qS('#release-date');
theOverview = qS('#overview');
theGenre = qS('#genre');
Status = qS('#status');
voteCount = qS('#vcnumber');
theDuration = qS('#dvalue');
tagLine = qS('#tagline');
backGround = qS('#background');
const cast = qS('#cast');
let castsHeader = qS('#casts--header');
let castImages, castRealName, castName, eachCast, hour, minute;
let eachLanguage = qS('#each-language');
let theRevenue = qS('#revenue');
let theBudget = qS('#budget');
const backToBegin = qS('#back-to-begin');
let genreHeader = qS('#genre--header');
let languagesSpokenHeader = qS('#languages-spoken--header');
let releaseDateHeader = qS('#release-date--header');
let recommendationsHeader = qS('.recommendations--header');
let productionCompaniesContainer = qS('#production-companies--container');
let budgetAndRevenueDiv = qS('.budget-revenue-div');
let budgetContainer = qS('#budget--container');
let revenueContainer = qS('#revenue--container');
let castParentDiv = qS('#casts--parent-div');
let recommendationsParentDiv = qS('#recommendations-parent-div');
let episodeAndSeason = qS('#episode-and-season');
var recommendationsDiv;
let quickInfo = qS('#quickinfo')
let quickInfoPerson = qS('#quickinfoperson');
let alsoKnowsAs = qS('#also-known-as');
let theBirthday = qS('.birthday')
let placeOfBirthDiv = qS('.place-of-birth-div')
let placeOfBirth = qS('.place-of-birth')
let dateOfDeathDiv = qS('.date-of-death-div')
let dateOfDeath = qS('.date-of-death');
let biographyContainer = qS('.biography--container');
let largeScreenNavRecommendedCasts = qS('.large-screen-nav--recommended-casts');
let largeScreenNavRecommendedText = qS('.large-screen-nav--recommended-text');
let likedHistory;

window.onload = () =>{
	//Split the url query into an array when it sees this "="
	let splitQuery = window.location.search.split("?"); //example of what is returned ['', 'movie/338953']
	theCategory = `${proxy}${splitQuery[1]}`;
	theCategory.includes('person') ? (quickInfo.style.display = 'none', castParentDiv.style.display = 'none', castsHeader.textContent = 'Featured In:') : castsHeader.textContent = 'Casts';
	theCategoryInfo = `${theCategory}?api_key=${api_key}`;
	likedHistory =  JSON.parse(localStorage.getItem('liked')) || [];	
	let theQuery = likedHistory.map(element => element.link);
	likeBtn.forEach(item => item.style.fill = theQuery.includes(theCategory) ? '#ef4444' : 'transparent');
	categoryinfo();
	//If we are loading a persons details, then use that instead use the other one to load the casts of the movie or tv show
	theCategoryCredit = theCategory.includes('person') ? `${theCategory}/combined_credits?api_key=${api_key}` : `${theCategory}/credits?api_key=${api_key}`;
	callRecommendations = theCategory.includes('person') ? `${theCategory}/images?api_key=${api_key}`: `${theCategory}/recommendations?api_key=${api_key}&page=1`
	backToBegin.style.display = 'none';
}

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

//Calls the API and receives evey info about the movie and assigns them
function categoryinfo () {
	fetch(theCategoryInfo)
	.then(response => response.json())
	.then(data =>{
		switch (true) {
			case theCategory.includes('person'): //Checks whether '//person' is in the theCategory's text
				//NOTE: Most of the time, 'cast' represents an information about the person
				quickInfo.style.display = 'none';
				categoryTitle = qS('#name');
				categoryImage = qS('#moreinfo-person-image');
				theOverview = qS('#biography');
				tagLine = qS('#forte');

				const{also_known_as, biography, birthday, deathday, known_for_department, place_of_birth, profile_path} = data
				var{name} = data; //Using var because it shows issue of the 'name' variable being declared already;

				document.title = `${name}`;
				quickInfoPerson.style.display = 'block';
				size = 'w400';
				categoryImage.setAttribute('src', `${images}${size}${profile_path}`);
				profile_path ? (categoryImage.onclick = () => window.open(`${images}original${profile_path}`), categoryImage.style.cursor = 'pointer') : '';
				size = 'w200';

				backGround.style.backgroundColor = '#DAB894';/*hsl(178deg, 100%, 95%)*/
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					backGround.style.background = '';
				}
				backGround.classList.add('dark:bg-greenishblue-900');
				main.style.backgroundColor = 'transparent';
				categoryTitle.textContent = `${name}`;

				alsoKnowsAs.textContent = `${addComma(also_known_as)}`;

				theOverview.textContent = `${biography}`;
				tagLine.textContent = `Forte: ${known_for_department}`;

				theBirthday.innerHTML = birthday;
				place_of_birth != undefined || place_of_birth != null ? (placeOfBirthDiv.style.display = 'block', placeOfBirth.textContent = `${place_of_birth}`)
				: placeOfBirthDiv.style.display = 'none';

				deathday != undefined || deathday != null ? (dateOfDeathDiv.style.display = 'block', dateOfDeath.textContent = `${deathday}`)
				: dateOfDeathDiv.style.display = 'none';

				castParentDiv.style.display = 'block';
				fetchCast('no');

				biographyContainer.onclick = () =>{
					biographyContainer.classList.toggle('truncate');
				}

				largeScreenNavRecommendedCasts.textContent = 'Featured In';
				largeScreenNavRecommendedText.textContent = `Images`;

				//Get other images of the person, use recommendations() in order to reuse code and reduce file size
				recommendations('person', name);

				if (profile_path == null || profile_path == undefined) return
				// get images = ${theCategory}/images?api_key=${api_key}
			break;

			default:
				quickInfoPerson.style.display = 'none';

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
				theDuration.textContent = durationConversion(runtime, episode_run_time);
				
				//Calls the function to check for whichever one is available and makes them the title
				categoryTitle.textContent = showTheNameOfMovieOrTv(title, original_title, name, original_name)

				//If release_date is available it'll show 'released' for that movie if not 'last aired on'  for tv shows
				//Also does the same thing for the date it was released or last aired on
				releaseDateHeader.textContent = release_date ? 'Released:' : 'Last aired on:';
				categoryRelease.textContent = release_date ? release_date : last_air_date;

				tagline ? tagLine.textContent = `...${tagline}....`: tagLine.display = 'none';

				size = 'w400';
				poster_path ? (
										categoryImage.setAttribute('src', `${images}${size}${poster_path}`), 
										categoryImage.onclick = () => window.open(`${images}original${poster_path}`)
										, categoryImage.style.cursor = 'pointer'
									) : categoryImage.setAttribute('src', `./images/grey.webp`);

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
				theGenre.textContent = `${theGenres}`;

				size = 'w200'
				//Shows the comapnies that produced the films
				let mappedProductionName = production_companies.map(item => item.name)
				let mappedProductionImage = production_companies.map(item => `${images}${size}${item.logo_path}`)
				mappedProductionName.forEach((item, index) =>{
					loadCompanies(mappedProductionImage[index], mappedProductionName[index])
				})
				productionCompaniesContainer.style.display = mappedProductionName ? 'grid' : 'none'

				size = 'w300';
				//If backgrop_path is available, use it, if not use poster_path, if either is not available, then choose darkgreen
				backGround.style.background = backdrop_path ? `url('${images}${size}${backdrop_path}') no-repeat center`: poster_path ? `url('${images}${size}${poster_path}') no-repeat center` : 'darkgreen';
				backGround.style.backgroundSize = 'cover';
				theOverview.textContent = overview;
				
				if (budget == undefined || revenue == undefined) {
					budgetAndRevenueDiv.style.display = 'none'
				}

				budget ? theBudget.textContent = `$${budget}` : budgetContainer.style.display = 'none';
				revenue ? theRevenue.textContent = `$${revenue}` : revenueContainer.style.display = 'none';
	
				//Look for recommendations
				recommendations();

				//Fetch the cast, the no parameter is to tell the function to 
				//display a maximum of 15 casts when callling the function
				castParentDiv.style.display = 'block';
				fetchCast('no');
			break;
		}
	});
}

//Create html elements for the production companies
let loadCompanies = (imageSrc, companyName) =>{
	let eachProductionCompanyDiv = document.createElement('div');
	eachProductionCompanyDiv.classList.add('each-production-company-div');
	let productionCompanyName = document.createElement('p');
	productionCompanyName.textContent = companyName;
	productionCompanyName.classList.add('production-companies--name');
	let productionCompanyImage;
	imageSrc.includes('null') ? '' : (productionCompanyImage = document.createElement('img'), productionCompanyImage.setAttribute('src', imageSrc), 
		productionCompanyImage.classList.add('production-companies--image'),
		productionCompanyImage.setAttribute('alt', 'company-logo'), 
		eachProductionCompanyDiv.appendChild(productionCompanyImage))
	eachProductionCompanyDiv.appendChild(productionCompanyName);
	productionCompaniesContainer.appendChild(eachProductionCompanyDiv);
}

//To fetch the casts of the movie/tv show
function fetchCast(more){
	fetch(theCategoryCredit)
	.then(response => response.json())
	.then(data =>{
		if (data.cast.length){
			castsHeader.style.display = 'block';
			eachCast = qSA('.eachCast');
			let loadCasts = index =>{
				const{name, id, character, profile_path, title, poster_path, media_type} = data.cast[index];
				type = media_type || 'person';
				createCastsTemplate(`./moreinfo.html?${type}/${id}`);
				castImages = qSA('.cast-members-img');
				castRealName = qSA('.cast-real-name');
				castName = qSA(".cast-name");
				eachCast = qSA('.eachCast');
				size = 'w200';
				switch (true) {
					case (profile_path != null && profile_path != undefined):
						castImages[index].setAttribute('src',  `${images}${size}${profile_path}`);
					break;
					case (poster_path != null && poster_path != undefined):
						castImages[index].setAttribute('src',  `${images}${size}${poster_path}`);
					break;
					default:
						title ? castImages[index].setAttribute('src', './images/grey.webp') : castImages[index].setAttribute('src',  `./images/photo1.webp`);
					break;
				}
				castRealName[index].textContent = name || title;
				castName[index].textContent = character;
				title ? castName[index].style.fontSize = 'large' : '';
			}

			//Find the minium value between two values
			let minValue = Math.min(14, data.cast.length - 1);
			//Redesigned some code to this. If what we get is no(that means that the user hasn't loaded more casts), it should run the first case
			//if not(meaning that the user clicked to load more cast), it should load the second which checks whether the loaded casts is less
			//than the casts from the api so that it won't keep rendering more casts when 'load more' is clicked
			switch (true) {
				case more === 'no' && eachCast.length == 0:
					for (let number = 0; number <= minValue; number++) {
						loadCasts(number);
					}
					data.cast.length > 15 ? loadMoreCasts() : '';
					minValue <= 2 ? qS('#blur').style.display = 'none' : '';
				break;
				case more === 'yes' && eachCast.length < data.cast.length:
				for (let number = eachCast.length; number <= data.cast.length - 1; number++) {
					loadCasts(number);
				}
				break;
			}
		}else{
			castsHeader.style.display = 'none';
			cast.style.display = 'none';
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
	moreCast.onclick = () => {
		fetchCast('yes');
		cast.removeChild(moreDiv);
	};
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
function createCastsTemplate(whenClicked){
	let outerDiv = document.createElement('div');
	outerDiv.classList.add('eachCast');
	let aTag = document.createElement('a');
	aTag.setAttribute('href', whenClicked);
	let anImg = document.createElement('img');
	anImg.classList.add('cast-members-img');
	anImg.setAttribute('loading', 'lazy');
	anImg.setAttribute('alt', 'casts-image');
	let innerDiv = document.createElement('div');
	innerDiv.classList.add('cast-info')
	let firstP = document.createElement('p');
	firstP.classList.add('cast-real-name');
	let secondP = document.createElement('p');
	secondP.classList.add('as');
	secondP.textContent = 'As'
	let thirdP = document.createElement('p');
	thirdP.classList.add('cast-name');
	outerDiv.appendChild(aTag);
	outerDiv.appendChild(innerDiv);
	aTag.appendChild(anImg);
	innerDiv.appendChild(firstP);
	innerDiv.appendChild(secondP);
	innerDiv.appendChild(thirdP);
	cast.appendChild(outerDiv);
}


//Look for recommendations
let recommendations = (type = 'movieOrTv', name = null) =>{
	fetch(callRecommendations)
	.then(res => res.json())
	.then(data => {
		switch (type) {
			case 'person':
			data.profiles.forEach((item, index) =>{
				data.profiles.length ? (recommendationsHeader.style.display = 'block', recommendationsHeader.textContent = `More images of ${name}:`) 
												: recommendationsHeader.style.display = 'none';
				const{aspect_ratio, file_path} = data.profiles[index];
				let imageSrc = `${images}${size}${file_path}`
				peoplesImagesTemplate(imageSrc, name, file_path);
			})
			break;

			default:
				if(data.results.length > 1) {recommendationsHeader.style.display = 'block'};
				data.results.forEach((item, index) =>{
					const{id, media_type, name, title, original_name, original_title, poster_path, vote_average, vote_count} = data.results[index];
					let recommendationLink = `${proxy}/${media_type}/${id}`
					let posterImage = `${images}${size}${poster_path}`;
					let whenClicked = `./moreinfo.html?${media_type}/${id}`;
					recommendationTemplate(title, original_title, name, original_name, posterImage, index, vote_average, media_type, whenClicked);
				})
			break;
		}		
	})
}

let recommendationTemplate = (title, original_title, name, original_name, posterImage, index, vote_average, media_type, whenClicked) =>{
	let links = document.createElement('a');
	links.classList.add('movie-link');
	links.setAttribute('href', whenClicked);

	links.innerHTML = `
							<div class="category-movies recommendations-div">
							<img class="category-image skeletonImg" loading='lazy' src=${posterImage.includes('null') || posterImage.includes('undefined') ? './images/grey.webp' : posterImage} alt='recommeded ${media_type}'>
							<p class="rating">N/A</p>
							<div class="rating-bg"></div>
							<div class="movie-first-info recommendationsTitleAndDate">
								<p class="movie-title headings">${showTheNameOfMovieOrTv(title, original_title, name, original_name)}</p>
							</div>
						</div>`
	recommendationsParentDiv.appendChild(links);
	recommendationsDiv = qSA('.recommendations-div');
	rating = qSA('.rating');
	ratingBg = qSA('.rating-bg');
	votePerc(index, rating, vote_average);
}

let peoplesImagesTemplate = (imageSrc, thePersonsName, filePath) =>{
	let links = document.createElement('img');
	links.setAttribute('src', imageSrc.includes('null') || imageSrc.includes('undefined') ? './images/.photo1.webp' : imageSrc);
	links.setAttribute('loading', 'lazy');
	links.setAttribute('alt', `Other images of ${thePersonsName}`);
	links.classList.add('person-other-image');
	links.classList.add('skeletonImg');
	links.onclick = () => window.open(`${images}original${filePath}`);
	recommendationsParentDiv.appendChild(links);
};

likeBtn.forEach(item => {
	let splitQuery = window.location.search.split("?");
	item.onclick = () =>{
		let addZero = value =>{
			return value < 10 ? `0${value}` : value;
		}
		let date = new Date();
		let addedDate = `${date.getFullYear()}-${addZero(date.getMonth())}-${addZero(date.getDate())}-${addZero(date.getHours())}-${addZero(date.getMinutes())} - ${date.getDay()}`;
		let likeInfo = {query: splitQuery[1], link: theCategory, time: addedDate}
		//There is probably a more efficient way to do this but we map through the likedHistory(gotten from the localStorage) array and we get the links
		//We save them to an array called theQuery and if it includes libk from the object we are trying to save(likeInfo),
		//we use splice which removes the data from the array, 
		//so we locate where it is in the array using indexOf and remove it using splice, 
		//or just push the object(likeInfo) to the array if it's not in the array
		let theQuery = likedHistory.map(element => element.query);
		theQuery.includes(likeInfo.query) ? (likedHistory.splice(theQuery.indexOf(likeInfo.query), 1), item.style.fill = 'transparent') : (likedHistory.push(likeInfo), item.style.fill = '#ef4444')
		localStorage.setItem('liked', JSON.stringify(likedHistory))
	};
})