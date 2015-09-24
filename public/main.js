$(document).ready(function() {
  console.log( "Wagwan? " );

  var foodsDiv = $('.foods ul');

  $.get('//localhost:3000/foods', function(response){
    // console.log(response);
    render(response);
  })

  $('.foods ul').on('click', '.destroy', destroyItem);

function render(response) {
  var data = response;
  // console.log(data);
  $.each(data, function(index, value) {
    // console.log(value.name);
    var foodItem = '<li>Name: '+value.name+', Yumminess: '+value.yumminess+'<button class="destroy" data-id="'+ value.id +'">Delete Me!</button></li>';
    // console.log(foodItem);
    addToPage(foodItem, foodsDiv)
  })
}

function addToPage(thing, element) {
  element.hide().append(thing).slideDown('slow');
}

function destroyItem() {
  item = $(this);
  itemId = item.data('id');
  console.log(itemId);
  item.parent().remove()
}


});