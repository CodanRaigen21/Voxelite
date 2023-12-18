const desc = document.querySelector('.mainWrapper');
var topic = window.location.search.toString().split('=')[0].substr(1);
var asset = window.location.search.toString().split('=')[1];
var main = eval(topic);
var range = [];
main.forEach(f => range.push(f.id.split(':')[1]));
var index = range.indexOf(asset);
//table of contents and images

var group = document.createElement('div');
group.classList.add('info-group');
te(main[index].name, 'h1');
te(main[index].id, 'h2');
genL();

let split = document.createElement('div');
split.classList.add('info-split');
let toc = document.createElement('div');
toc.classList.add('info-toc');
let tocT = document.createElement('h2');
tocT.textContent = 'Table of Contents';
toc.appendChild(tocT)
let img = document.createElement('img');
img.alt = main[index].name;
img.src = `images/content/${main[index].origin}/${topic == 'items' || topic == 'blocks' ? 'inventory' : topic}/${topic == 'entities' && main[index].attributes.variants > 0 ? main[index].images[0].split('.')[0] + '0.png' : main[index].images[0]}`;
img.classList.add('info-img');
split.appendChild(toc);
split.appendChild(img);
group.appendChild(split);
desc.appendChild(group);
genL();
ce('Description', 'h1');
desc.innerHTML += parseMarkdown(main[index].description.replaceAll('$itself', main[index].name));
ce('Attributes', 'h2');
var table = '';
table += `<table class="info-table" cellspacing="0">
	<tr><td class="it-up it-bo">name:</td><td>${main[index].name}</td></tr>
	<tr><td class="it-up it-bo">id:</td><td>${main[index].id}</td></tr>
	<tr><td class="it-up it-bo">origin:</td><td>${findOrigin(main[index].origin)}</td></tr>
	<tr><td class="it-up it-bo">type:</td><td class="it-up">${main[index].type}</td></tr>`;
