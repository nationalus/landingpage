//Event listeners for payment info
var ccNum = document.getElementById('cc-num'),
    ccMonth = document.getElementById('cc-month'),
    ccYear = document.getElementById('cc-year'),
    paymentAmount = document.getElementById('payment-amount'),
    cvc = document.getElementById('cvc');
ccNum.addEventListener('input', function () {
    if ($.payment.validateCardNumber(ccNum.value)) {
        console.log('number is valid');
        ccNum.style.borderColor = '#2ecc71';
    } else {
        console.log('number is invalid');
        ccNum.style.borderColor = '#ff0000';
    }
});
cvc.addEventListener('input', function () {
    if ($.payment.validateCardCVC(cvc.value)) {
        console.log('cvc is valid')
        cvc.style.borderColor = '#2ecc71';
    } else {
        console.log('cvc is invalid');
        cvc.style.borderColor = '#ff0000';
    }
});
ccMonth.addEventListener('input', function () {
    if ($.payment.validateCardExpiry(ccMonth.value, ccYear.value)) {
        ccMonth.style.borderColor = '#2ecc71';
        ccYear.style.borderColor = '#2ecc71';
    } else {
        ccMonth.style.borderColor = '#ff0000';
        ccYear.style.borderColor = '#ff0000';
    }
});
ccYear.addEventListener('input', function () {
    if ($.payment.validateCardExpiry(ccMonth.value, ccYear.value)) {
        ccMonth.style.borderColor = '#2ecc71';
        ccYear.style.borderColor = '#2ecc71';
    } else {
        ccMonth.style.borderColor = '#ff0000';
        ccYear.style.borderColor = '#ff0000';
    }
});
paymentAmount.addEventListener('input', function () {
    if (paymentAmount.value < 3 || paymentAmount.value > 199) {
        paymentAmount.style.borderColor = '#ff0000';
    } else {
        paymentAmount.style.borderColor = '#2ecc71';
    }
});


// This identifies your website in the createToken call below
if (location.hostname === 'localhost') {
    Stripe.setPublishableKey('pk_test_bOHcMClPjvhXPod62NShnyh2');
} else {
    Stripe.setPublishableKey('pk_live_r84QmvlejEZRQgmWe1LfQwZ6');
}

var stripeResponseHandler = function (status, response) {
    var $form = $('#payment-form');

    if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
    } else {
        // token contains id, last4, and card type
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        console.log(location.protocol, location.hostname, location.port);
        // and re-submit
        $.ajax({
            type: 'POST',
            url: '/donate',
            data: $('form').serialize(),
            success: function (response) {
                var form = document.getElementById('payment-form');
                form.reset();
                document.querySelector('.payment-errors')
                    .textContent = '';
                document.getElementById('payment-success')
                    .textContent = 'Thank you for your donation to ' +
                        'Statesmen!';
                ccNum.style.borderColor = '';
                ccMonth.style.borderColor = '';
                ccYear.style.borderColor = '';
                cvc.style.borderColor = '';
                paymentAmount.style.borderColor = '';
            },
            error: function (err) {
                // Error Logic
                console.log(err);
                document.querySelector('.payment-errors')
                    .textContent = err.responseJSON.message;
            }
        });
    }
};

$(function () {
    $('#payment-form').submit(function (e) {
        if (!$.payment.validateCardNumber(ccNum.value) || !$.payment.validateCardCVC(cvc.value) || !$.payment.validateCardExpiry(ccMonth.value, ccYear.value)) {
            document.querySelector('.payment-errors')
                .textContent = 'Please review your credit card information';
            return false;
        }
        var $form = $(this);

        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
    });
});
