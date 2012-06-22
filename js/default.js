(function () {
  DefaultPage = {
    showPaymentOptionsPicker: function() {
      if (!this._popup) {
        this._popup = new Popup($E('pickerPopup'));
      }

      this._popup.toggle($E('addPaymentButton'));
      return;
    }
  }
})();