/* global $, Stripe */
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  submitBtn.click(function(event){
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    var ccNum = $('#card-number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    var error = false;
    
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit care number appears to be invalid');
    }
    
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  function stripeResponseHandler(status, response) {
    var token = response.id;
    
    theForm.append( $('<input type="hidden" name="user[stripe_card_token"]>').val(token) );
    
    theForm.get(0).submit();
  }
});