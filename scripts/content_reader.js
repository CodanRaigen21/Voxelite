const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

var addonsContent = JSON.parse(JSON.stringify(addonsList));
var texturesContent = JSON.parse(JSON.stringify(texturesList));
var skinsContent = JSON.parse(JSON.stringify(skinsList));
var mapsContent = JSON.parse(JSON.stringify(mapsList));

var mainNav = document.querySelector('.navCollection');
var mainDes = document.querySelector('.mainDescription');
var types = [
	"addons",
	"textures",
	"skins",
	"maps"
]
var collected = [];
for(var i = 0; i < types.length; i++){
	var coName = `${types[i]}Content`;
	eval(coName).filter(f => f.flat.indexOf(name) > -1) == 0 ? null : collected = eval(coName).filter(f => f.flat.indexOf(name) > -1);
}
var cc = collected[0];

if(cc.flat == name){
	if(cc.description.length > 0){
		var nE = document.createElement('button');
		nE.dataset.page = 'description';
		nE.textContent = 'Description';
		mainNav.appendChild(nE);
		
		var nD = document.createElement('div');
		nD.dataset.page = 'description';
		nD.classList.add('descWrapper');
		
		cc.description.forEach(fc =>{
			if(fc.type == 'heading'){
				let nE = document.createElement('h1');
				nE.textContent = fc.data;
				nD.appendChild(nE);
			}
			if(fc.type == 'subheading'){
				let nE = document.createElement('h2');
				nE.textContent = fc.data;
				nD.appendChild(nE);
			}
			if(fc.type == 'subsubheading'){
				let nE = document.createElement('h3');
				nE.textContent = fc.data;
				nD.appendChild(nE);
			}
			if(fc.type == 'paragraph'){
				fc.data.forEach(st => {
					let nE = document.createElement('p');
					nE.textContent = st;
					nD.appendChild(nE);
				});
			}
			if(fc.type == 'gallery'){
				let galDiv = document.createElement('div');
				galDiv.classList.add('contentGallery');
				let galDivWrapper = document.createElement('div');
				galDivWrapper.classList.add('contentGalleryWrapper');
				fc.data.forEach(gl =>{
					let gImg = document.createElement('img');
					gImg.src = `images/content/${name}/gallery/${gl}`;
					galDivWrapper.appendChild(gImg);
				});
				galDiv.appendChild(galDivWrapper);
				nD.appendChild(galDiv);
			}
			if(fc.type == 'unordered_list'){
				let nE = document.createElement('div');
				nE.classList.add('listCol');
				fc.data.forEach(st => {
					let ul = document.createElement('ul');
					st.list.forEach(ld => {
						let li = document.createElement('li');
						li.textContent = ld;
						ul.appendChild(li);
					});
					nE.appendChild(ul);
				});
				nD.appendChild(nE);
			}
			if(fc.type == 'image'){
				let nE = document.createElement('div');
				nE.classList.add('imageContainer');
				fc.data.forEach(st => {
					let img = document.createElement('img');
					img.src = `images/content/${name}/gallery/${st}`;
					img.draggable = false;
					nE.appendChild(img);
				});
				nD.appendChild(nE);
			}
			if(fc.type == 'compound'){
				let nE = document.createElement('div');
				nE.classList.add('compound');
				fc.direction == 'PI' ? null : nE.classList.add('rc');
				let comP = document.createElement('p');
				comP.textContent = fc.data.paragraph;
				comP.style.width = fc.ratio.paragraph;
				nE.appendChild(comP);
				let comImg = document.createElement('img');
				comImg.src = `images/content/${name}/gallery/${fc.data.image}`;
				comImg.style.width = fc.ratio.image;
				nE.appendChild(comImg);
				nD.appendChild(nE);
			}
		});
		var linkCol = document.createElement('div');
		linkCol.classList.add('linkCol');
		if(cc.dat_link != ''){
			var lnk = document.createElement('a');
			lnk.href = cc.dat_link;
			lnk.textContent = 'behaviors 🡇';
			linkCol.appendChild(lnk);
			nD.appendChild(linkCol);
			mainDes.appendChild(nD);
		}
		if(cc.res_link != ''){
			var lnk = document.createElement('a');
			lnk.href = cc.res_link;
			lnk.textContent = 'resources 🡇';
			linkCol.appendChild(lnk);
			nD.appendChild(linkCol);
			mainDes.appendChild(nD);
		}
		if(cc.one_link != ''){
			var lnk = document.createElement('a');
			lnk.href = cc.one_link;
			lnk.textContent = 'download 🡇';
			linkCol.appendChild(lnk);
			nD.appendChild(linkCol);
			mainDes.appendChild(nD);
		}
	}
	
	var tabListCap = [ 'Blocks', 'Items', 'Entities', 'Structures', 'Biomes' ];
	var blocksTags = [ 'All', 'Equipment', 'Construction', 'Nature', 'Items', 'Commands' ];
	var itemsTags = [ 'All', 'Equipment', 'Construction', 'Nature', 'Items', 'Commands' ];
	var entitiesTags = [ 'All', 'Inanimate', 'Utility', 'Boss', 'Miniboss', 'Hostile', 'Passive', 'Neutral' ];
	var structuresTags = [ 'All', 'Treasure', 'Resource', 'Residence', 'Decoration', 'Dungeon' ];
	var biomesTags = [ 'All', 'Dimension', 'Major', 'Micro' ];
	tabListCap.forEach(tlc =>{
		var control = `cc.content.${tlc.toLowerCase()}`;
		var tagL = `${tlc.toLowerCase()}Tags`;
		
		var ev = eval(control);
		var tagEv = eval(tagL);
		ev.length > 0 ? createLibrary(tlc, ev, tagEv) : null;
		document.querySelectorAll(`div[data-page="${tlc.toLowerCase()}"] .dataTagsWrapper .dataTags button`).forEach(cb => {
			if(cb.dataset.tagval != 'all'){
				let lGot = document.querySelectorAll(`button[data-tagval="${cb.dataset.tagval}"].libraryCell`);
				lGot.length == 0 ? cb.classList.add('disabled') : null;
				lGot.length == 0 ? cb.tabIndex = -1 : null;
			}
		});
	});
	
	function createLibrary(ty, ev, tList){
		var nE = document.createElement('button');
		nE.dataset.page = ty.toLowerCase();
		nE.textContent = ty;
		mainNav.appendChild(nE);
		
		var nD = document.createElement('div');
		nD.dataset.page = ty.toLowerCase();
		nD.classList.add('descWrapper');
		
		var newHeading = document.createElement('h1');
		newHeading.textContent = ty;
		nD.appendChild(newHeading);
		
		var newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.placeholder = `Search ${ty.toLowerCase()}...`;
		nD.appendChild(newInput);
		
		var dataTagsWrapper = document.createElement('div');
		dataTagsWrapper.classList.add('dataTagsWrapper');
		
		var dataTags = document.createElement('div');
		dataTags.classList.add('dataTags');
		
		tList.forEach(t => {
			var newBtn = document.createElement('button');
			newBtn.type = 'button';
			if(ty == 'Blocks' && t != 'All'){ newBtn.dataset.tagval = `BLK${t.toLowerCase()}`; }
			else if(ty == 'Items' && t != 'All'){ newBtn.dataset.tagval = `ITM${t.toLowerCase()}`; }
			else{ newBtn.dataset.tagval = t.toLowerCase(); }
			newBtn.textContent = t.replaceAll('BLK', '').replaceAll('ITM', '');
			dataTags.appendChild(newBtn);
		});
		dataTagsWrapper.appendChild(dataTags);
		nD.appendChild(dataTagsWrapper);
		
		var newLibrary = document.createElement('div');
		newLibrary.classList.add('library');
		newLibrary.dataset.type = ty.toLowerCase();
		ev.forEach(cell => {
			var newBtn = document.createElement('button');
			newBtn.type = 'button';
			newBtn.classList.add('libraryCell');
			newBtn.dataset.id = cell.id;
			if(ty == 'Blocks'){ newBtn.dataset.tagval = `BLK${cell.type}`; }
			else if(ty == 'Items'){ newBtn.dataset.tagval = `ITM${cell.type}`; }
			else{ newBtn.dataset.tagval = cell.type.toLowerCase(); }
			
			var cellText = document.createElement('p');
			cellText.textContent = cell.name;
			newBtn.appendChild(cellText);
			
			var cellImg = document.createElement('div');
			if(ty.toLowerCase() == 'items' || ty.toLowerCase() == 'blocks'){
				cellImg.style.backgroundImage = `url('images/content/${name}/inventory/${cell.id.split(':')[1]}.png')`;
			}
			else if(ty.toLowerCase() == 'entities'){
				if(cell.variants == 0){ cellImg.style.backgroundImage = `url('images/content/${name}/${ty.toLowerCase()}/${cell.id.split(':')[1]}.png')`; }
				else{ cellImg.style.backgroundImage = `url('images/content/${name}/${ty.toLowerCase()}/${cell.id.split(':')[1]}0.png')`; }
			}
			else{
				cellImg.style.backgroundImage = `url('images/content/${name}/${ty.toLowerCase()}/${cell.id.split(':')[1]}.png')`;
			}
			newBtn.appendChild(cellImg);
			
			newLibrary.appendChild(newBtn);
		});
		nD.appendChild(newLibrary);
		mainDes.appendChild(nD);
	}
}