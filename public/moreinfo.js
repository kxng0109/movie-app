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
const cast = qS('#cast');
let castImages, castRealName, castName, eachCast;
const backToBegin = qS('#back-to-begin');

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
	switch (true) {
		case typeof rawDuration === 'number':			
			const hour = Math.floor(rawDuration / 60);
			const minute = (rawDuration % 60);
			return `${hour}:${minute}`;
		break;
		default:
			return '--:--'
		break;
	}
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
	fetchCast('no');
}

function fetchCast(more){
	fetch(theCatCredit)
	.then(response => response.json())
	.then(data =>{
		console.log(data);

		switch (more === 'no') {
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
							castImages[index].setAttribute('src',  `../images/photo1.webp`);
						break;
					}
					castRealName[index].textContent = name;
					castName[index].textContent = character;
				});

				if (data.cast.length > 15) {
					loadMore();
					for (var i = 15; i <= data.cast.length - 1; i++) {
						eachCast[i].style.display = 'none';
					}
				}
			break;
		}
	});
};

let loadMore = () =>{
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
}

setTimeout(() => {let moreCast = qS('.more-link'); moreCast.onclick = () => fetchCast('yes');}, 1500);
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
	theCat = localStorage.getItem('moreInfo');
	theCatInfo = `${theCat}?api_key=${api_key}`;
	theCatCredit = `${theCat}/credits?api_key=${api_key}`;
	categoryinfo();
	backToBegin.style.display = 'none';
}