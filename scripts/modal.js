var modal = document.querySelector('.modalWrapper');
var mainModal = document.querySelector('.mainModal');
var images = document.querySelectorAll('.mainWrapper * > img');

images.forEach(img =>{
	img.addEventListener('click', event => {
		// document.body.parentNode.style.overflowY = 'hidden';
		modal.classList.add('modalAppear');
		mainModal.style.backgroundImage = `url('${img.src}')`;
	});
});
modal.addEventListener('click', event => {
	// document.body.parentNode.style.overflowY = 'hidden';
	modal.classList.remove('modalAppear');
});