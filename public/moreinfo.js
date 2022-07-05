categoryImages = qSA('.image');
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
let castImages, castRealName, castName, eachCast;
let eachLanguage = qS('#each-language');
let revenue = qS('#revenue');
let budget = qS('#budget');
const backToBegin = qS('#back-to-begin');
let genreHeader = qS('#genre--header');
let languagesSpokenHeader = qS('#languages-spoken--header');
let releaseDateHeader = qS('#release-date--header');
let productionCompaniesContainer = qS('#production-companies--container');
let budgetAndRevenueDiv = qS('.budget-revenue-div');


let votePerc = (vote_average, rating, vote_count) =>{
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


var theCategory, theCategoryInfo, theCategoryCredit;
//Calls the API and receives evey info about the movie and assigns them
function categoryinfo () {
	fetch(theCategoryInfo)
	.then(response => response.json())
	.then(data =>{
		const{backdrop_path, belongs_to_collection, budget, episode_run_time, genres, homepage, id, last_air_date, name, original_title, original_name, overview, poster_path, production_companies, production_countries, spoken_languages, status, release_date, revenue, tagline, title, vote_average, vote_count, runtime} = data;
		
		//Replaces the title of the wepbage with the title of the movie or tv show
		document.title = `${showTheNameOfMovieOrTv(title, original_title, name, original_name)}`;
		console.log(data);
		//Maps over the spoken_language array from the api and calls a function which gets it's result and displays it
		let spokenLanguagesName = spoken_languages.map(item =>item.english_name);
		eachLanguage.textContent = `${addComma(spokenLanguagesName)}`;
		languagesSpokenHeader.textContent = spoken_languages.length > 1 ? 'Languages Spoken:' : 'Language Spoken:';

		votePerc(vote_average, rating, vote_count);
		voteCount.textContent = vote_count;

		//calls durationConversion which converts the runtime into hours and minutes
		Duration.textContent = durationConversion(runtime, episode_run_time);
		
		//Calls the function to check for whichever one is available and makes them the title
		categoryTitle.textContent = showTheNameOfMovieOrTv(title, original_title, name, original_name)

		releaseDateHeader.textContent = release_date ? 'Released:' : 'Last aired on:';
		categoryRelease.textContent = release_date ? release_date : last_air_date;

		tagLine.textContent = `...${tagline}....`;

		categoryImages.forEach((element, index) =>{
			categoryImages[index].setAttribute('src', `${images}${size}${poster_path}`);
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
		productionCompaniesContainer.style.display = mappedProductionName ? 'flex' : 'none'

		size = 'w300';
		backGround.style.background = `url('${images}${size}${backdrop_path}') no-repeat center`;
		backGround.style.backgroundSize = 'cover';
		this.overview.textContent = overview;//This is confusing, this,overview is the variable I made, overview is the destructured variable
		
		if (budget == undefined || revenue == undefined) {
			budgetAndRevenueDiv.style.display = 'none'
		}
		this.budget.textContent = `$${budget}`;
		this.revenue.textContent = `$${revenue}`;
	});

	//Fetch the cast, the no parameter is to tell the function to 
	//display a maximum of 15 casts when callling the function
	fetchCast('no');
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
					add();
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
function add(){
	let outerDiv = document.createElement('div');
	outerDiv.classList.add('eachCast');
	let aTag = document.createElement('a');
	aTag.setAttribute('href', '');
	let anImg = document.createElement('img');
	anImg.classList.add('cast-members-img');
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

window.onload = () =>{
	theCategory = localStorage.getItem('moreInfo');
	theCategoryInfo = `${theCategory}?api_key=${api_key}`;
	theCategoryCredit = `${theCategory}/credits?api_key=${api_key}`;
	categoryinfo();
	backToBegin.style.display = 'none';
}