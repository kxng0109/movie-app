var comingsoonPersonImage;
var comingsoonCircular;
var comingSoonSection = qS('#coming-soon-div');
let data = `${proxy}movie/upcoming?api_key=${api_key}`;
fetch(data)
.then(response => response.json())
.then(data => {
	console.log(data)
	infos(comingSoonSection, '#comingsoon-section');
	comingSoonSection.scrollTo({left: 0, behavior: 'smooth'});

	var resultDivNum;
	if (category.length === data.results.length){
		category.forEach( function(element, index) {
			comingSoonSection.removeChild(category[index]);
		});
	}
	for (var resultDivNum = 0; resultDivNum <= data.results.length - 1; resultDivNum++) {
	  	const {adult, original_language, original_title, overview, poster_path, release_date, title, vote_average, vote_count, original_name, first_air_date, known_for, known_for_department, comingsoonity, name, gender, profile_path, id} = data.results[resultDivNum];
		let alinks = document.createElement('a');
		alinks.classList.add('movie-link');
		alinks.setAttribute('href', `./moreinfo.html?movie/${data.results[resultDivNum].id}`);

		alinks.innerHTML = `
								<div class="category-movies comingsoon">
						<img class="category-image skeletonImg" loading="lazy" src="./images/grey.webp" alt="coming soon movies images">
						<p class="rating">N/A</p>
						<div class="rating-bg"></div>
						<div class="movie-first-info">
							<p class="movie-title headings"></p>
							<p class="movie-release-date"></p>
						</div>
					</div>`
		comingSoonSection.appendChild(alinks);
		comingsoon = qSA('.comingsoon')
		infos(comingSoonSection, '#coming-soon-div');
		categoryImage[resultDivNum].setAttribute('src', poster_path ? `${images}${size}${poster_path}` : './images/grey.webp');
		categoryTitle[resultDivNum].textContent = title ? title : original_title;
		categoryRelease[resultDivNum].textContent = release_date ? release_date : '';
		comingsoonPersonImage = qSA('.comingsoon-person-image');
	  	votePerc(resultDivNum, rating, vote_average);
	}
})