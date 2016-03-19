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

var $guestSelection = $('#guest-selection');

var $focusUpdate = $('#focus-update-large');

var $log = $('#log-message');

// Fill in the text or html content of a few of these elements selected above.

$currentGuestDisplay.html(function() {
    return '<strong>Current Guests: </strong>' + 0;
});

$availableDisplay.html(function() {
    return '<strong>Available: </strong>' + capacity;
});

// Declare a function to update the #log-message text element and log the message to the JS console.

// TODO: fix this animation in the case that multiple messages get updated quickly. Also, why does the first one not fade in?

function updateAndLog(message) {
    $log.text(message).fadeIn(500).delay(3000).fadeOut(1000);
    console.log(message);
}

// Create a couple functions that will add or subtract an attendant from the list, and update the availability

function checkIn(name) {
    //var name = prompt('Enter Guest Name To Check In:');
    if (name) {
        if (availability > 0) {
            if (attendantList.length == undefined || attendantList.length == 0) {
                var guestPosition = attendantList.push(name);
                $guestSelection.append('<option>' + name + '</option>');
                availability--;
                updateAndLog(name + ' has been admitted as Guest #' + guestPosition + '. There are ' + availability + ' more spots available.');
                focusUpdate(name, ' has been checked in');
            } else {
                for (var i = 0; i < attendantList.length; i++) {
                    if (attendantList[i] == undefined) {
                        attendantList[i] = name;
                        $guestSelection.append('<option>' + name + '</option>');
                        availability--;
                        updateAndLog(name + ' has been admitted as guest #' + (i + 1) + '. There are ' + availability + ' more spots available.');
                        focusUpdate(name, ' has been checked in');
                        return;
                    }
                }
                var guestPosition = attendantList.push(name);
                $guestSelection.append('<option>' + name + '</option>');
                availability--;
                updateAndLog(name + ' has been admitted as guest #' + (attendantList.length) + '. There are ' + availability + ' more spots available.');
                focusUpdate(name, ' has been checked in');
            }
        } else {
            alert('There is no room available for ' + name + '.');
        }
    } else {
        updateAndLog('Please enter a name.');
    }
}

function checkOut(guestName) {
    if (guestName && (confirm('Confirm: Checking out ' + guestName))) {
        for (var i = 0; i < attendantList.length; i++) {
            if (guestName === attendantList[i]) {
                attendantList[i] = undefined;
                if (availability < capacity) {
                    availability++;
                }
                $('option:contains(' + guestName +')').remove();
                updateAndLog(guestName + ' has been checked out.');
                focusUpdate(guestName, ' has been checked out');
            }
        }
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
    checkOut($guestSelection.val());
    $guestCheckoutEntry.val('');
    $currentGuestDisplay.html(function() {
        return '<strong>Current Guests: </strong>' + (capacity - availability);
    });
    $availableDisplay.html(function() {
       return '<strong>Available: </strong>' + availability;
    });
});

// Animations and functions for top-level activity display

$focusUpdate.hide();

function focusUpdate(gName, gMessage) {
    $focusUpdate.text('');
    $focusUpdate.append(gName +'<small> ' + gMessage + '</small>');
    $focusUpdate.fadeIn(500).delay(2000).fadeOut(750);
}