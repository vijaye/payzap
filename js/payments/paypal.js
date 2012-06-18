(function() {
  Paypal = {
    validateDetailsForm: function(form) {
      if (!form) {
        return false;
      }

      var devId = $(form).children('#paypalDevId').val();
      var apiKey = $(form).children('#paypalApiKey').val();
      var apiSecret = $(form).children('#paypalApiSecret').val();

alert(apiSecret);
    }
  };
})();