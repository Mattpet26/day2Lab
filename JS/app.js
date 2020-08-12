'use strict';

let imageArray = [];
let KeyWordArray = [];
let hornsArray = [];

function Gallery (name, src, about, keyword, horns){
  this.name = name;
  this.src = src;
  this.about = about;
  this.keyword = keyword;
  this.horns = horns;

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
  method: 'get',
  datatype: 'json'
}


const handleImagesFromJson = ArrFromJson => {
  ArrFromJson.forEach(newImages => {
    new Gallery (newImages.title, newImages.image_url, newImages.description, newImages.keyword, newImages.horns);

    if (!KeyWordArray.includes(newImages.keyword)) {
      KeyWordArray.push(newImages.keyword);
    }
  });
  //add a sorter here
  imageArray.sort((a, b) => {
    if(a.horns > b.horns){
      return 1;
    }else if (a.horns < b.horns){
      return -1;
    }else{
      return 0;
    }
  });

  imageArray.forEach(imageValueIndex => imageValueIndex.renderMustache());
  renderOptionSelection(KeyWordArray);
  // renderOptionsForHorns(hornsArray);
};
$.ajax('data/page-1.json', optionObject)
  .then(handleImagesFromJson);


//========================================= keyword options
const renderOptionSelection = function (arr) {
  arr.forEach(keyword => {
    const $clonedOption = $('<option></option>');
    $clonedOption.attr('value', keyword);
    $clonedOption.text(keyword);
    $('#selectKeyword').append($clonedOption);
  });
};



//=========================================== keyword display img
$('#selectKeyword').on('change', selectOptionKeyWord);
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

//======================================= horn options
const renderOptionsForHorns = function (arr) {
  arr.forEach(horns => {
    const $clonedOption = $('<option></option>');
    $clonedOption.attr('value', horns);
    $clonedOption.text(horns);
    $('#selectHorns').append($clonedOption);
  });
};

// ====================================== horn display img
$('#selectHorns').on('change', selectHornsByImg);
function selectHornsByImg (){
  const userSelectionByHorns = $(this).val();
  $('li').hide();
  imageArray.forEach(function(storedImages){
    console.log(userSelectionByHorns);
    if(userSelectionByHorns === storedImages.horns){
      const imageTitle = storedImages.name;
      const imageListItems = $('li');
      imageListItems.each(function(){
        if($(this).find('h3').text() === imageTitle){
          $(this).show();
        }
      })
    }
  })
}












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