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

//Scroll animation for donating
// $("button").click(function() {
//    $('html,body').animate({
//        scrollTop: $("#payment-page").offset().top},
//        'slow');
//});
