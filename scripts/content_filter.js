var contentTags = document.querySelectorAll('.dataTags button:not(.disabled)');
var cells = document.querySelectorAll('.libraryCell');
contentTags.forEach(ct => {
	ct.addEventListener('click', event =>{
		contentTags.forEach(cct => cct.classList.remove('chosen'));
		ct.classList.add('chosen');
		if(ct.dataset.tagval == 'all'){ cells.forEach( c => c.style.display = 'block' ); }
		else{
			cells.forEach(c => {
				c.style.display = 'block';
				document.querySelector('.descWrapper[style="display: block;"]').querySelectorAll(`.libraryCell:not([data-tagval="${ct.dataset.tagval}"])`).forEach(v => v.style.display = 'none');
			});
		}
	});
});