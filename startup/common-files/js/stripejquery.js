var handler = StripeCheckout.configure({
    key: 'pk_test_bOHcMClPjvhXPod62NShnyh2',
    //image: '/img/documentation/checkout/marketplace.png',
    token: function(token) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
    }
  });

  $('#ten').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $10',
      amount: 1000
    });
    e.preventDefault();
  });
$('#twenty').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $20',
      amount: 2000
    });
    e.preventDefault();
  });
$('#fifty').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $50',
      amount: 5000
    });
    e.preventDefault();
  });
$('#oneHundred').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $100',
      amount: 10000
    });
    e.preventDefault();
  });
$('#oneHundredFifty').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $150',
      amount: 15000
    });
    e.preventDefault();
  });
$('#max').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Statesmen',
      description: 'Donation of $199',
      amount: 19900
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation
  $(window).on('popstate', function() {
    handler.close();
  });