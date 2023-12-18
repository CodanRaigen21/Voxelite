// var desc = [];
// addonsList.forEach(a => {
	// a.content.blocks.forEach(b => {
		// desc.push(b.description);
	// });
// });
// var g = 0;
// desc.forEach(c =>{
	// var str = '`';
	// c.forEach(d =>{
		// if(d.type == 'subheading'){ str += `##${d.data}\n`; }
		// if(d.type == 'subsubheading'){ str += `###${d.data}\n`; }
		// if(d.type == 'paragraph'){
			// d.data.forEach(e =>{ str += `\n${e}\n`; });
		// }
		// if(d.type == 'unordered_list'){
			// d.data.forEach(e =>{ e.list.forEach(f => { str += ` - ${f}\n`; }); });
		// }
		// if(d.type == 'image'){
			// d.data.forEach(e =>{ str += `![${e.split('.')[0].replaceAll('_', ' ')}](${e})\n`; });
		// }
		// if(d.type == 'compound'){
			// str += `\n${d.data.paragraph}\n`;
			// str += `![${d.data.image.split('.')[0].replaceAll('_', ' ')}]('images/content/${blocks[g].origin}/gallery/${d.data.image}')\n`;
		// }
	// });
	// str += '`';
	// desc[g] = str;
	// g++;
// });
// var i = 0;
// blocks.forEach(a =>{
	// a.description = desc[i];
	// i++;
// })
// document.querySelector('pre').textContent = 'const blocks = ' + JSON.stringify(blocks).replaceAll('\\n', '\n').replaceAll('","', '",\n"') + ';';

blocks.forEach(a => {
	if(a.attributes.loot == 'default'){
		let f = document.createElement('img');
		f.src = `images/content/${a.origin}/inventory/${a.images[0]}`;
		document.body.appendChild(f);
	}
	else{
		a.attributes.loot.forEach(b =>{
			console.log(b.asset);
			let l = b.asset.split(':');
			let f = document.createElement('img');
			f.src = `images/content/${l[0] == 'minecraft' ? 'minecraft' : referenceAsset(b.asset).origin}/inventory/${l[1]}.png`;
			document.body.appendChild(f);
		});
	}
})