var mNav = document.querySelector('.mainNavigation');
var iTr = document.querySelector('.indexTrigger');

iTr.addEventListener('click', event =>{
	!mNav.classList.contains('navOpen') ? index(1): index(0);
});

function index(n){
	if(n == 1){
		mNav.classList.add('navOpen');
		iTr.classList.add('trigOpen');
	}
	else{
		mNav.classList.remove('navOpen');
		iTr.classList.remove('trigOpen');
	}
};