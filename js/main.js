

// Adding a quick function to add a class to a header object, just to test with.

$('h1:first').on(click, function(e) {
    e.target.addClass('is-blue');
})