//windows.location.search return something like ?Captain%20marvel
//windows.location.search.split("?") return something like ['', 'Captain%20marvel']
//window.location.search.split("?")[1].replace('%20', ' ') return something like Captain marvel
let theSearchQuery = window.location.search.split("?")[1].replace('%20', ' ');
let selectedCategory = localStorage.getItem('lastSelectedCategory') || 'multi';
let pageNumber = 1;

let setSelectedElementColor = theElement =>{	
	theElement = typeof theElement != 'string' ? theElement
		: theElement == 'tv' ? searchTV 
		: theElement == 'movie' ? searchMovies 
		: theElement == 'person' ? searchPeople
		: searchAll;
	searchAll.style.backgroundColor = 'transparent';
	searchMovies.style.backgroundColor = 'transparent';
	searchTV.style.backgroundColor = 'transparent';
	searchPeople.style.backgroundColor = 'transparent';
	theElement.style.backgroundColor = '#120D31';
}

setSelectedElementColor(selectedCategory);

let searching = (theType, page_no) =>{
	localStorage.setItem('lastSelectedCategory', theType)
	page_no = 1;
	let search = `${proxy}search/${theType}?api_key=${api_key}&query=${theSearchQuery}&page=${page_no}`;
	fetch(search)
	.then(response => response.json())
	.then(search => {

	  	switch (true) {
	  		//If the search doesn't exist
	  		case search.results.length == 0:
	  			alert(`We can't seem to find what you are looking for 🙁`) 
	  		break;
	  		case search.results.length > 0:
	  			//Clear the divs if they exist
		  		if (searchDiv !== undefined) {
		  			searchDiv.forEach((item, index)=>{
		  				searchResultsContainer.removeChild(searchDiv[index]);	  				
		  			})
		  		}

		  		//Add the divs
	  			for (var resultDivNum = 0; resultDivNum <= search.results.length - 1; resultDivNum++) {
				searchResultsDiv = document.createElement('a');
				searchResultsDiv.classList.add('search-info');

				let mediaType = search.results[resultDivNum].media_type || theType;
				searchResultsDiv.setAttribute('href', `./moreinfo.html?${mediaType}/${search.results[resultDivNum].id}`);

				searchResultsDiv.innerHTML = `
										<img src="./images/grey.webp" class="search-image" alt="search result movie images">
										<img src="./images/photo1.webp"class="search-person-image" alt="search result person image">
										<div class="search-rating"></div>
										<div class="search-text">
											<h3 class="search-result-title "></h3>
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
				index = resultDivNum;

		  		const {adult, id, media_type, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = search.results[index];

		  		possibilities(index, searchResultPerson, searchImage, searchResultTitle, searchResultDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
		  		
		  		switch (true) {
		  			case overview !== undefined:
		  				searchResultDescription[index].textContent = `${overview}`;
		  			break;

		  			case known_for.length == 1:
		  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
		  				searchResultDescription[index].textContent = `${mappedFeatureOnTitles}`
		  			break;

		  			default:
		  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
		  				searchResultDescription[index].textContent = `${addComma(mappedFeatureOnTitles)}`
		  			break;
		  		}

		  		votePerc(index, searchRating, vote_average, vote_count);
		  		resultQuery.textContent = `Result of ${theSearchQuery}`;
		  		document.title = `Result of your search, ${theSearchQuery}`;
		  		searchResultsContainer.style.animation = 'flyIn 0.7s linear forwards';

		  		searchDiv[index].onclick = () =>{
		  			const tempInfo = `${proxy}/${media_type == undefined ? theType : media_type}/${id}`;
			  		localStorage.setItem('moreInfo', tempInfo);
		  		}

		  		//Gets random numbers from the available number of total images and loads a random image with that if it is not null.
		  		let randomNumber = anyValue(search.results.length);
		  		let randomImages = `${search.results[randomNumber].poster_path}`;
		  		searchResultsContainer.style.backgroundImage = randomImages == 'null' || randomImages == 'undefined' ? '' : `url('${images}${size}${randomImages}')`;
			  	searchResultsContainer.style.backgroundSize = 'contain';
			  	searchResultsContainer.style.backgroundPosition = 'center';
	  		}
	  		break;
	  	}
	})
}

searching(selectedCategory, pageNumber);

searchAll.onclick = () =>{
	searching('multi', 1);
	setSelectedElementColor(searchAll);
}

searchMovies.onclick = () =>{
	searching('movie', 1);
	setSelectedElementColor(searchMovies);
}

searchTV.onclick = () =>{
	searching('tv', 1);
	setSelectedElementColor(searchTV);
}

searchPeople.onclick = () =>{
	searching('person', 1);
	setSelectedElementColor(searchPeople);
}