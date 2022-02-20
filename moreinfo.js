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
backGround = qS('#background');
overview = qS('#overview');
let cast = qS('#cast');
let castImages, castRealName, castName;

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
		document.title = `${title}`;
		console.log(data);
		votePerc(vote_average, rating, vote_count);
		voteCount.textContent = vote_count;
		Duration.textContent = durationConversion(runtime);
		categoryTitle.textContent = title;
		categoryRelease.textContent = release_date;
		tagLine.textContent = `...${tagline}....`;
		categoryImages.forEach((element, index) =>{
			categoryImages[index].setAttribute('src', `${images}${size}${poster_path}`);
		});
		// Status.textContent = `Status: ${status}`;
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
		Genre.textContent = `Genre: ${theGenres}`;
		size = 'original';
		backGround.style.background = `url('${images}${size}${backdrop_path}') no-repeat center`;
		backGround.style.backgroundSize = 'cover';
		this.overview.textContent = overview;//This is confusing, this,overview is the variable I made, overview is the destructured variable
	});

	fetch(theCatCredit)
	.then(response => response.json())
	.then(data =>{
		if (data.cast.length < 15) {
			data.cast.forEach( (element, index) =>{
				castStuff;
			});
		}
		console.log(data)
	})
};

let castStuff = () =>{	
	const{name, character, profile_path} = data.cast[index];
	add();
	castImages = qSA('.cast-members-img');
	castRealName = qSA('.cast-real-name');
	castName = qSA(".cast-name");
	castImages[index].setAttribute('src',  `${images}${size}${profile_path}`);
	castRealName[index].textContent = name;
	castName[index].textContent = character;
}

function add(){
	let outerDiv = document.createElement('div');
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
	theCat = localStorage.getItem('moreInfo');
	theCatInfo = `${theCat}?api_key=${api_key}`;
	theCatCredit = `${theCat}/credits?api_key=${api_key}`;
	categoryinfo();
}