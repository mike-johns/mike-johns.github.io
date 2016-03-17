// Adding a quick function to add a class to a header object, just to test with.

$('h1').on('click', function(e) {
    var $this = $(e.target);
    if ($this.is('.is-blue')) {
        $this.removeClass('is-blue');
    } else {
        $this.addClass('is-blue');
    }
});

// Assign jQuery selector to the form field where the user will submit new text

var $newTextField = $('#new-text-field');

// Assign jQuery selector to the <p> element that will display the user's most recent message

var $recentMessage = $('#user-text-display');

// Assign jQuery selector to the <p> element that will display the user's message history

var $messageHistoryDisplay = $('#user-history-display');

// Assign a variable to hold an Array of the user's submitted text strings.

var userTextArray = [];

// Get text of newly edited form field and update a header with that text

$('#submit-button').on('click', function() {
    var newText = $newTextField.val();
    if (newText) {
        $recentMessage.html(function() {
            return '<strong>Latest Message: </strong>' + newText
        });
        var itemCount = userTextArray.push(newText);
        var newItemIndex = (itemCount - 1);
        $messageHistoryDisplay.html(function() {
            return '<strong>Stored Messages: </strong>' + userTextArray;
        });
    }
    $newTextField.val('');
});

// Replicate above function, which appends user-submitted text to a selected <p> object, so that the text also updates when the form is submitted.

