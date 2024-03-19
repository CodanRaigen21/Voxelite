var tabBtn = document.querySelectorAll('.navCollection button');
var pages = document.querySelectorAll('.descWrapper');
tabBtn.forEach(tab =>{
	tab.addEventListener('click', event => {
		if(window.location.href.search('#') > -1){
			window.location.href = `${window.location.href.split('#')[0]}#${tab.dataset.page}`;
		}
		else{
			window.location.href = `${window.location.href}#${tab.dataset.page}`;
		}
		tabBtn.forEach(t => t.classList.remove('currentTab'));
		tab.classList.add('currentTab');
		!document.querySelector('.dataWrapper') ? null : document.querySelector('.dataWrapper').remove();
		pages.forEach(p =>{
			p.style.display = 'none';
			!p.querySelector('input') ? null : p.querySelector('input').classList.remove('currentSearch');
		});
		let ctab = document.querySelector(`div[data-page="${tab.dataset.page}"]`);
		ctab.style.display = 'block';
		!ctab.querySelector('input') ? null : ctab.querySelector('input').classList.add('currentSearch');
		var searchBar = !document.querySelector('.currentSearch') ? null : document.querySelector('.currentSearch');
		if(searchBar){
			searchBar.addEventListener('input', event => {
				document.querySelector(`.library[data-type="${tab.dataset.page}"]`).parentNode.querySelectorAll('.dataTags button:not(.disabled)').forEach(ds => ds.classList.remove('chosen'));
				let mainValue;
				var contentLink = document.querySelectorAll(`.library[data-type="${tab.dataset.page}"] .libraryCell`);
				var contentName = document.querySelectorAll(`.library[data-type="${tab.dataset.page}"] .libraryCell p`);
				let filter = searchBar.value.toUpperCase();
				for(var z = 0; z < contentName.length; z++){
					mainValue = contentName[z].textValue || contentName[z].innerText;
					if(mainValue.toUpperCase().indexOf(filter) > -1){ contentLink[z].style.display='block'; }
					else{ contentLink[z].style.display='none'; }
				}
			});
		}
	});
});
tabBtn[0].click();