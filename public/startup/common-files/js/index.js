//page links
var link = document.getElementById('payment-page');
    var loc = document.location;
    link.href = 'http://' + loc.hostname + ':' + loc.port + '/payment.html';


//modals
$('#thisButton').click(function () {
        $('#myModal').modal({
            show: true
        });
    });
    $('paymentChoice').click(function () {
        $('#myModal').modal({
            show: false
        });

    });


//tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//not sure what this is
var _fo = _fo || [];
_fo.push({'m': 'true', 'c': 'f907c5', 'i': 11083});
if (typeof fce == 'undefined') {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://' + 'formcrafts.com/js/fc.js';
    var fi = document.getElementsByTagName('script')[0];
    fi.parentNode.insertBefore(s, fi);
    fce = 1;}

//Scroll animation for donating
 $("button").click(function() {
    $('html,body').animate({
        scrollTop: $("#payment-page").offset().top},
        'slow');
});