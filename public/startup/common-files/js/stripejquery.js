//jQuery(function ($) {
//    $('#payment-form').submit(function (event) {
//        var $form = $(this);
//
//        // Disable the submit button to prevent repeated clicks
//        $form.find('button').prop('disabled', true);
//
//        Stripe.card.createToken($form, stripeResponseHandler);
//
//        // Prevent the form from submitting with the default action
//        return false;
//    });
//});
//function stripeResponseHandler(status, response) {
//    var $form = $('#payment-form');
//
//    if (response.error) {
//        // Show the errors on the form
//        $form.find('.payment-errors').text(response.error.message);
//        $form.find('button').prop('disabled', false);
//    } else {
//        // response contains id and card, which contains additional card details
//        var token = response.id;
//        // Insert the token into the form so it gets submitted to the server
//        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//        // and submit
//        $form.get(0).submit();
//    }
//};

var handler = StripeCheckout.configure({
    key: 'pk_test_bOHcMClPjvhXPod62NShnyh2',
    image: 'startup/common-files/img/statepaclogo.png',
    token: function (token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
    }
});
$('#three').on('click', function (e) {
    console.log("Hello, world");
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $3',
        amount: 300,
        zipCode: true
    });
    e.preventDefault();
});
$('#ten').on('click', function (e) {
    console.log("Hello, world");
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $10',
        amount: 1000,
        zipCode: true
    });
    e.preventDefault();
});
$('#twenty').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $20',
        amount: 2000,
        zipCode: true
    });
    e.preventDefault();
});
$('#fifty').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $50',
        amount: 5000,
        zipCode: true
    });
    e.preventDefault();
});
$('#oneHundred').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $100',
        amount: 10000,
        zipCode: true
    });
    e.preventDefault();
});
$('#oneHundredFifty').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $150',
        amount: 15000,
        zipCode: true
    });
    e.preventDefault();
});
$('#max').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        description: 'Donation of $199',
        amount: 19900,
        zipCode: true
    });
    e.preventDefault();
});

// Close Checkout on page navigation
$(window).on('popstate', function () {
    handler.close();
});