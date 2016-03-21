// Create a function to add or remove a 'done' class to each <td> element when it is clicked

$('#main-list').on('click', function(e) {
    if (e.target.tagName === 'LI') {
        var $this = $(e.target);
        if ($this.is('.list-group-item-success')) {
            $this.removeClass('list-group-item-success done');
            
        } else {
            $this.addClass('list-group-item-success done').prepend('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ');
        }
    }
});

// Create a function that adds a new <li> To-Do item based on form text entered

var $newItemEntry = $('#new-item-text');

$("#new-item-form").on('submit', function(e) {
    e.preventDefault();
    var newText = $newItemEntry.val();
    if (newText) {
        $('li:last').after('<li class="list-group-item">' + newText + '</li>');
        $newItemEntry.val('');
    }
});