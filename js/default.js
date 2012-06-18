(function () {
  DefaultPage = {
    addPaymentOption: function(option) {
      var uri = new Uri('ajax/paymentOptions.php');
      uri.replaceQueryParam('method', 'get_form');
      uri.replaceQueryParam('option', option);

      var dialog = new AjaxDialog(uri.toString(), {
        OK: bind(this, function() {
          alert('blah')
        }),
        Cancel: function() {
          $(this).dialog('close');
        }
      });
      dialog.show();
    },

    showPaymentOptionsPicker: function() {
      if (!this._popup) {
        this._popup = new Popup($E('pickerPopup'));
      }

      this._popup.toggle($E('addPaymentButton'));
      return;
    }
  }
})();