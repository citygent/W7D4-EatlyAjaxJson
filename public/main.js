$(document).ready(function() {
  console.log( "Wagwan? " );

  var foodsDiv = $('.foods ul');

  $.get('//localhost:3000/foods', function(response){
    // console.log(response);
    render(response);
  })



function render(response) {
  var data = response;
  // console.log(data);
  $.each(data, function(index, value) {
    // console.log(value.name);
    var foodItem = '<li data-id="'+value.id+'">Name: '+value.name+', Yumminess: '+value.yumminess+'</li>';
    console.log(foodItem);
    foodsDiv.hide().append(foodItem).slideDown('slow');
  })
}



});