if(topic == 'items'){
	table += `
	<tr><td class="it-up it-bo">max stack:</td><td>${main[index].attributes.max_stack}</td></tr>
	<tr><td class="it-up it-bo">offhand:</td><td>${main[index].attributes.offhand}</td></tr>
	<tr><td class="it-up it-bo">cooldown:</td><td>${main[index].attributes.cooldown}</td></tr>
	<tr><td class="it-up it-bo">armor:</td><td>${main[index].attributes.armor}</td></tr>
	<tr><td class="it-up it-bo">nutrition:</td><td>${main[index].attributes.nutrition}</td></tr>
	<tr><td class="it-up it-bo">durability:</td><td>${main[index].attributes.durability}</td></tr>`;
	if(main[index].attributes.damage.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.damage.length}">damage:</td><td><b>${main[index].attributes.damage[0].name}</b> - ${main[index].attributes.damage[0].value}</td></tr>`;
		for(var i = 1; i < main[index].attributes.damage.length; i++){
			table += `
	<tr><td><b>${main[index].attributes.damage[i].name}</b> - ${main[index].attributes.damage[i].value}</td></tr>`;
		}
	}
	else if(main[index].attributes.damage.length == 1){
		table += `
	<tr><td class="it-up it-bo">damage:</td><td><b>${main[index].attributes.damage[0].name}</b> - ${main[index].attributes.damage[0].value}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">damage:</td><td>0</td></tr>`;
	}
}
else if(topic == 'blocks'){
	table += `
	<tr><td class="it-up it-bo">mining time:</td><td>${main[index].attributes.mining_time}</td></tr>
	<tr><td class="it-up it-bo">explosion resistance:</td><td>${main[index].attributes.explosion_resistance}</td></tr>
	<tr><td class="it-up it-bo">flammable:</td><td>${main[index].attributes.flammable}</td></tr>
	<tr><td class="it-up it-bo">orientation:</td><td>${main[index].attributes.orientation}</td></tr>
	<tr><td class="it-up it-bo">light:</td><td>${main[index].attributes.light}</td></tr>`;
	if(main[index].attributes.loot == 'default'){
		table += `
	<tr><td class="it-up it-bo">loot:</td><td><span class="loot-icon" style="background-image:url('images/content/${main[index].origin}/inventory/${main[index].images[0]}')"></span> 1 <b>${main[index].name}</b></td></tr>`;
	}
	else if(main[index].attributes.loot.length == 0){
		table += `
	<tr><td class="it-up it-bo">loot:</td><td><b>None</b></td></tr>`;
	}
	else{
		let l = main[index].attributes.loot[0].asset.split(':');
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.loot.length}">loot:</td><td><span class="loot-icon" style="background-image:url('images/content/${l[0] == 'minecraft' ? 'minecraft' : referenceAsset(main[index].attributes.loot[0].asset).origin}/inventory/${l[1]}.png')"></span> ${main[index].attributes.loot[0].amount} <b>${main[index].attributes.loot[0].asset.split(':')[1].replaceAll('_', ' ')}</b>${main[index].attributes.loot[0].condition != '' ? '\n(' + main[index].attributes.loot[0].condition + ')' : ''}</td></tr>`;
		if(main[index].attributes.loot.length > 1){
			for(var i = 1; i < main[index].attributes.loot.length; i++){
				let l = main[index].attributes.loot[i].asset.split(':');
				table += `
	<tr><td><span class="loot-icon" style="background-image:url('images/content/${l[0] == 'minecraft' ? 'minecraft' : referenceAsset(main[index].attributes.loot[i].asset).origin}/inventory/${l[1]}.png')"></span> ${main[index].attributes.loot[i].amount} <b>${main[index].attributes.loot[i].asset.split(':')[1].replaceAll('_', ' ')}</b>${main[index].attributes.loot[i].condition != '' ? '\n(' + main[index].attributes.loot[i].condition + ')' : ''}</td></tr>`;
			}
		}
	}
}
else if(topic == 'entities'){
	table += `
	<tr><td class="it-up it-bo">variants:</td><td>${main[index].attributes.variants}</td></tr>`;
	if(main[index].attributes.health.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.health.length}">health:</td><td><b>${main[index].attributes.health[0].name}</b> - ${main[index].attributes.health[0].value}</td></tr>`;
		for(var i = 1; i < main[index].attributes.health.length; i++){
			table += `
	<tr><td><b>${main[index].attributes.health[i].name}</b> - ${main[index].attributes.health[i].value}</td></tr>`;
		}
	}
	else if(main[index].attributes.health.length == 1){
		table += `
	<tr><td class="it-up it-bo">health:</td><td><b>${main[index].attributes.health[0].name}</b> - ${main[index].attributes.health[0].value}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">health:</td><td>0</td></tr>`;
	}
	if(main[index].attributes.damage.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.damage.length}">damage:</td><td><b>${main[index].attributes.damage[0].name}</b> - ${main[index].attributes.damage[0].value}</td></tr>`;
		for(var i = 1; i < main[index].attributes.damage.length; i++){
			table += `
	<tr><td><b>${main[index].attributes.damage[i].name}</b> - ${main[index].attributes.damage[i].value}</td></tr>`;
		}
	}
	else if(main[index].attributes.damage.length == 1){
		table += `
	<tr><td class="it-up it-bo">damage:</td><td><b>${main[index].attributes.damage[0].name}</b> - ${main[index].attributes.damage[0].value}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">damage:</td><td>0</td></tr>`;
	}
	if(main[index].attributes.immunities.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.immunities.length}">immunities:</td><td>${main[index].attributes.immunities[0]}</td></tr>`;
		for(var i = 1; i < main[index].attributes.immunities.length; i++){
			table += `
	<tr><td>${main[index].attributes.immunities[i]}</td></tr>`;
		}
	}
	else if(main[index].attributes.immunities.length == 1){
		table += `
	<tr><td class="it-up it-bo">immunities:</td><td>${main[index].attributes.immunities[0]}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">immunities:</td><td><b>none</b></td></tr>`;
	}
	if(main[index].attributes.weaknesses.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.weaknesses.length}">weaknesses:</td><td>${main[index].attributes.weaknesses[0]}</td></tr>`;
		for(var i = 1; i < main[index].attributes.weaknesses.length; i++){
			table += `
	<tr><td>${main[index].attributes.weaknesses[i]}</td></tr>`;
		}
	}
	else if(main[index].attributes.weaknesses.length == 1){
		table += `
	<tr><td class="it-up it-bo">weaknesses:</td><td>${main[index].attributes.weaknesses[0]}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">weaknesses:</td><td><b>none</b></td></tr>`;
	}
	if(main[index].attributes.targets.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.targets.length}">targets:</td><td>${main[index].attributes.targets[0]}</td></tr>`;
		for(var i = 1; i < main[index].attributes.targets.length; i++){
			table += `
	<tr><td>${main[index].attributes.targets[i]}</td></tr>`;
		}
	}
	else if(main[index].attributes.targets.length == 1){
		table += `
	<tr><td class="it-up it-bo">targets:</td><td>${main[index].attributes.targets[0]}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">targets:</td><td><b>none</b></td></tr>`;
	}
	if(main[index].attributes.loot == 'default'){
		table += `
	<tr><td class="it-up it-bo">loot:</td><td><span class="loot-icon" style="background-image:url('images/content/${main[index].origin}/inventory/${main[index].images[0]}')"></span> 1 <b>${main[index].name}</b></td></tr>`;
	}
	else if(main[index].attributes.loot.length == 0){
		table += `
	<tr><td class="it-up it-bo">loot:</td><td><b>None</b></td></tr>`;
	}
	else{
		let l = main[index].attributes.loot[0].asset.split(':');
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.loot.length}">loot:</td><td><span class="loot-icon" style="background-image:url('images/content/${l[0] == 'minecraft' ? 'minecraft' : referenceAsset(main[index].attributes.loot[0].asset).origin}/inventory/${l[1]}.png')"></span> ${main[index].attributes.loot[0].amount} <b>${main[index].attributes.loot[0].asset.split(':')[1].replaceAll('_', ' ')}</b>${main[index].attributes.loot[0].condition != '' ? '\n(' + main[index].attributes.loot[0].condition + ')' : ''}</td></tr>`;
		if(main[index].attributes.loot.length > 1){
			for(var i = 1; i < main[index].attributes.loot.length; i++){
				let l = main[index].attributes.loot[i].asset.split(':');
				table += `
	<tr><td><span class="loot-icon" style="background-image:url('images/content/${l[0] == 'minecraft' ? 'minecraft' : referenceAsset(main[index].attributes.loot[i].asset).origin}/inventory/${l[1]}.png')"></span> ${main[index].attributes.loot[i].amount} <b>${main[index].attributes.loot[i].asset.split(':')[1].replaceAll('_', ' ')}</b>${main[index].attributes.loot[i].condition != '' ? '\n(' + main[index].attributes.loot[i].condition + ')' : ''}</td></tr>`;
			}
		}
	}
}
else if(topic == 'structures'){
	if(main[index].attributes.biomes.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.biomes.length}">biomes:</td><td>${main[index].attributes.biomes[0]}</td></tr>`;
		for(var i = 1; i < main[index].attributes.biomes.length; i++){
			table += `
	<tr><td>${main[index].attributes.biomes[i]}</td></tr>`;
		}
	}
	else if(main[index].attributes.biomes.length == 1){
		table += `
	<tr><td class="it-up it-bo">biomes:</td><td>${main[index].attributes.biomes[0]}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">biomes:</td><td><b>none</b></td></tr>`;
	}
	if(main[index].attributes.entities.length > 1){
		table += `
	<tr><td class="it-up it-bo" rowspan="${main[index].attributes.entities.length}">entities:</td><td>${main[index].attributes.entities[0]}</td></tr>`;
		for(var i = 1; i < main[index].attributes.entities.length; i++){
			table += `
	<tr><td>${main[index].attributes.entities[i]}</td></tr>`;
		}
	}
	else if(main[index].attributes.entities.length == 1){
		table += `
	<tr><td class="it-up it-bo">entities:</td><td>${main[index].attributes.entities[0]}</td></tr>`;
	}
	else{
		table += `
	<tr><td class="it-up it-bo">entities:</td><td><b>none</b></td></tr>`;
	}
}
table +=`
</table>`;
console.log()
desc.innerHTML += table;
if(topic == 'entities'){
	ce('Spawning', 'h2');
	main[index].attributes.spawns.forEach(s =>{
		desc.innerHTML += `<h3 class="toc-link" id="${s.value}">${s.value}</h3>
<p class="info-item"><b>Weight</b>: ${s.weight}</p>
<p class="info-item"><b>Difficulty</b>: ${s.difficulty}</p>
<p class="info-item"><b>Brightness</b>: ${s.brightness}</p>
`;
	});
}
genL();
let ingredientList = [];
let ingredient = false;
let resultList = [];
let result = false;
recipes.forEach(r =>{
	//finding inputs and patterns to add the "ingredient" subdivider
	if(r.type == 'crafting'){ if(r.pattern.includes(main[index].id)){ ingredient = true; ingredientList.push(r); } }
	else{ if(r.input == main[index].id){ ingredient = true; ingredientList.push(r); } }
	if(r.result == main[index].id){ result = true; resultList.push(r); }
});
if(ingredient || result){
	ce('Recipes', 'h1');
	if(ingredient){
		ce('Used to Craft', 'h2');
		desc.appendChild(createPanels(ingredientList));
	}
	if(result){
		ce('How to Craft', 'h2');
		desc.appendChild(createPanels(resultList));
	}
}
//gallery
if(main[index].images.length > 1 || (topic == 'entities' && main[index].attributes.variants > 0)){
	ce('Gallery', 'h1');
	var gr = document.createElement('div');
	gr.classList.add('gallery-wrapper');
	var rg = 0;
	main[index].images.forEach(i => {
		if(rg == 0 && topic == 'entities'){
			for(var b = 0; b < main[index].attributes.variants; b++){
				let gi = document.createElement('img');
				gi.alt = `${i.split('.')[0].replaceAll('_', ' ')} ${b}`;
				gi.src = `images/content/${main[index].origin}/entities/${i.split('.')[0]}${b}.png`;
				gi.classList.add('gallery-image');
				gr.appendChild(gi);
			}
		}
		else{
			let gi = document.createElement('img');
			gi.alt = i.split('.')[0].replaceAll('_', ' ');
			gi.src = `images/content/${main[index].origin}/${topic == 'items' || topic == 'blocks' ? 'inventory' : topic}/${i}`;
			gi.classList.add('gallery-image');
			gr.appendChild(gi);
		}
		rg++
	});
	desc.appendChild(gr);
	genL();
}

