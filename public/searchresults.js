let theSearchQuery = localStorage.getItem('searchQuery');
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
	  	// timEr(search);
	  	console.log(search);

	  	switch (true) {
	  		//If the search doesn't exist
	  		case search.results.length == 0:
	  			alert(`We can't seem to find what you are looking for 🙁`) 
	  		break;
	  		case search.results.length > 0:
	  			//Clear the divs if they exist
		  		if (searchDiv !== undefined) {
		  			searchDiv.forEach((item, index)=>{
		  				searchSection.removeChild(searchDiv[index]);	  				
		  			})
		  		}

		  		//Add the divs
	  			for (var resultDivNum = 1; resultDivNum <= search.results.length; resultDivNum++) {
				searchResultsDiv = document.createElement('a');
				searchResultsDiv.classList.add('search-info');
				searchResultsDiv.setAttribute('href', 'javascript:void(0)');

				searchResultsDiv.innerHTML = `
										<img src="" class="search-image">
										<div class="circular-portrait">
											<img src=""class="search-person-image">
										</div>
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

				if (resultDivNum === search.results.length) {
			  		searchDiv.forEach((item, index) =>{
				  		const {adult, id, media_type, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = search.results[index];

				  		possibilities(index, searchResultPerson, searchImage, searchCircular, searchResultTitle, searchResultDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);

				  		switch (true) {
				  			case overview !== undefined:
				  				searchResultDescription[index].textContent = `${overview}`;
				  			break;

				  			case known_for.length == 1:
				  				searchResultDescription[index].textContent = `${known_for}`
				  			break;

				  			default:
				  				searchResultDescription[index].textContent = `${addComma(known_for)}`
				  			break;
				  		}

				  		votePerc(index, searchRating, vote_average, vote_count);
				  		resultQuery.textContent = `Result of ${theSearchQuery}`;
				  		document.title = `Result of ${theSearchQuery}`;
				  		searchSection.style.animation = 'flyIn 0.7s linear forwards';

				  		searchDiv[index].onclick = () =>{
				  			const tempInfo = `${proxy}/${media_type == undefined ? theType : media_type}/${id}`;
					  		localStorage.setItem('moreInfo', tempInfo);
					  		window.location.replace(`./moreinfo.html?result=${id}`);
				  		}

				  		if(poster_path === undefined) return;
				  		//Gets random numbers from the available number of total images and loads a random image with that if it is not null.
				  		let randomNumber = anyValue(search.results.length);
				  		let randomImages = `${search.results[randomNumber].poster_path}`;
				  		searchSection.style.backgroundImage = randomImages == null || randomImages == undefined ? '' : `url('${images}${size}${randomImages}')`;
					  	searchSection.style.backgroundSize = 'contain';
					  	searchSection.style.backgroundPosition = 'center';
			  		});
				}
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