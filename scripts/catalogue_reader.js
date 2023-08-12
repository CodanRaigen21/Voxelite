var addonsContent = JSON.parse(JSON.stringify(addonsList));
var texturesContent = JSON.parse(JSON.stringify(texturesList));
var skinsContent = JSON.parse(JSON.stringify(skinsList));
var mapsContent = JSON.parse(JSON.stringify(mapsList));
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
var tagFilters = document.querySelector('div.tagFilters');
var addonsTags = [
	"Mechanics",
	"Survival",
	"Decorative",
	"Mobs",
	"Industrial",
	"Combat",
	"Blocks",
	"Items",
	"Biomes",
	"Expansion"
]
var texturesTags = [
	"Animation",
	"UI",
	"Cosmetic",
	"Utility"
]
var skinsTags = [
	"Anime",
	"Add-on",
	"Thematic",
	"Wardrobe"
]
var mapsTags = [
	"Showcase",
	"Episodic",
	"Builds",
	"Minigame"
]

// function flatConvert(s){
	// return s.replaceAll("'", "").replaceAll('-', '_').replaceAll(' ', '_').replaceAll(':', '').toLowerCase();
// }
function dateConvert(s){
	return s.toString().length == 1 ? `0${s}` : s;
}

var nameContent = `${type}Content`;
var nameTag = `${type}Tags`;
var content = eval(nameContent);
var tag = eval(nameTag);

var section = document.querySelector('section');
for(var i = 0; i < content.length; i++){
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
		newA.classList.add(content[i].tags[j]);
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
	newA.dataset.title = content[i].title;
	newA.appendChild(newContentHeader);
	
	var newContentDescription = document.createElement('p');
	newContentDescription.classList.add('contentDescription');
	newContentDescription.textContent = content[i].short_description;
	newA.appendChild(newContentDescription);
	
	var newContentDetails = document.createElement('div');
	newContentDetails.classList.add('contentDetails');

	var newP = document.createElement('p');
	newP.innerHTML = `▲ <span class="uploadDate">${dateConvert(content[i].uploaded_on.dd)} • ${dateConvert(content[i].uploaded_on.mm)} • ${content[i].uploaded_on.yyyy}</span>`;
	newA.dataset.upload = `${content[i].uploaded_on.yyyy}${dateConvert(content[i].uploaded_on.mm)}${dateConvert(content[i].uploaded_on.dd)}`;
	newContentDetails.appendChild(newP);

	var newP = document.createElement('p');
	newP.innerHTML = `⟳ <span class="updateDate">${dateConvert(content[i].updated_on.dd)} • ${dateConvert(content[i].updated_on.mm)} • ${content[i].updated_on.yyyy}</span>`;
	newA.dataset.update = `${content[i].updated_on.yyyy}${dateConvert(content[i].updated_on.mm)}${dateConvert(content[i].updated_on.dd)}`;
	newContentDetails.appendChild(newP);

	var newP = document.createElement('p');
	newP.innerHTML = `v<span class="currentVersion">${content[i].version.main} • ${content[i].version.sub}</span>`;
	newContentDetails.appendChild(newP);
	
	newA.appendChild(newContentDetails);
	section.appendChild(newA);
}
for(var i = 0; i < tag.length; i++){
	var newButton = document.createElement('button');
	newButton.dataset.tag = tag[i].toLowerCase();
	newButton.type = 'button';
	
	var newImg = document.createElement('img');
	newImg.src = `images/icons/tags/${tag[i].toLowerCase()}.png`;
	newButton.appendChild(newImg);
	var btnTxt = document.createTextNode(tag[i]);
	newButton.appendChild(btnTxt);
	tagFilters.appendChild(newButton);
}

var updateButton = document.querySelector('.latestUpdate');
updateButton.addEventListener('click', event =>{
	sort('update');
});
var uploadButton = document.querySelector('.latestUpload');
uploadButton.addEventListener('click', event =>{
	sort('upload');
});

var panels = document.querySelectorAll('a.content');
function sort(val){
	var col =[];
	panels.forEach(p => col.push(p));
	var ch = document.querySelector('.contentHolder');
	col.sort(function(a, b){
		return -a.getAttribute(`data-${val}`) - -b.getAttribute(`data-${val}`);
	});
	ch.innerHTML = null;
	col.forEach(c => ch.appendChild(c));
}

var azButton = document.querySelector('.atoz');
azButton.addEventListener('click', event =>{
	alSort('az');
});
var zaButton = document.querySelector('.ztoa');
zaButton.addEventListener('click', event =>{
	alSort('za');
});

function alSort(al){
	[].slice.call(panels).sort(function(a, b) {
    var textA = a.getAttribute('data-title').toLowerCase();
    var textB = b.getAttribute('data-title').toLowerCase();
    if(al == 'az'){return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }
    if(al == 'za'){return (textA < textB) ? 1 : (textA > textB) ? -1 : 0; }
	}).forEach(function(el) {el.parentNode.appendChild(el)});
}