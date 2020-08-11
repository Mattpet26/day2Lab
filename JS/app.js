'use strict';

const imageArray = [];

function Gallery (name, src, about){
  this.name = name;
  this.src = src;
  this.about = about;

  imageArray.push(this)
}

Gallery.prototype.renderJQuery = function(){
  // get a clone of a pre-existing good html copy
  // replace the values
  // put it where you want
  const $clonedListItemElement = $('li:first-child').clone();
  console.log($clonedListItemElement);

  $clonedListItemElement.find('h2').text(this.name);
  $clonedListItemElement.find('img').attr('src', this.src).attr('about', this.about);
  $clonedListItemElement.find('p').text(this.about);

  $('ul').append($clonedListItemElement);
}


new Gallery('Max', 'max.jpg', 'Max is a cool kat');


// asynchronous javascript and xml - million years to complete
// javascript does it asynchronously - does it in background
const optionObject = {
  method: 'get',
  datatype: 'json'
}

// reconstitute - pass it(back) trhough the constructor
const handleThePetsFromFile = dataPotato => {
  console.log(dataPotato);
  dataPotato.forEach(lamePet => {
    new Gallery (lamePet.name, lamePet.src, lamePet.about);
  });
  imageArray.forEach(petValue => petValue.renderJQuery());
};
$.ajax('data/page-1.json', optionObject)
  .then(handleThePetsFromFile);



imageArray.forEach(petValue => petValue.renderJQuery());