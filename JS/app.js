'use strict';

const imageArray = [];
const KeyWordArray =[];

function Gallery (name, src, about, keyword, horns){
  this.name = name;
  this.src = src;
  this.about = about;
  this.keyword = keyword;
  this.horns = horns;

  imageArray.push(this)
}

Gallery.prototype.renderJQuery = function(){
  // get a clone of a pre-existing good html copy
  // replace the values
  // put it where you want
  const $clonedListItemElement = $('li:first-child').clone();

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
const handleImagesFromJson = ArrFromJson => {
  ArrFromJson.forEach(newImages => {
    new Gallery (newImages.title, newImages.image_url, newImages.description, newImages.keyword, newImages.horns);

    if (!KeyWordArray.includes(newImages.keyword)) {
      KeyWordArray.push(newImages.keyword);

    }
  });
  imageArray.forEach(petValue => petValue.renderJQuery());
  renderOptionSelection(KeyWordArray);
};
$.ajax('page-1.json', optionObject)
  .then(handleImagesFromJson);

const renderOptionSelection = function (KeyWordArray) {
  KeyWordArray.forEach(keyword => {
    const $clonedOption = $('option:first-child').clone();
    $clonedOption.attr('value', keyword);
    $clonedOption.text(keyword);
    $('select').append($clonedOption);
  });
};

$('select').on('change', selectOptionKeyWord);

function selectOptionKeyWord (){
  const userSelection = $(this).val();
  $('li').hide();
  imageArray.forEach(function(storedImages){
    if(userSelection === storedImages.keyword){
      const imageTitle = storedImages.title;
      const imageListItems = $('li');
      imageListItems.each(function(){
        console.log(imageTitle)
        if($(this).find('h2').text() === imageTitle){
          $(this).show();
        }
      })
    }
  })
}