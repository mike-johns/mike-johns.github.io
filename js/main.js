////////////////////////////////////////////////////////////////////////////////
// In this section, I'm making a message entry form that logs the message to 
// an array, and updates a few display elements to show the latest message and
// the full contents of the array.
////////////////////////////////////////////////////////////////////////////////

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



////////////////////////////////////////////////////////////////////////////////
// In this next section, I'm building an unrelated check-in system
////////////////////////////////////////////////////////////////////////////////

// Create some setup variables

var capacity = 20;
var availability = capacity;
var attendantList = [];

// Create a couple functions that will add or subtract an attendant from the list, and update the availability

function checkIn(name) {
    //var name = prompt('Enter Guest Name To Check In:');
    if (name) {
        if (availability > 0) {
            if (attendantList.length == undefined || attendantList.length == 0) {
                var guestPosition = attendantList.push(name);
                availability--;
                updateAndLog(name + ' has been admitted as Guest #' + guestPosition + '. There are ' + availability + ' more spots available.');
            } else {
                for (var i = 0; i < attendantList.length; i++) {
                    if (attendantList[i] == undefined) {
                        attendantList[i] = name;
                        availability--;
                        updateAndLog(name + ' has been admitted as guest #' + (i + 1) + '. There are ' + availability + ' more spots available.');
                        return;
                    }
                }
                attendantList.push(name);
                availability--;
                updateAndLog(name + ' has been admitted as guest #' + (attendantList.length) + '. There are ' + availability + ' more spots available.');
            }
        } else {
            alert('There is no room available for ' + name + '.');
        }
    } else {
        alert('Please enter a name.');
    }
}

function checkOut(guestNumber) {
    //var guestNumber = prompt('Enter Guest ID To Check Out:');
    if (guestNumber) {
        if (guestNumber <= attendantList.length) {
            var guestIndex = guestNumber - 1;
            var guestName = attendantList[guestIndex];
            if (confirm('Confirm that the guest\'s name is: ' + guestName)) {
                attendantList[guestIndex] = undefined;    
            } else {
                return;
            }
            if (availability < capacity) {
                availability++;    
            }
            updateAndLog(guestName + ' has been checked out. There are now ' + availability + ' spots available.');   
        } else {
            updateAndLog('Please double-check your entry. (Entry out of range)');    
        }
    } else {
        updateAndLog('Please double-check your entry. (No valid entry)');
    }
}

// Store a jQuery selection as a variable and declare a function to update the #log-message text element and log the message to the JS console.

var $log = $('#log-message')

function updateAndLog(message) {
    $log.html(function(){
       return '<strong>Log: </strong>' + message 
    });
    console.log(message);
}

// Store a couple jQuery selections to use later

var $guestCheckinEntry = $('#guest-checkin-entry');

var $guestCheckoutEntry = $('#guest-checkout-entry');

// Create event listeners to call a checkIn() or checkOut() function when the appropriate form is submitted

$('#guest-checkin-form').on('submit', function(e) {
    e.preventDefault();
    checkIn($guestCheckinEntry.val());
    $guestCheckinEntry.val('');
});

$('#guest-checkout-form').on('submit', function(e) {
   e.preventDefault();
    checkOut($guestCheckoutEntry.val());
    $guestCheckoutEntry.val('');
});