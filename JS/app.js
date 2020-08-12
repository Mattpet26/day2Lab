'use strict';

let imageArray = [];
let KeyWordArray = [];
let hornsArray = [];

function Gallery (name, src, about, keyword, horns){
  // name, src, about, ect are parameters
  this.name = name;
  this.src = src;
  this.about = about;
  this.keyword = keyword;
  this.horns = horns;

  hornsArray.push(this);
  imageArray.push(this);
}

Gallery.prototype.renderWithCreation = function(){
  const $newListItem = $('<li></li>');
  $newListItem.append($('<h2></h2>').text(this.name));
  $newListItem.append($('<p></p>').text(this.about));
  $newListItem.append($('<img></img>').attr('src', this.src));

  $('ul').prepend($newListItem)
}



const optionObject = {
  // this is an object literal with properties
  method: 'get',
  datatype: 'json'
}


const handleImagesFromJson = ArrFromJson => {
  // the thing before an arrow function is the parameter = (arrfromjson)
  ArrFromJson.forEach(newImages => {
    new Gallery (newImages.title, newImages.image_url, newImages.description, newImages.keyword, newImages.horns);

    //enter a sort statement here
    if (!hornsArray.includes(newImages.horns)) {
      
    }

    if (!KeyWordArray.includes(newImages.keyword)) {
      KeyWordArray.push(newImages.keyword);
    }
  });
  imageArray.forEach(petValue => petValue.renderMustache());
  renderOptionSelection(KeyWordArray);
  renderOptionsForHorns(hornsArray)
};
$.ajax('data/page-1.json', optionObject)
  .then(handleImagesFromJson);





const renderOptionsForHorns = function (hornsArray) {
  hornsArray.forEach(horns => {
    const $clonedOption = $('<option></option>').clone();
    $clonedOption.attr('value', horns);
    $clonedOption.text(horns);
    $('#selectHorns').append($clonedOption);
  });
};

const renderOptionSelection = function (Potato) {
  Potato.forEach(keyword => {
    const $clonedOption = $('<option></option>');
    $clonedOption.attr('value', keyword);
    $clonedOption.text(keyword);
    $('#selectKeyword').append($clonedOption);
  });
};



// chosing a select, then when the event change happens we run the funct
// on == ELEMENT.addEventListener
$('select').on('change', selectOptionKeyWord);
function selectOptionKeyWord (){
  const userSelection = $(this).val();
  $('li').hide();
  imageArray.forEach(function(storedImages){
    if(userSelection === storedImages.keyword){
      const imageTitle = storedImages.name;
      const imageListItems = $('li');
      imageListItems.each(function(){
        if($(this).find('h2').text() === imageTitle){
          $(this).show();
        }
      })
    }
  })
}
/*
  Iterate over the array objects
  if we find a match between the title of our animal object and the selected dropdown value
  select all the li's
  iterate over them
  if the animal object matches the h2 of the list items
  show that list item
*/



Gallery.prototype.renderMustache = function() {
  const newHtml = Mustache.render($('#image-Template').html(), this);
  $('ul').append(newHtml)
}



function renderNewPageImages (){
  $('li').hide();
  $('option').hide();
  $('option:first-child').show();
  imageArray = [];
  $.ajax('data/page-2.json', optionObject)
  .then(handleImagesFromJson);
}

$('button').on('click', renderNewPageImages)

$('li:first-child').hide();