function genL(){
	let line = document.createElement('hr');
	line.classList.add('info-line');
	desc.appendChild(line);
}
function te(d, e){
	let ele = document.createElement(e);
	ele.textContent = d;
	desc.appendChild(ele);
}
function ce(d, e){
	let a = d.toLowerCase().replaceAll(' ', '_');
	let ele = document.createElement(e);
	ele.classList.add('toc-link');
	ele.id = a;
	ele.textContent = d;
	desc.appendChild(ele);
}

function createPanels(list){
	let div = document.createElement('div');
	div.classList.add('recipe-wrapper');
	list.forEach(l => {
		let panelWrapper = document.createElement('div');
		panelWrapper.classList.add('panelWrapper');
		let panel = document.createElement('div');
		panel.classList.add('panel');
		for(var i = 0; i < 15; i++){
			let craftingCell = document.createElement('div');
			let crRes = l.result.split(':');
			
			if(l.type == 'crafting'){
				var crCellList = [0, 1, 2, 5, 6, 7, 9, 10, 11, 12];
				var imgList = [0, 1, 2, 5, 6, 7, 10, 11, 12];
			}
			if(l.type == 'smelting' || l.type == 'stonecutting'){ var crCellList = [6, 8]; var crInp = l.input.split(':'); }
			if(l.type == 'brewing'){ var crCellList = [1, 5, 6, 8, 11]; var crInp = l.input.split(':');; var crRea = l.reagent.split(':'); }
			if(l.type == 'smithing'){ var crCellList = [5, 6, 7, 9]; }
			crCellList.forEach(ccl => {
				i == ccl ? craftingCell.classList.add('craftingCell') : craftingCell.classList.add('emptyCell');
			});
			
			if(l.type == 'crafting'){
				if(i == 9){ getRes(l.amount, craftingCell); }
				i == 8 ? craftingCell.style.backgroundImage = 'var(--craftingIcon)' : null;
				imgList.forEach(il =>{
					if(l.pattern[imgList.indexOf(il)].length > 0){
						i == il ? craftingCell.style.backgroundImage = `url('images/content/${contFold(l.pattern[imgList.indexOf(il)])}/inventory/${l.pattern[imgList.indexOf(il)].split(':')[1]}.png')` : null;
					}
				});
			}
			if(l.type == 'smelting' || l.type == 'stonecutting'){
				if(l.type == 'smelting'){
					let lt = l.intensity[i] ? l.intensity[i].split(':')[1] : false;
					lt ? craftingCell.style.backgroundImage = `url('images/content/minecraft/inventory/${lt}.png')` : null;
				}
				if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.input)}/inventory/${getItem(l.input)}.png')`; }
				if(i == 7){ l.type == 'smelting' ? craftingCell.style.backgroundImage = 'var(--smeltingIcon)' : craftingCell.style.backgroundImage = 'var(--stonecuttingIcon)'; }
				if(i == 8){ getRes(l.amount, craftingCell); }
			}
			if(l.type == 'brewing'){
				if(i == 5){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.reagent)}/inventory/${getItem(l.reagent)}.png')` }
				if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.input)}/inventory/${getItem(l.input)}.png')` }
				i == 7 ? craftingCell.style.backgroundImage = 'var(--brewingIcon)' : null;
				if(i == 8){ getRes(l.amount, craftingCell); }
			}
			if(l.type == 'smithing'){
				if(i == 5){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.template)}/inventory/${getItem(l.template)}.png')`; }
				if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.base)}/inventory/${getItem(l.base)}.png')`; }
				if(i == 7){ craftingCell.style.backgroundImage = `url('images/content/${contFold(l.modder)}/inventory/${getItem(l.modder)}.png')`; }
				i == 8 ? craftingCell.style.backgroundImage = 'var(--smithingIcon)' : null;
				if(i == 9){ getRes(l.amount, craftingCell); }
			}
			
			function getRes(amt, cc){
				if(amt > 1){
					let resAmt = document.createElement('span');
					resAmt.textContent = amt;
					resAmt.classList.add('resultAmount');
					cc.appendChild(resAmt);
				}
				craftingCell.style.backgroundImage = `url('images/content/${contFold(l.result)}/inventory/${crRes[1]}.png')`;
			}
			if(craftingCell.classList.contains('craftingCell')){
				craftingCell.classList.remove('emptyCell');
			}
			panel.appendChild(craftingCell);
		}
		
		let pInfo = document.createElement('div');
		pInfo.classList.add('panelInfo');
		let ingP = document.createElement('p');
		var non = [ 'smelting', 'brewing', 'smithing' ];
		if(!non.includes(l.type)){
			ingP.textContent = `Result: ${l.amount} – ${l.result.split(':')[1].replaceAll('_', ' ')}`;
		}
		else{
			ingP.textContent = `Result: ${l.result.split(':')[1].replaceAll('_', ' ')}`;
		}
		pInfo.appendChild(ingP);
		if(l.type == 'crafting'){
			let ings = document.createElement('p');
			ings.textContent = 'Ingredients:';
			var counts = {};
			var totalIngredients = l.pattern;
			totalIngredients.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
			var keys = Array.from(Object.keys(counts));
			for(var m = 0; m < keys.length; m++){
				if(keys[m] != ''){
					ings.textContent += `\n • ${counts[keys[m]]} – ${keys[m].split(':')[1].replaceAll('_', ' ')}`;
				}
			}
			let ingT = document.createElement('p');
			ingT.textContent = `Tool: ${l.tool.split(':')[1].replaceAll('_', ' ')}`;
			pInfo.appendChild(ingT);
			pInfo.appendChild(ings);
		}
		if(l.type == 'stonecutting'){
			let ingP = document.createElement('p');
			ingP.textContent = `Input: ${l.input.split(':')[1].replaceAll('_', ' ')}`;
			let ingT = document.createElement('p');
			ingT.textContent = 'Tool: Stonecutter';
			pInfo.appendChild(ingP);
			pInfo.appendChild(ingT);
		}
		if(l.type == 'smelting'){
			let ingP = document.createElement('p');
			ingP.textContent = `Input: ${l.input.split(':')[1].replaceAll('_', ' ')}`;
			let ingT = document.createElement('p');
			if(l.intensity.length == 1){
				ingT.textContent = `Tool: ${l.intensity[0].replaceAll('_', ' ')}`
			}
			else{
				ingT.textContent = 'Tools: ';
				l.intensity.forEach(ci =>{
					ingT.textContent += `\n • ${ci.replaceAll('_', ' ')}`;
				});
			}
			pInfo.appendChild(ingP);
			pInfo.appendChild(ingT);
		}
		if(l.type == 'brewing'){
			let brewingInput = document.createElement('p');
			brewingInput.textContent = `Input: ${l.input.split(':')[1].replaceAll('_', ' ')}`;
			let brewingReagent = document.createElement('p');
			brewingReagent.textContent = `Reagent: ${l.reagent.split(':')[1].replaceAll('_', ' ')}`;
			let ingT = document.createElement('p');
			ingT.textContent = 'Tool: Brewing Stand';
			pInfo.appendChild(brewingInput);
			pInfo.appendChild(brewingReagent);
			pInfo.appendChild(ingT);
		}
		if(l.type == 'smithing'){
			let smithingTemplate = document.createElement('p');
			smithingTemplate.textContent = `Template: ${l.template.split(':')[1].replaceAll('_', ' ')}`;
			let smithingBase = document.createElement('p');
			smithingBase.textContent = `Base: ${l.base.split(':')[1].replaceAll('_', ' ')}`;
			let smithingModder = document.createElement('p');
			smithingModder.textContent = `Addition: ${l.modder.split(':')[1].replaceAll('_', ' ')}`;
			let ingT = document.createElement('p');
			ingT.textContent = 'Tool: Smithing Table';
			pInfo.appendChild(smithingTemplate);
			pInfo.appendChild(smithingBase);
			pInfo.appendChild(smithingModder);
			pInfo.appendChild(ingT);
		}
		panelWrapper.appendChild(pInfo);
		panelWrapper.appendChild(panel)
		div.appendChild(panelWrapper);
	});
	return div;
}

