//tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//Scroll animation for donating
 $("button").click(function() {
    $('html,body').animate({
        scrollTop: $("#payment-page").offset().top},
        'slow');
});
