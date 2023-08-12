const searchBar = document.querySelector('.search');

searchBar.addEventListener('input', event => {
  let mainValue;
  var contentLink = document.querySelectorAll('a.content');
  var contentName = document.querySelectorAll('.contentHeader');
  let filter = searchBar.value.toUpperCase();
  for(var z = 0; z < contentName.length; z++){
    mainValue = contentName[z].textValue || contentName[z].innerText;
    if(mainValue.toUpperCase().indexOf(filter) > -1){ contentLink[z].style.display='block'; }
    else{ contentLink[z].style.display='none'; }
  }
});