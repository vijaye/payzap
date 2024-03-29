(function() {
  Paypal = {
    onSubmitSuccess: function(response) {
      AjaxDialog.destroyAll();
    },

    validateDetailsForm: function(form) {
      if (!form) {
        return false;
      }

      var devId = $(form).children('#paypalDevId').val();
      var apiKey = $(form).children('#paypalApiKey').val();
      var apiSecret = $(form).children('#paypalApiSecret').val();

      if (!devId || !apiKey || !apiSecret) {
        alert('Please enter all fields.');
      }

      Utils.ajax(
        'paymentOptions.php',
        { method: 'set_details' },
        bind(this, this.onSubmitSuccess),
        function() { alert('Error'); },
        {
          option: 'paypal',
          dev_id: devId,
          api_key: apiKey,
          api_secret: apiSecret
        });
    }
  };
})();