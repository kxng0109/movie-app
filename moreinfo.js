// import {proxy, api_key, images, qS, qSA, main, container, menuBtn, loading, 
// 	loadingAnimation, loadingText, loadingCircles, userIcon, userHover, 
// 	hoverUsername, hoverChangeUsername, newUsernameField, submitUsername, 
// 	changeUsernameScreen, inside, changeNameForm, exitChangeUsernameScreen} from "./variables.js";

var thecatinfo;
function categoryinfo () {
	fetch(thecatinfo)
	.then(response => response.json())
	.then(data =>{
		const{backdrop_path, belongs_to_collection, genres, homepage, id, original_title, overview, poster_path, production_companies, production_countries, spoken_languages, status, tagline, title, vote_average, vote_count} = data;
		console.log(data);
	})
}


window.onload = () =>{
	thecatinfo = localStorage.getItem('moreInfo');
	categoryinfo();
}