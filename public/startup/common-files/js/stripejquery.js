var handler = StripeCheckout.configure({
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: 'startup/common-files/img/statepaclogo.png',
    zipCode: true,
    token: function (token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
    }
});

$('#customButton').on('click', function (e) {
    // Open Checkout with further options
    handler.open({
        name: 'Statesmen',
        //description: 'A better way for politics',
        amount: 2000,
        zipCode: true
    });
    e.preventDefault();
});

// Close Checkout on page navigation
$(window).on('popstate', function () {
    handler.close();
});