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

// Assign a variable to hold an Array of the user's submitted text strings

var userTextArray = [];

// Get text of newly edited form field and update related <p> elements with that text; as a function here so that it can be called on multiple events but doesn't have to be re-written eeach time.

function submitNewMessage() {
    var newText = $newTextField.val();
    if (newText) {
        $recentMessage.html(function() {
            return '<strong>Latest Message: </strong>' + newText
        });
        var itemCount = userTextArray.push(newText);
        var newItemIndex = (itemCount - 1);
        $messageHistoryDisplay.html(function() {
            return '<strong>Message History: </strong>' + userTextArray;
        });
    }
    $newTextField.val('');
}


// Call submitNewMessage() when the #submit-button is pressed

$('#submit-button').on('click', function() {
    submitNewMessage();
});

// Call submitNewMessage() when the user hits return - i.e., the form is submitted

$('#text-submit-form').on('submit', function(e) {
    e.preventDefault();
    submitNewMessage();
});
