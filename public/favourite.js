let theSearchQuery = localStorage.getItem('liked') == undefined ? '' : JSON.parse(localStorage.getItem('liked'));
let selectedCategory = localStorage.getItem('lastSelectedFavouriteCategory') || 'multi';
let favouriteAll = qS('#favourite-all');
let favouriteMovies = qS('#favourite-movies');
let favouriteTV = qS('#favourite-tv');
let favouritePeople = qS('#favourite-people');
let favouriteContainer = qS('#favourite');
var index = 0;

switch (true) {
	case theSearchQuery == '' || theSearchQuery == null:
		qS('#no-favourite').classList.toggle('hidden');
	break;
	default:

		// let setSelectedElementColor = theElement =>{	
		// 	theElement = typeof theElement != 'string' ? theElement
		// 		: theElement == 'tv' ? favouriteTV 
		// 		: theElement == 'movie' ? favouriteMovies 
		// 		: theElement == 'person' ? favouritePeople
		// 		: favouriteAll;
		// 	favouriteAll.style.backgroundColor = 'transparent';
		// 	favouriteMovies.style.backgroundColor = 'transparent';
		// 	favouriteTV.style.backgroundColor = 'transparent';
		// 	favouritePeople.style.backgroundColor = 'transparent';
		// 	theElement.style.backgroundColor = '#120D31';
		// }

		// setSelectedElementColor(selectedCategory);\
			let loadFavourites = (favourite, theType, timeAdded) => {
				fetch(favourite)
				.then(response => response.json())
				.then(favourite => {
			  		// Add the divs
						favouriteDivTemplate = document.createElement('a');
						favouriteDivTemplate.classList.add('favourite-info');

						theType = favourite.known_for_department == undefined && favourite.original_title == undefined ? 'tv' 
										: favourite.known_for_department == undefined && favourite.original_name == undefined ? 'movie' 
										: 'person';

						favouriteDivTemplate.setAttribute('href', `./moreinfo.html?${theType}/${favourite.id}`);

						favouriteDivTemplate.innerHTML = `
												<img src="./images/grey.webp" class="favourite-image" alt="favourite movie images">
												<img src="./images/photo1.webp"class="favourite-person-image" alt="favourite person image">
												<div class="favourite-rating"></div>
												<div class="favourite-text">
													<h3 class="favourite-title "></h3>
													<p class="favourite-description"></p>
													<p class="favourite-date"></p>
													<p class="date-added--parent">You added it on: <span class="date-added"></span>
												</div>`
						favouriteContainer.appendChild(favouriteDivTemplate);
						theFavouriteDiv = qSA('.favourite-info');
						favouriteImage = qSA('.favourite-image');
						favouriteRating = qSA('.favourite-rating');
						favouriteTitle = qSA('.favourite-title');
						favouriteDescription = qSA('.favourite-description');
						favouriteDate = qSA('.favourite-date');
						favouritePerson = qSA('.favourite-person-image');
						let dateAdded = qSA('.date-added');
						dateAdded.forEach(item => item.textContent ? '' : item.textContent = `${timeAdded}`)

				  		const {adult, id, media_type, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = favourite;

				  		possibilities(index, favouritePerson, favouriteImage, favouriteTitle, favouriteDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);

				  		votePerc(index, favouriteRating, vote_average, vote_count);
				  		index++;
				  		switch (true) {
				  			case overview != undefined:
				  				favouriteDescription.textContent = `${overview}`;
				  			break;

				  			case known_for != undefined && known_for.length == 1:
				  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
				  				favouriteDescription.textContent = `${mappedFeatureOnTitles}`;
				  			break;

				  			case known_for != undefined && known_for.length > 1:
				  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
				  				favouriteDescription.textContent = `${addComma(mappedFeatureOnTitles)}`
				  			break;
				  		}

				  		favouriteContainer.style.animation = 'flyIn 0.7s linear forwards';

				  		theFavouriteDiv.forEach(item =>{
				  			item.onclick = () =>{
					  			const tempInfo = `${proxy}/${media_type == undefined ? theType : media_type}/${id}`;
						  		localStorage.setItem('moreInfo', tempInfo);
					  		}
					  	})
				})
			}

			switch (selectedCategory) {
				case 'multi':
					theSearchQuery.forEach(item =>{
						loadFavourites(`${item.link}?api_key=${api_key}`, 'multi', item.time)
					})
				break;
				default:
					// statements_def
				break;
			}






















			// localStorage.setItem('lastSelectedFavouriteCategory', theType)
			// page_no = 1;
			// let favourite = `${proxy}favourite/${theType}?api_key=${api_key}&query=${theSearchQuery}&page=${page_no}`;
			// fetch(favourite)
			// .then(response => response.json())
			// .then(favourite => {

			//   	switch (true) {
			//   		//If the favourite doesn't exist
			//   		case favourite.length == 0:
			//   			alert(`We can't seem to find what you are looking for 🙁`) 
			//   		break;
			//   		case favourite.results.length > 0:
			//   			//Clear the divs if they exist
			// 	  		if (favouriteDiv !== undefined) {
			// 	  			favouriteDiv.forEach((item, index)=>{
			// 	  				favouriteResultsContainer.removeChild(favouriteDiv[index]);	  				
			// 	  			})
			// 	  		}

			// 	  		//Add the divs
			//   			for (var resultDivNum = 0; resultDivNum <= favourite.results.length - 1; resultDivNum++) {
			// 			favouriteResultsDiv = document.createElement('a');
			// 			favouriteResultsDiv.classList.add('favourite-info');

			// 			let mediaType = favourite.results.media_type || theType;
			// 			favouriteResultsDiv.setAttribute('href', `./moreinfo.html?${mediaType}/${favourite.results[resultDivNum].id}`);

			// 			favouriteResultsDiv.innerHTML = `
			// 									<img src="./images/grey.webp" class="favourite-image" alt="favourite result movie images">
			// 									<img src="./images/photo1.webp"class="favourite-person-image" alt="favourite result person image">
			// 									<div class="favourite-rating"></div>
			// 									<div class="favourite-text">
			// 										<h3 class="favourite-result-title "></h3>
			// 										<p class="favourite-result-description"></p>
			// 										<p class="favourite-result-date"></p>
			// 									</div>`
			// 			favouriteResultsContainer.appendChild(favouriteResultsDiv);
			// 			favouriteDiv = qSA('.favourite-info');
			// 			favouriteImage = qSA('.favourite-image');
			// 			favouriteRating = qSA('.favourite-rating');
			// 			favouriteResultTitle = qSA('.favourite-result-title');
			// 			favouriteResultDescription = qSA('.favourite-result-description');
			// 			favouriteResultDate = qSA('.favourite-result-date');
			// 			favouriteResultPerson = qSA('.favourite-person-image');
			// 			let favouriteCircular = qSA('.circular-portrait');
			// 			index = resultDivNum;

			// 	  		const {adult, id, media_type, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = favourite.results[index];

			// 	  		possibilities(index, favouriteResultPerson, favouriteImage, favouriteResultTitle, favouriteResultDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);
				  		
			// 	  		switch (true) {
			// 	  			case overview !== undefined:
			// 	  				favouriteResultDescription[index].textContent = `${overview}`;
			// 	  			break;

			// 	  			case known_for.length == 1:
			// 	  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
			// 	  				favouriteResultDescription[index].textContent = `${mappedFeatureOnTitles}`
			// 	  			break;

			// 	  			default:
			// 	  				mappedFeatureOnTitles = known_for.map(item => item.original_title || item.original_name)
			// 	  				favouriteResultDescription[index].textContent = `${addComma(mappedFeatureOnTitles)}`
			// 	  			break;
			// 	  		}

			// 	  		votePerc(index, favouriteRating, vote_average, vote_count);
			// 	  		resultQuery.textContent = `Result of ${theSearchQuery}`;
			// 	  		document.title = `Result of your favourite, ${theSearchQuery}`;
			// 	  		favouriteResultsContainer.style.animation = 'flyIn 0.7s linear forwards';

			// 	  		favouriteDiv[index].onclick = () =>{
			// 	  			const tempInfo = `${proxy}/${media_type == undefined ? theType : media_type}/${id}`;
			// 		  		localStorage.setItem('moreInfo', tempInfo);
			// 	  		}

			// 	  		//Gets random numbers from the available number of total images and loads a random image with that if it is not null.
			// 	  		let randomNumber = anyValue(favourite.results.length);
			// 	  		let randomImages = `${favourite.results[randomNumber].poster_path}`;
			// 	  		favouriteResultsContainer.style.backgroundImage = randomImages == 'null' || randomImages == 'undefined' ? '' : `url('${images}${size}${randomImages}')`;
			// 		  	favouriteResultsContainer.style.backgroundSize = 'contain';
			// 		  	favouriteResultsContainer.style.backgroundPosition = 'center';
			//   		}
			//   		break;
			//   	}
			// })

	// 	favouriteing(selectedCategory, pageNumber);

	// 	favouriteAll.onclick = () =>{
	// 		favouriteing('multi', 1);
	// 		setSelectedElementColor(favouriteAll);
	// 	}

	// 	favouriteMovies.onclick = () =>{
	// 		favouriteing('movie', 1);
	// 		setSelectedElementColor(favouriteMovies);
	// 	}

	// 	favouriteTV.onclick = () =>{
	// 		favouriteing('tv', 1);
	// 		setSelectedElementColor(favouriteTV);
	// 	}

	// 	favouritePeople.onclick = () =>{
	// 		favouriteing('person', 1);
	// 		setSelectedElementColor(favouritePeople);
	// 	}
	// break;
}