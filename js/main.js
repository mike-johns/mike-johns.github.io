// Adding a quick function to add a class to a header object, just to test with.

$('h1').on('click', function(e) {
    var $this = $(e.target);
    if ($this.is('.is-blue')) {
        $this.removeClass('is-blue');
    } else {
        $this.addClass('is-blue');
    }
})

// Assign jQuery selector to the form field where the user will submit new text

var $newTextField = $('#new-text-field');

// TODO: Get text of newly edited form field and update a header with that text

$('#submit-button').on('click', function() {
    var newText = $newTextField.val();
    if (newText) {
        $('#user-text-display').append(newText);
    }
    $newTextField.val('');
})