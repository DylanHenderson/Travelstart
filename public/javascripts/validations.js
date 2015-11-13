var $input = $('#searchTerm'),
    $register = $('#search');   
    $register1 = $('#search1');  
$register.attr('disabled', true);
$register1.attr('disabled', true);

$input.keyup(function() {
    var trigger = false;
    $input.each(function() {
        if (!$(this).val()) {
            trigger = true;
        }
    });
    trigger ? $register.attr('disabled', true) : $register.removeAttr('disabled');
    trigger ? $register1.attr('disabled', true) : $register1.removeAttr('disabled');
});