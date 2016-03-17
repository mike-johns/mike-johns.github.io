

// Adding a quick function to add a class to a header object, just to test with.

$('h1').on('click', function(e) {
    var $this = $(e.target);
    $this.addClass('is-blue');
})