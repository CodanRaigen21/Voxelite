var cells = document.querySelectorAll('.libraryCell');

cells.forEach(c => {
	c.addEventListener('click', event => {
		!document.querySelector('.dataWrapper') ? null : document.querySelector('.dataWrapper').remove();
		pages.forEach(p => p.style.display = 'none');
		//creates the data wrapper
		var newDataWrapper = document.createElement('div');
		newDataWrapper.classList.add('descWrapper', 'dataWrapper');
		newDataWrapper.dataset.page = c.dataset.id;
		var cPage = c.parentNode.parentNode.dataset.page;
		var cellData = cPage == 'description' ? null : `collected[0].content.${cPage}`;
		var cData = eval(cellData);
		
		if(cellData != null){
			var foundCell = cData.filter(k => k.id.indexOf(c.dataset.id) > -1)[0];
			let nameHeading = document.createElement('h1');
			nameHeading.textContent = foundCell.name;
			newDataWrapper.appendChild(nameHeading);
			let detailSubheading = document.createElement('h2');
			detailSubheading.textContent = 'Details';
			newDataWrapper.appendChild(detailSubheading);
			let contentDetails = document.createElement('div');
			contentDetails.classList.add('contentDetails');
			let newTable = document.createElement('table');
			newTable.cellSpacing = 0;
			newTable.classList.add('contentTable');
			let common = [
				'name',
				'id'
			];
			common.forEach(cc => {
				let ccL = eval(`foundCell.${cc}`);
				let tr = document.createElement('tr');
				let th = document.createElement('th');
				let td = document.createElement('td');
				th.textContent = cc;
				td.textContent = ccL;
				tr.appendChild(th);	
				tr.appendChild(td);
				newTable.appendChild(tr);
			});
			
			var craftingIngredient = [];
			var craftingResult = [];
			
			if(collected[0].crafting.length > 0){
				collected[0].crafting.forEach(c => {
					//finding ingredients and results where the cell is present
					//finds if the cell data's id is found within the crafting ingredients
					//which is strange..
					let query = foundCell.id.split(':')[1];
					let tm = !c.template ? null : c.template.split('/')[1];
					let base = !c.base ? null : c.base.split('/')[1];
					let modd = !c.modder ? null : c.modder.split('/')[1];
					let reag = !c.reagent ? null : c.reagent.split('/')[1];
					let inp = !c.input ? null : c.input.split('/')[1];
					let res = c.result.split('/')[1];
					if(c.type == 'crafting'){
						for(var l = 0; l < c.pattern.length; l++){
							if(c.pattern[l].split('/')[1] == query){
								craftingIngredient.push(c);
								break;
							}
						};
						if(res == query){ craftingResult.push(c); }
					}
					if(c.type == 'stonecutting' || c.type == 'smelting'){
						if(inp == query){ craftingIngredient.push(c); }
						if(res == query){ craftingResult.push(c); }
					}
					if(c.type == 'brewing'){
						if(inp == query || reag == query){ craftingIngredient.push(c); }
						if(res == query){ craftingResult.push(c); }
					}
					if(c.type == 'smithing'){
						if(inp == tm || inp == base || inp == modd){ craftingIngredient.push(c); }
						if(res == query){ craftingResult.push(c); }
					}
				});
			}
			
			//creates a table for items and blocks
			if(cPage == 'items' || cPage == 'blocks'){
				let tr = document.createElement('tr');
				let th = document.createElement('th');
				let td = document.createElement('td');
				th.textContent = 'Group';
				td.textContent = foundCell.type;
				tr.appendChild(th);	
				tr.appendChild(td);
				newTable.appendChild(tr);
				
				if(cPage == 'items'){
					let necCon = [
						'max_stack',
						'cooldown',
						'offhand',
						'armor',
						'nutrition',
						'durability',
						'damage'
					];
					//creates table rows for the content
					necCon.forEach(ncc => {
						let ind = eval(`foundCell.${ncc}`);
						let tr = document.createElement('tr');
						let th = document.createElement('th');
						let td = document.createElement('td');
						//simple data
						if(ncc != 'damage'){
							if(ind.toString() != '0'){
								if(ncc == 'Type'){ th.textContent = 'Group'; }
								else{ th.textContent = ncc.replace('_', ' '); }
								td.textContent = ind;
								tr.appendChild(th);
								tr.appendChild(td);
								newTable.appendChild(tr);
							}
						}
						//damage data
						if(ncc == 'damage' && ind.length != 0){
							th.textContent = ncc;
							let subTable = document.createElement('table');
							subTable.classList.add('subTable');
							subTable.cellSpacing = 0;
							ind.forEach(sub => {
								let subTr = document.createElement('tr');
								let subTh = document.createElement('th');
								let subTd = document.createElement('td');
								subTh.textContent = sub.name;
								subTd.textContent = sub.value;
								subTr.appendChild(subTh);
								subTr.appendChild(subTd);
								subTable.appendChild(subTr);
							});
							td.appendChild(subTable);
							tr.appendChild(th);
							tr.appendChild(td);
							newTable.appendChild(tr);
						}
					});
				}
				if(cPage == 'blocks'){
					let necCon = [
						'mining_time',
						'explosion_resistance',
						'flammable',
						'light',
						'orientation',
						'type'
					];
					//creates table rows for the content
					necCon.forEach(ncc => {
						let ind = eval(`foundCell.${ncc}`);
						let tr = document.createElement('tr');
						let th = document.createElement('th');
						let td = document.createElement('td');
						//simple data
						if(ind.toString() != '0'){
							if(ncc == 'Type'){ th.textContent = 'Group'; }
							else{ th.textContent = ncc.replace('_', ' '); }
							td.textContent = ind;
							tr.appendChild(th);
							tr.appendChild(td);
							newTable.appendChild(tr);
						}
					});
					//Loot data
					let tr = document.createElement('tr');
					let th = document.createElement('th');
					let td = document.createElement('td');
					th.textContent = 'Loot';
					let subTable = document.createElement('table');
					subTable.classList.add('subTable');
					subTable.cellSpacing = 0;
					if(foundCell.loot == 'default'){
						td.textContent = `1\t${foundCell.name}`;
					}
					else if(foundCell.loot.length > 0){
						let sub = foundCell.loot;
						if(sub.length == 1){
							let nccDesc = sub[0].description != '' ? ` (${sub[0].description})` : '';
							let nccCond = sub[0].condition != '' ? ` (${sub[0].condition})` : '';
							td.textContent = `${sub[0].amount}\t${sub[0].name}${nccDesc}${nccCond}`;
						}
						else{
							sub.forEach(l =>{
								let nccDesc = l.description != '' ? ` (${l.description})` : '';
								let nccCond = l.condition != '' ? ` (${l.condition})` : '';
								if(td.textContent == ''){
									td.textContent = ` • ${l.amount}\t${l.name}${nccDesc}${nccCond}`;
								}
								else{
									td.textContent += `\n • ${l.amount}\t${l.name}${nccDesc}${nccCond}`;
								}
							});
						}
					}
					else if(foundCell.loot == '' || foundCell.loot.length == 0){
						td.textContent = 'None';
					}
					tr.appendChild(th);
					tr.appendChild(td);
					newTable.appendChild(tr);
				}
				
				//checks for crafting
				if(craftingIngredient.length == 0 && craftingResult.length == 0){
					let tr = document.createElement('tr');
					let th = document.createElement('th');
					let td = document.createElement('td');
					th.textContent = 'Crafting';
					td.textContent = 'None';
					tr.appendChild(th);	
					tr.appendChild(td);
					newTable.appendChild(tr)
				}
				
				//content image generation
				setTimeout(function(){
					let contentImages = document.createElement('div');
					contentImages.classList.add('contentImages');
					let contentImagesWrapper = document.createElement('div');
					contentImagesWrapper.classList.add('contentImagesWrapper');
					let imgMain = document.createElement('img');
					imgMain.src = `images/content/${name}/inventory/${foundCell.id.split(':')[1]}.png`;
					contentImagesWrapper.appendChild(imgMain);
					contentImages.appendChild(contentImagesWrapper);
					if(foundCell.model){
						let imgModel = document.createElement('img');
						imgModel.src = `images/content/${name}/inventory/${foundCell.id.split(':')[1]}_model.png`;
						contentImagesWrapper.appendChild(imgModel);
					}
					contentDetails.appendChild(contentImages);
				},1);
			}
			if(cPage == 'entities'){
				let necCon = [
					'type',
					'health',
					'damage',
					'weaknesses',
					'immunities',
					'targets',
					'spawns',
					'loot'
				];
				//creates table rows for the content
				necCon.forEach(ncc => {
					let ind = eval(`foundCell.${ncc}`);
					let tr = document.createElement('tr');
					let th = document.createElement('th');
					let td = document.createElement('td');
					if(ncc == 'health' || ncc == 'damage'){
						if(ind.length == 0) return;
						th.textContent = ncc;
						if(ind.length == 1){
							td.textContent = ind[0].value;
						}
						else{
							let subTable = document.createElement('table');
							subTable.classList.add('subTable');
							subTable.cellSpacing = 0;
							ind.forEach(sub => {
								let subTr = document.createElement('tr');
								let subTh = document.createElement('th');
								let subTd = document.createElement('td');
								subTh.textContent = sub.name;
								subTd.textContent = sub.value;
								subTr.appendChild(subTh);
								subTr.appendChild(subTd);
								subTable.appendChild(subTr);
							});
							td.appendChild(subTable);
						}
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
					else if(ncc == 'spawns'){
						th.textContent = ncc;
						if(ind.length == 0){
							td.textContent = 'Nowhere';
						}
						else{
							let subTable = document.createElement('table');
							subTable.classList.add('subTable');
							subTable.cellSpacing = 0;
							ind.forEach(sub => {
								let subTr = document.createElement('tr');
								let subTh = document.createElement('th');
								let subTd = document.createElement('td');
								subTh.textContent = sub.name;
								if(sub.value == ''){
									subTd.textContent = ` • ${sub.difficulty.toUpperCase()}\n • Light Level: ${sub.brightness}\n • Spawn Weight: ${sub.weight}`;
								}
								else{
									subTd.textContent = ` • ${sub.value}\n • ${sub.difficulty.toUpperCase()}\n • Light Level: ${sub.brightness}\n • Spawn Weight: ${sub.weight}`;
								}
								subTd.appendChild(document.createElement('br'));
								let meter = document.createElement('span');
								let col = document.querySelector(':root');
								meter.title = `${foundCell.name}'s spawn weight in the ${sub.name} is ${sub.weight}`;
								col.style.setProperty('--entitySubject', `url('../images/content/${name}/entities/${foundCell.id.split(':')[1]}${foundCell.variants > 1 ? '0' : ''}.png')`);
								meter.style.backgroundPosition = `${sub.weight >= 100 ? 100 : sub.weight}% center, 40% center, 100% center, bottom left`;
								subTd.appendChild(meter);
								subTr.appendChild(subTh);
								subTr.appendChild(subTd);
								subTable.appendChild(subTr);
							});
							td.appendChild(subTable);
						}
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
					else if(ncc == 'weaknesses' || ncc == 'immunities' || ncc == 'targets'){
						if(ind.length == 0) return;
						th.textContent = ncc;
						if(ncc == 'targets'){ td.classList.add('targetTd') }
						if(ind.length == 1){
							td.textContent = ind[0];
						}
						else{
							ind.forEach(n =>{
								td.textContent == '' ? td.textContent = ` • ${n}` : td.textContent += `\n • ${n}`;
							});
						}
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
					else if(ncc == 'loot'){
						th.textContent = ncc;
						if(ind.length == 0) return;
						if(ind.length == 1){
							let nccDesc = ind[0].description != '' ? ` (${ind[0].description})` : '';
							let nccCond = ind[0].condition != '' ? ` (${ind[0].condition})` : '';
							td.textContent = `${ind[0].amount}\t${ind[0].name}${nccDesc}${nccCond}`;
						}
						else{
							ind.forEach(l =>{
								let nccDesc = l.description != '' ? ` (${l.description})` : '';
								let nccCond = l.condition != '' ? ` (${l.condition})` : '';
								if(td.textContent == ''){
									td.textContent = ` • ${l.amount}\t${l.name}${nccDesc}${nccCond}`;
								}
								else{
									td.textContent += `\n • ${l.amount}\t${l.name}${nccDesc}${nccCond}`;
								}
							});
						}
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
					else{
						if(ind.toString() == '0') return;
						if(ncc == 'Type'){ th.textContent = 'Group'; }
						else{ th.textContent = ncc.replace('_', ' '); }
						td.textContent = ind;
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
				});
				setTimeout(function(){
					let contentImages = document.createElement('div');
					contentImages.classList.add('contentImages');
					let contentImagesWrapper = document.createElement('div');
					contentImagesWrapper.classList.add('contentImagesWrapper');
					let imgMain = document.createElement('img');
					imgMain.src = `images/content/${name}/entities/${foundCell.id.split(':')[1]}${foundCell.variants > 1 ? '0' : ''}.png`;
					contentImagesWrapper.appendChild(imgMain);
					contentImages.appendChild(contentImagesWrapper);
					
					if(foundCell.variants > 1){
						var varDiv = document.createElement('div');
						varDiv.classList.add('variantsDiv');
						let varWrapper = document.createElement('div');
						varWrapper.classList.add('variantsWrapper');
						for(var g = 0; g < foundCell.variants;	g++){
							let varCell = document.createElement('div');
							varCell.classList.add('variantCell');
							varCell.dataset.ndx = g;
							let varImg = document.createElement('div');
							varImg.style.backgroundImage = `url('images/content/${name}/entities/${foundCell.id.split(':')[1]}${g}.png')`;
							varCell.appendChild(varImg);
							varWrapper.appendChild(varCell);
						}
						varDiv.appendChild(varWrapper);
						contentImagesWrapper.appendChild(varDiv);
						setTimeout(function(){
							document.querySelectorAll('.variantCell').forEach(vc =>{
								vc.addEventListener('click', event =>{
									document.querySelector('.contentImages img').src = `images/content/${name}/entities/${foundCell.id.split(':')[1]}${vc.dataset.ndx}.png`;
								});
							});
						}, 1);
					}
					contentDetails.appendChild(contentImages);
				}, 1);
			}
			if(cPage == 'structures'){
				let necCon = [
					'type',
					'dimensions',
					'biomes',
					'entities'
				];
				//creates table rows for the content
				necCon.forEach(ncc => {
					let ind = eval(`foundCell.${ncc}`);
					let tr = document.createElement('tr');
					let th = document.createElement('th');
					let td = document.createElement('td');
					if(ncc != 'type'){
						if(ind.length == 0) return;
						th.textContent = ncc;
						if(ind.length == 1){
							td.textContent = ind[0];
						}
						else{
							ind.forEach(n =>{
								td.textContent == '' ? td.textContent = ` • ${n}` : td.textContent += `\n • ${n}`;
							});
						}
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
					else{
						th.textContent = ncc;
						td.textContent = ind;
						tr.appendChild(th);
						tr.appendChild(td);
						newTable.appendChild(tr);
					}
				});
				setTimeout(function(){
					let contentImages = document.createElement('div');
					contentImages.classList.add('contentImages');
					let contentImagesWrapper = document.createElement('div');
					contentImagesWrapper.classList.add('contentImagesWrapper');
					let imgMain = document.createElement('img');
					imgMain.src = `images/content/${name}/structures/${foundCell.id.split(':')[1]}${foundCell.variants > 1 ? '0' : ''}.png`;
					contentImagesWrapper.appendChild(imgMain);
					contentImages.appendChild(contentImagesWrapper);
					contentDetails.appendChild(contentImages);
				}, 1);
			}
			newDataWrapper.appendChild(contentDetails);
			contentDetails.appendChild(newTable);
			
			if(craftingIngredient.length > 0 || craftingResult.length > 0){
				let craftingHeading = document.createElement('h2');
				craftingHeading.textContent = 'Crafting';
				newDataWrapper.appendChild(craftingHeading);
				
				let craftDiv = document.createElement('div');
				craftDiv.classList.add('craftDiv');
				if(craftingIngredient.length > 0){
					let cDiv = document.createElement('div');
					cDiv.classList.add('craftingSection');
					let cHeading = document.createElement('h3');
					cHeading.textContent = 'used to craft:';
					cDiv.appendChild(cHeading);
					let cellColDiv = document.createElement('div');
					cellColDiv.classList.add('cellCollectionDiv');
					craftingIngredient.forEach(c =>{
						createPanels(c, cellColDiv);
					});
					cDiv.appendChild(cellColDiv);
					craftDiv.appendChild(cDiv);
				}
				if(craftingResult.length > 0){
					let cDiv = document.createElement('div');
					cDiv.classList.add('craftingSection');
					let cHeading = document.createElement('h3');
					cHeading.textContent = 'how to craft:';
					cDiv.appendChild(cHeading);
					let cellColDiv = document.createElement('div');
					cellColDiv.classList.add('cellCollectionDiv');
					craftingResult.forEach(c =>{
						createPanels(c, cellColDiv);
					});
					cDiv.appendChild(cellColDiv);
					craftDiv.appendChild(cDiv);
				}
				
				function createPanels(cin, par){
					let panelWrapper = document.createElement('div');
					panelWrapper.classList.add('panelWrapper');
					let panel = document.createElement('div');
					panel.classList.add('panel');
					
					for(var i = 0; i < 15; i++){
						let craftingCell = document.createElement('div');
						let crRes = cin.result.split('/');
						
						if(cin.type == 'crafting'){
							var crCellList = [0, 1, 2, 5, 6, 7, 9, 10, 11, 12];
							var imgList = [0, 1, 2, 5, 6, 7, 10, 11, 12];
						}
						if(cin.type == 'smelting' || cin.type == 'stonecutting'){ var crCellList = [6, 8]; var crInp = cin.input.split('/'); }
						if(cin.type == 'brewing'){ var crCellList = [1, 5, 6, 8, 11]; var crInp = cin.input.split('/');; var crRea = cin.reagent.split('/'); }
						if(cin.type == 'smithing'){ var crCellList = [5, 6, 7, 9]; }
						crCellList.forEach(ccl => {
							i == ccl ? craftingCell.classList.add('craftingCell') : craftingCell.classList.add('emptyCell');
						});
						
						if(cin.type == 'crafting'){
							if(i == 9){ getRes(cin.amount, craftingCell); }
							i == 8 ? craftingCell.style.backgroundImage = 'var(--craftingIcon)' : null;
							imgList.forEach(il =>{
								if(cin.pattern[imgList.indexOf(il)].length > 0){
									i == il ? craftingCell.style.backgroundImage = `url('images/content/${cin.pattern[imgList.indexOf(il)].split('/')[0]}/inventory/${cin.pattern[imgList.indexOf(il)].split('/')[1]}.png')` : null;
								}
							});
						}
						if(cin.type == 'smelting' || cin.type == 'stonecutting'){
							if(cin.type == 'smelting'){
								let cint = cin.intensity[i] ? cin.intensity[i].split('/')[1] : false;
								cint ? craftingCell.style.backgroundImage = `url('images/content/minecraft/inventory/${cint}.png')` : null;
							}
							if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${crInp[0]}/inventory/${crInp[1]}.png')`; }
							if(i == 7){ cin.type == 'smelting' ? craftingCell.style.backgroundImage = 'var(--smeltingIcon)' : craftingCell.style.backgroundImage = 'var(--stonecuttingIcon)'; }
							if(i == 8){ getRes(cin.amount, craftingCell); }
						}
						if(cin.type == 'brewing'){
							if(i == 5){ craftingCell.style.backgroundImage = `url('images/content/${crRea[0]}/inventory/${crRea[1]}.png')` }
							if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${crInp[0]}/inventory/${crInp[1]}.png')` }
							i == 7 ? craftingCell.style.backgroundImage = 'var(--brewingIcon)' : null;
							if(i == 8){ getRes(cin.amount, craftingCell); }
						}
						if(cin.type == 'smithing'){
							if(i == 5){ craftingCell.style.backgroundImage = `url('images/content/${cin.template.split('/')[0]}/inventory/${cin.template.split('/')[1]}.png')`; }
							if(i == 6){ craftingCell.style.backgroundImage = `url('images/content/${cin.base.split('/')[0]}/inventory/${cin.base.split('/')[1]}.png')`; }
							if(i == 7){ craftingCell.style.backgroundImage = `url('images/content/${cin.modder.split('/')[0]}/inventory/${cin.modder.split('/')[1]}.png')`; }
							i == 8 ? craftingCell.style.backgroundImage = 'var(--smithingIcon)' : null;
							if(i == 9){ getRes(cin.amount, craftingCell); }
						}
						
						function getRes(amt, cc){
							if(amt > 1){
								let resAmt = document.createElement('span');
								resAmt.textContent = amt;
								resAmt.classList.add('resultAmount');
								cc.appendChild(resAmt);
							}
							craftingCell.style.backgroundImage = `url('images/content/${crRes[0]}/inventory/${crRes[1]}.png')`;
						}
						if(craftingCell.classList.contains('craftingCell')){
							craftingCell.classList.remove('emptyCell');
						}
						panel.appendChild(craftingCell);
					}
					
					let pInfo = document.createElement('div');
					pInfo.classList.add('panelInfo');
					let ingP = document.createElement('p');
					if(cin.type != 'smelting'){
						ingP.textContent = `Result: ${cin.amount} – ${cin.result.split('/')[1].replaceAll('_', ' ')}`;
					}
					else{
						ingP.textContent = `Result: ${cin.result.split('/')[1].replaceAll('_', ' ')}`;
					}
					pInfo.appendChild(ingP);
					if(cin.type == 'crafting'){
						let ings = document.createElement('p');
						ings.textContent = 'Ingredients:';
						var counts = {};
						var totalIngredients = cin.pattern;
						totalIngredients.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
						var keys = Array.from(Object.keys(counts));
						for(var m = 0; m < keys.length; m++){
							if(keys[m] != ''){
								ings.textContent += `\n • ${counts[keys[m]]} – ${keys[m].split('/')[1].replaceAll('_', ' ')}`;
							}
						}
						let ingT = document.createElement('p');
						ingT.textContent = `Tool: ${cin.tool.split('/')[1].replaceAll('_', ' ')}`;
						pInfo.appendChild(ingT);
						pInfo.appendChild(ings);
					}
					if(cin.type == 'stonecutting'){
						let ingP = document.createElement('p');
						ingP.textContent = `Input: ${cin.input.split('/')[1].replaceAll('_', ' ')}`;
						let ingT = document.createElement('p');
						ingT.textContent = 'Tool: Stonecutter';
						pInfo.appendChild(ingP);
						pInfo.appendChild(ingT);
					}
					if(cin.type == 'smelting'){
						let ingP = document.createElement('p');
						ingP.textContent = `Input: ${cin.input.split('/')[1].replaceAll('_', ' ')}`;
						let ingT = document.createElement('p');
						if(cin.intensity.length == 1){
							ingT.textContent = `Tool: ${cin.intensity[0].replaceAll('_', ' ')}`
						}
						else{
							ingT.textContent = 'Tools: ';
							cin.intensity.forEach(ci =>{
								ingT.textContent += `\n • ${ci.replaceAll('_', ' ')}`;
							});
						}
						pInfo.appendChild(ingP);
						pInfo.appendChild(ingT);
					}
					if(cin.type == 'brewing'){
						let brewingInput = document.createElement('p');
						brewingInput.textContent = `Input: ${cin.input.split('/')[1].replaceAll('_', ' ')}`;
						let brewingReagent = document.createElement('p');
						brewingReagent.textContent = `Reagent: ${cin.reagent.split('/')[1].replaceAll('_', ' ')}`;
						let ingT = document.createElement('p');
						ingT.textContent = 'Tool: Brewing Stand';
						pInfo.appendChild(brewingInput);
						pInfo.appendChild(brewingReagent);
						pInfo.appendChild(ingT);
					}
					if(cin.type == 'smithing'){
						let smithingTemplate = document.createElement('p');
						smithingTemplate.textContent = `Template: ${cin.template.split('/')[1].replaceAll('_', ' ')}`;
						let smithingBase = document.createElement('p');
						smithingBase.textContent = `Base: ${cin.base.split('/')[1].replaceAll('_', ' ')}`;
						let smithingModder = document.createElement('p');
						smithingModder.textContent = `Addition: ${cin.modder.split('/')[1].replaceAll('_', ' ')}`;
						let ingT = document.createElement('p');
						ingT.textContent = 'Tool: Smithing Table';
						pInfo.appendChild(smithingTemplate);
						pInfo.appendChild(smithingBase);
						pInfo.appendChild(smithingModder);
						pInfo.appendChild(ingT);
					}
					
					panelWrapper.appendChild(pInfo);
					panelWrapper.appendChild(panel);
					par.appendChild(panelWrapper);
					newDataWrapper.appendChild(craftDiv);
				}
				setTimeout(function(){
					document.querySelectorAll('.panelWrapper').forEach(pr => {
						pr.addEventListener('click', event =>{
							var mpa = pr.querySelector('.panel');
							mpa.classList.contains('transparent') ? mpa.classList.remove('transparent') : mpa.classList.add('transparent');
						});
					});
				}, 1);
			}
			
			foundCell.description.forEach(fc =>{
				if(fc.type == 'heading'){
					let nE = document.createElement('h1');
					nE.textContent = fc.data;
					newDataWrapper.appendChild(nE);
				}
				if(fc.type == 'subheading'){
					let nE = document.createElement('h2');
					nE.textContent = fc.data;
					newDataWrapper.appendChild(nE);
				}
				if(fc.type == 'subsubheading'){
					let nE = document.createElement('h3');
					nE.textContent = fc.data;
					newDataWrapper.appendChild(nE);
				}
				if(fc.type == 'paragraph'){
					fc.data.forEach(st => {
						let nE = document.createElement('p');
						nE.textContent = st.replaceAll('$itself', foundCell.name);
						newDataWrapper.appendChild(nE);
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
					newDataWrapper.appendChild(galDiv);
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
					newDataWrapper.appendChild(nE);
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
					newDataWrapper.appendChild(nE);
				}
				if(fc.type == 'compound'){
					let nE = document.createElement('div');
					nE.classList.add('compound');
					fc.direction == 'PI' ? null : nE.classList.add('rc');
					let comP = document.createElement('p');
					comP.textContent = fc.data.paragraph.replaceAll('$itself', foundCell.name);
					comP.style.width = fc.ratio.paragraph;
					nE.appendChild(comP);
					let comImg = document.createElement('img');
					comImg.src = `images/content/${name}/gallery/${fc.data.image}`;
					comImg.style.width = fc.ratio.image;
					nE.appendChild(comImg);
					newDataWrapper.appendChild(nE);
				}
			});
		}
		
		setTimeout(function(){
			var cImages = document.querySelectorAll('.dataWrapper img');
			cImages.forEach(img =>{
				img.addEventListener('click', event => {
					document.body.parentNode.style.overflowY = 'hidden';
					modal.classList.add('modalAppear');
					mainModal.style.backgroundImage = `url('${img.src}')`;
				});
			});
		}, 1);
		document.querySelector('.mainDescription').appendChild(newDataWrapper);
	});
});