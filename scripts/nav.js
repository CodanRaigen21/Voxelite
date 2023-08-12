var nav = document.querySelector('.header');
var links = document.querySelectorAll('nav a');
var wrapper = document.querySelector('.contentWrapper');
var footer = document.querySelector('footer');
document.addEventListener('scroll', event =>{
	if(window.pageYOffset == 0){
		nav.classList.remove('detach');
		wrapper.classList.remove('offset');
		footer.classList.remove('offset');
	}
	else{
		nav.classList.add('detach');
		wrapper.classList.add('offset');
		footer.classList.add('offset');
	}
});