function contFold(l){
	return l.search('minecraft') > -1 ? 'minecraft' : referenceAsset(l).origin;
}
function getItem(l){
	return l.split(':')[1];
}

function findOrigin(s){
	var str = '';
	addonsList.forEach(a =>{ if(a.flat == s){ str = a.title; } });
	return str;
}
document.querySelectorAll('.panelWrapper').forEach(pr => {
	pr.addEventListener('click', event =>{
		var mpa = pr.querySelector('.panel');
		mpa.classList.contains('transparent') ? mpa.classList.remove('transparent') : mpa.classList.add('transparent');
	});
});

//toc link generation
let h1l = 0;
let h2l = 0;
let h3l = 0;
document.querySelectorAll('.toc-link').forEach(s =>{
	let pL = document.createElement('a');
	pL.href = `#${s.id}`;
	if(s.tagName == 'H1'){ pL.classList.add('tocp-1'); h1l++; h2l = 0; h3l = 0; }
	else if(s.tagName == 'H2'){ pL.classList.add('tocp-2'); h2l++; h3l = 0; }
	else if(s.tagName == 'H3'){ pL.classList.add('tocp-3'); h3l++; }
	pL.innerHTML = `<span class="toc-numbers">${h1l}.${h2l}.${h3l}</span> ${s.textContent}`;
	document.querySelector('.info-toc').appendChild(pL);
});