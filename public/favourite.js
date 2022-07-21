let theSearchQuery = localStorage.getItem('liked') == undefined ? '' : JSON.parse(localStorage.getItem('liked'));
let selectedCategory = localStorage.getItem('lastSelectedFavouriteCategory') || 'multi';
let favouriteAll = qS('#favourite-all');
let favouriteMovies = qS('#favourite-movies');
let favouriteTV = qS('#favourite-tv');
let favouritePeople = qS('#favourite-people');
let favouriteContainer = qS('#favourite');
let noFavourite = qS('#no-favourite');
var index = 0;

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
									<p class="date-added--parent">You added it: <span class="date-added"></span>
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

		let checkDate = passedInfo =>{
			let addZero = value =>{
				return value < 10 ? `0${value}` : value;
			}
			let date = new Date();
			let splitPassedInfo = passedInfo.split('-');
			let passedYear = splitPassedInfo[0], passedMonth = splitPassedInfo[1], passedDate = splitPassedInfo[2], passedHour = splitPassedInfo[3], passedMinutes = splitPassedInfo[4], passedDay = splitPassedInfo[5];
			let currentYear = date.getFullYear(), currentMonth = addZero(date.getMonth()), currentDate = addZero(date.getDate());

			let getNameOfDay = value =>{
				switch (value) {
					case ' 0'|| 0 || '0':
						return 'Sunday';
					break;
					case ' 1'|| 1 || '1':
						return 'Monday';
					break;
					case ' 2'|| 2 || '2':
						return 'Tuesday';
					break;
					case ' 3'|| 3 || '3':
						return 'Wednesday';
					break;
					case ' 4'|| 4 || '4':
						return 'Thursday';
					break;
					case ' 5'|| 5 || '5':
						return 'Friday';
					break;
					case ' 6'|| 6 || '6':
						return 'Saturday';
					break;
					default:
						return '';
					break;
				}
			}

			let generateAddedText = value =>{
				switch (passedYear == currentYear && passedMonth == passedMonth) {
					case true && value == 0:
						return `Today at ${passedHour}:${passedMinutes}`
					break;
					case true && value == 1:
						return `Yesterday at ${passedHour}:${passedMinutes}`
					break;
					case true && value >= 2 && value < 6:
						return `${getNameOfDay(passedDay)} at ${passedHour}:${passedMinutes}`
					break;
					default:
						return `${passedYear}-${passedMonth}-${passedDate}`
					break;
				}
			}
			return generateAddedText((currentDate - passedDate))
		}
		dateAdded.forEach(item => {
			item.textContent ? '' : item.textContent = `${checkDate(timeAdded)}`
		})

  		const {adult, id, media_type, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, popularity, name, gender, profile_path} = favourite;

  		possibilities(index, favouritePerson, favouriteImage, favouriteTitle, favouriteDate, images,poster_path, profile_path, original_title, original_name, name, release_date, first_air_date, known_for_department);

  		votePerc(index, favouriteRating, vote_average, vote_count);

  		let desc = favouriteDescription[index];
	 	document.documentElement.clientWidth < 768 ? desc.style.display = 'none' 
	 	: overview == undefined || overview == null || overview == '' ? desc.style.display = 'none'
	 	: (desc.textContent =`${overview}`, desc.style.display = 'block');

  		index++;

  		theFavouriteDiv.forEach(item =>{
  			item.onclick = () =>{
	  			const tempInfo = `${proxy}/${media_type == undefined ? theType : media_type}/${id}`;
		  		localStorage.setItem('moreInfo', tempInfo);
	  		}
	  	})
	})
}

switch (true) {
	case theSearchQuery == '' || theSearchQuery == null:
		noFavourite.style.display = 'block';
	break;
	default:
		theSearchQuery.forEach(item =>{
			loadFavourites(`${item.link}?api_key=${api_key}`, 'multi', item.time)
		});
	break;
}