$(document).ready(function() {
  console.log( "Wagwan? " );

  var foodsDiv = $('.foods ul');
  var form = $('#new-food')

  $.get('//localhost:3000/foods', function(response){
    // console.log(response);
    render(response);
  })

  $('.foods ul').on('click', '.destroy', destroyItem);

  form.on('submit', function(event) {
    event.preventDefault();
    createItem();
  })

function render(response) {
  var data = response;
  console.log(data);
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
  item.parent().remove()
  console.log(itemId);
  $.ajax({url:'//localhost:3000/foods/'+itemId,
          type: "DELETE", 
          success: function(response) {
          console.log(response);
                  }
        })
}

function createItem(){
  console.log(form.serialize())

  $.ajax({
    url: '/foods',
    type: 'post',
    data: form.serialize(),
    success: function(response) {
        render([response]);
            }
        })
}
});