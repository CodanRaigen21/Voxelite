const shelf = document.querySelector('[data-holds="shelf"]');


const tags = document.querySelectorAll(`[data-holds="tag"] span`);
const cells = document.querySelectorAll(`span[data-type="cell"]`);
tags.forEach(i =>{
	i.addEventListener("click", e =>{
		tags.forEach(j => j.classList.remove("selected"));
		i.classList.add("selected");
		if(i.dataset.tag === "all"){
			cells.forEach(j => j.style.display = "block");
		}
		else{
			document.querySelectorAll(`span[data-type="cell"]:not([data-tag="${i.dataset.tag}"])`).forEach(j => j.style.display = "none");
			document.querySelectorAll(`span[data-type="cell"][data-tag="${i.dataset.tag}"]`).forEach(j => j.style.display = "block");
		}
	});
});

const searchBar = document.getElementById("search");
searchBar.addEventListener("keydown", e =>{
	if(e.keyCode === 13){
		tags.forEach(j => j.classList.remove("selected"));
		const contentName = document.querySelectorAll("h3");
		let filter = searchBar.value.toUpperCase();
		for(var z = 0; z < contentName.length; z++){
			mainValue = contentName[z].textValue || contentName[z].innerText;
			if(mainValue.toUpperCase().indexOf(filter) > -1){ cells[z].style.display="block"; }
			else{ cells[z].style.display="none"; }
		}
	}
});