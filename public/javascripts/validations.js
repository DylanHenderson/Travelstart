var $input = $('#searchTerm'),
    $register = $('#searchBtn');    
$register.attr('disabled', true);

$input.keyup(function() {
    var trigger = false;
    $input.each(function() {
        if (!$(this).val()) {
            trigger = true;
        }
    });
    trigger ? $register.attr('disabled', true) : $register.removeAttr('disabled');
});