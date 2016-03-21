


////////////////////////////////////////////////////////////////////////////////////////////////////
// Section 1: Initial Setup
////////////////////////////////////////////////////////////////////////////////////////////////////



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

var $showMenuButton = $('#show-top-menu');

var $tableCheckOutButtons = $("button.btn-checkout");



// Fill in the text or html content of a few of these elements selected above.

$currentGuestDisplay.html(function() {
    return '<strong>Current Guests: </strong>' + 0;
});

$availableDisplay.html(function() {
    return '<strong>Available: </strong>' + capacity;
});



// Prepare for animation used later

$focusUpdate.hide();

$('#lower-log-master').hide();

$('#top-settings').hide();

$('#prev-guest-checkout').hide();




////////////////////////////////////////////////////////////////////////////////////////////////////
// Section 2: JavaScript Functions
////////////////////////////////////////////////////////////////////////////////////////////////////



// Update the #log-message text element and log the message to the JS console.

// TODO: fix this animation in the case that multiple messages get updated quickly. 

// TODO: first time this message is displayed doesn't fade in

function updateAndLog(message) {
    $log.text(message).fadeIn(500).delay(3000).fadeOut(1000);
    console.log(message);
}



// Create a new Guest List table entry for the guest; used in functions below

function addRow(name, id) {
    var $newRow = $('<tr><th scope="row">' + id + '</td><td>' + name + '</td><td>9:00 PM</td><td><button class="btn btn-info btn-email">Email</button> <button class="btn btn-danger btn-checkout">Check Out</button></td></tr>');
    $('#guest-list-table-body').append($newRow);
}



// Check a guest into the event, update global variables and display properties

function checkIn(name) { 
    if (name) {
        if (availability > 0) {
            if (attendantList.length == undefined || attendantList.length == 0) {
                var guestPosition = attendantList.push(name);
                $guestSelection.append('<option>' + name + '</option>');
                addRow(name, guestPosition);
                availability--;
                focusUpdate(name, ' has been checked in');
            } else {
                for (var i = 0; i < attendantList.length; i++) {
                    if (attendantList[i] == undefined) {
                        attendantList[i] = name;
                        $guestSelection.append('<option>' + name + '</option>');
                        addRow(name, (i + 1));
                        availability--;
                        focusUpdate(name, ' has been checked in');
                        return;
                    }
                }
                var guestPosition = attendantList.push(name);
                $guestSelection.append('<option>' + name + '</option>');
                addRow(name, guestPosition);
                availability--;
                focusUpdate(name, ' has been checked in');
            }
        } else {
            alert('There is no room available for ' + name + '.');
        }
    } else {
        updateAndLog('Please enter a name.');
    }
}



// Check a guest out of the event, update global variables and display properties 

function checkOut(guestName) {
    if (guestName) {
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



////////////////////////////////////////////////////////////////////////////////////////////////////
// Section 3: jQuery Event Listeners
////////////////////////////////////////////////////////////////////////////////////////////////////



// Call checkIn() when the Add New Guest form is submitted

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



// Call checkOut() a name is selected to be removed from Current Guests

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



// Hide the topmost menu display when the 'Hide' button is pressed

$('#top-menu-hide').on('click', function(e) {
    $('#top-settings').slideUp();
    $showMenuButton.removeAttr('disabled');
});



// Show the topmost menu display when the 'Menu' button is pressed

$showMenuButton.on('click', function() {
    console.log()
    if ($(this).text() == 'Menu') {
        $('#top-settings').slideDown();
        $showMenuButton.text('Hide');
    } else {
        $('#top-settings').slideUp();
        $showMenuButton.text('Menu');
    }
});



// Show an alert when am 'Email' button in the Guest List is pressed

$tableCheckOutButtons.on('click', function(e) {
    var $theButton = $(this);
    var $theRow = $theButton.parent().parent();
    var targetGuestName = $theButton.parent().prev().prev().text();
    if (targetGuestName !== undefined) {
        checkOut(targetGuestName);    
    } else {
        alert('No guest is checked into that spot.')
    }
    $theRow.remove();
});



////////////////////////////////////////////////////////////////////////////////////////////////////
// Section 4: Other
////////////////////////////////////////////////////////////////////////////////////////////////////



// Animation to show a message in the main info display section

function focusUpdate(gName, gMessage) {
    $focusUpdate.text('');
    $focusUpdate.append(gName +'<small> ' + gMessage + '</small>');
    $focusUpdate.fadeIn(500).delay(2000).fadeOut(750);
}


