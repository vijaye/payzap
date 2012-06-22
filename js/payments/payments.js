(function () {
  Payments = {
    addPaymentOption: function(option) {
      var uri = new Uri('ajax/paymentOptions.php');
      uri.replaceQueryParam('method', 'get_form');
      uri.replaceQueryParam('option', option);

      var dialog = new AjaxDialog(uri.toString());
      dialog.show();
    }
  }
})();