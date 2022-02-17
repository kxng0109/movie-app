// import {proxy, api_key, images, qS, qSA, main, container, menuBtn, loading, 
// 	loadingAnimation, loadingText, loadingCircles, userIcon, userHover, 
// 	hoverUsername, hoverChangeUsername, newUsernameField, submitUsername, 
// 	changeUsernameScreen, inside, changeNameForm, exitChangeUsernameScreen} from "./variables.js";

categoryImages = qSA('.image');
rating = qS('#avnumber');
categoryTitle = qS('#title');
categoryRelease = qS('#release-date');
categoryInfo = qS('#overview');
Genre = qS('#genre');
Status = qS('#status');
voteCount = qS('#vcnumber');
Duration = qS('#dvalue');
tagLine = qS('#tagline');

let votePerc = (vote_average, rating, vote_count) =>{
	if (vote_average === undefined) {
		rating.style.display = 'none';
		rating.textContent = '';
	}else{
		if (vote_count !== 0) {
			ratingPercent = vote_average * 10;
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

let durationConversion = rawDuration =>{
	var hour = Math.floor(rawDuration / 60);
	var minute = (rawDuration % 60);
	return `${hour}:${minute}`;
}

var theCat, theCatInfo, theCatCredit;
function categoryinfo () {
	fetch(theCatInfo)
	.then(response => response.json())
	.then(data =>{
		const{backdrop_path, belongs_to_collection, genres, homepage, id, original_title, overview, poster_path, production_companies, production_countries, spoken_languages, status, release_date, tagline, title, vote_average, vote_count, runtime} = data;
		console.log(data);
		votePerc(vote_average, rating, vote_count);
		voteCount.textContent = vote_count;
		Duration.textContent = durationConversion(runtime);
		categoryTitle.textContent = title;
		categoryRelease.textContent = release_date;
		tagLine.textContent = tagline;
		categoryImages.forEach((element, index) =>{
			categoryImages[index].setAttribute('src', `${images}${size}${poster_path}`);
		});
		Status.textContent = `Status: ${status}`;
		size = 'original';
		container.style.background = `url('${images}${size}${backdrop_path}') no-repeat center`;
		container.style.backgroundSize = 'cover';
	});
	fetch(theCatCredit)
	.then(response => response.json())
	.then(data =>{
		console.log(data)
	});
}


window.onload = () =>{
	theCat = localStorage.getItem('moreInfo');
	theCatInfo = `${theCat}?api_key=${api_key}`;
	theCatCredit = `${theCat}/credits?api_key=${api_key}`;
	categoryinfo();
}