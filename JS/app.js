'use strict';

const imageArray = [];

function Gallery (name, src, about, keyword){
  this.name = name;
  this.src = src;
  this.about = about;
  this.keyword = keyword;

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
  $clonedListItemElement.find('#keywordsGo').text(this.keyword);


  $('ul').append($clonedListItemElement);
}

// asynchronous javascript and xml - million years to complete
// javascript does it asynchronously - does it in background
const optionObject = {
  method: 'get',
  datatype: 'json'
}

// reconstitute - pass it(back) trhough the constructor
const handleThePetsFromFile = dataPotato => {
  console.log(dataPotato);
  dataPotato.forEach(newImages => {
    new Gallery (newImages.title, newImages.image_url, newImages.description, newImages.keyword);
  });
  imageArray.forEach(petValue => petValue.renderJQuery());
  const keyWordHolder = this.keyword;
};
$.ajax('page-1.json', optionObject)
  .then(handleThePetsFromFile);

function keyWordFilter(){
  let selectKeyword = $(this).val();
    $('h2').hide();
    $('img').hide();
    $('p').hide();
    console.log(imageArray);
}
$('#selectKeyword').on('change', keyWordFilter);

//step 1.5 we need to categorize each image 
// imageArray needs to be checked if they match the keyword
function SortImagesToCategories (){
  if(this.keyword === 'narwal'){

// function DisplaySelectedItem(){
//   if(this.keyword === 'narwhal'){
//     $('h2').text(this.title);
//     $('img').attr(this.src);
//     $('p').text(this.description);
//     console.log('narhwals');
//   }
// }
// $('selectKeyword').on('change', DisplaySelectedItem);
