var tagButtons = document.querySelectorAll('div.tagFilters button');
var panels = document.querySelectorAll('a.content');
var trigger = document.querySelector('.filterTrigger');
var filterWrapper = document.querySelector('.filterWrapper');

tagButtons.forEach(tb =>{
	tb.addEventListener('click', event =>{
		panels.forEach(p => { if(!p.classList.contains(tb.dataset.tag)){ p.style.display = 'none' }else{ p.style.display = 'block'}});
	});
});

trigger.addEventListener('click', event => {
	!filterWrapper.classList.contains('wrapperOpen') ? filterWrapper.classList.add('wrapperOpen') : filterWrapper.classList.remove('wrapperOpen');
});