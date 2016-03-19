////////////////////////////////////////////////////////////////////////////////
// In this section, I'm building an unrelated check-in system
////////////////////////////////////////////////////////////////////////////////

// Create some setup variables

var capacity = 20;
var availability = capacity;
var attendantList = [];

// Store jQuery selections in variables to use later

var $guestCheckinEntry = $('#guest-checkin-entry');

var $guestCheckoutEntry = $('#guest-checkout-entry');

var $currentGuestDisplay = $('#current-guest-display');

var $availableDisplay = $('#available-display');

var $log = $('#log-message');

// Fill in the text or html content of a few of these elements selected above.

$currentGuestDisplay.html(function() {
    return '<strong>Current Guests: 0</strong>';
});

$availableDisplay.html(function() {
    return '<strong>Available: </strong>' + capacity;
});

// Declare a function to update the #log-message text element and log the message to the JS console.

function updateAndLog(message) {
    $log.html(function(){
       return '<strong>Log: </strong>' + message 
    });
    console.log(message);
}

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
        updateAndLog('Please enter a name.');
    }
}

function checkOut(guestNumber) {
    //var guestNumber = prompt('Enter Guest ID To Check Out:');
    if (guestNumber) {
        if (guestNumber <= attendantList.length) {
            var guestIndex = guestNumber - 1;
            var guestName = attendantList[guestIndex];
            if (guestName == undefined) {
                updateAndLog('There is no guest currently using that ID'); 
                return;
            }
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

// Create event listeners to call a checkIn() or checkOut() function when the appropriate form is submitted

$('#guest-checkin-form').on('submit', function(e) {
    e.preventDefault();
    checkIn($guestCheckinEntry.val());
    $guestCheckinEntry.val('');
    $currentGuestDisplay.html(function() {
        return '<strong>Current Guests: </strong>' + (capacity - availability);
    });
    $availableDisplay.html(function() {
       return '<strong>Available: </strong>' + availability;
    });
});

$('#guest-checkout-form').on('submit', function(e) {
   e.preventDefault();
    checkOut($guestCheckoutEntry.val());
    $guestCheckoutEntry.val('');
    $currentGuestDisplay.html(function() {
        return '<strong>Current Guests: </strong>' + (capacity - availability);
    });
    $availableDisplay.html(function() {
       return '<strong>Available: </strong>' + availability;
    });
});