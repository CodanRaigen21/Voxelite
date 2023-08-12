var addonsContent = JSON.parse(JSON.stringify(addonsList));
var texturesContent = JSON.parse(JSON.stringify(texturesList));
var skinsContent = JSON.parse(JSON.stringify(skinsList));
var mapsContent = JSON.parse(JSON.stringify(mapsList));

// function flatConvert(s){
	// return s.replaceAll("'", "").replaceAll('-', '_').replaceAll(' ', '_').replaceAll(':', '').toLowerCase();
// }
function dateConvert(s){
	return s.toString().length == 1 ? `0${s}` : s;
}

var sections = document.querySelectorAll('section');
sections.forEach(s =>{
	var nameContent = `${s.dataset.type}Content`;
	var content = eval(nameContent);

	var section = document.querySelector('section');
	let limit = content.length > 5 ? 5 : content.length;
	for(var i = 0; i < limit; i++){
		var newA = document.createElement('a');
		newA.classList.add('content');
		newA.href = `content.html?name=${content[i].flat}`;
		
		var newContentMedia = document.createElement('div');
		newContentMedia.classList.add('contentMedia');
		
		var newContentIcon = document.createElement('img');
		newContentIcon.classList.add('contentIcon');
		newContentIcon.src = `images/content/${content[i].flat}/icon.png`;
		
		var newDiv = document.createElement('div');
		for(var j = 0; j < content[i].tags.length; j++){
			var newContentTag = document.createElement('img');
			newContentTag.classList.add('contentTag');
			newContentTag.src = `images/icons/tags/${content[i].tags[j]}.png`;
			newDiv.appendChild(newContentTag);
		}
		newContentMedia.appendChild(newContentIcon);
		newContentMedia.appendChild(newDiv);
		newA.appendChild(newContentMedia);
		
		var newContentHeader = document.createElement('h1');
		newContentHeader.classList.add('contentHeader');
		newContentHeader.textContent = content[i].title;
		newA.appendChild(newContentHeader);
		
		var newContentDescription = document.createElement('p');
		newContentDescription.classList.add('contentDescription');
		newContentDescription.textContent = content[i].short_description;
		newA.appendChild(newContentDescription);
		
		var newContentDetails = document.createElement('div');
		newContentDetails.classList.add('contentDetails');

		var newP = document.createElement('p');
		newP.innerHTML = `▲ <span class="uploadDate">${dateConvert(content[i].uploaded_on.dd)} • ${dateConvert(content[i].uploaded_on.mm)} • ${content[i].uploaded_on.yyyy}</span>`;
		newContentDetails.appendChild(newP);

		var newP = document.createElement('p');
		newP.innerHTML = `⟳ <span class="updateDate">${dateConvert(content[i].updated_on.dd)} • ${dateConvert(content[i].updated_on.mm)} • ${content[i].updated_on.yyyy}</span>`;
		newContentDetails.appendChild(newP);

		var newP = document.createElement('p');
		newP.innerHTML = `v<span class="currentVersion">${content[i].version.main} • ${content[i].version.sub}</span>`;
		newContentDetails.appendChild(newP);
		
		newA.appendChild(newContentDetails);
		s.insertBefore(newA, s.querySelector('.redirect'));
	}
});