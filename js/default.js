(function () {
  DefaultPage = {
    showPaymentOptionsPicker: function() {
      if (this.pendingRequest) {
        return false;
      }

      this.pendingRequest = true;
      var uri = new Uri().setPath('paymentOptions.php')
      Utils.ajax(
        'paymentOptions.php',
        { method: 'add_options' },
        bind(this, this.onPaymentOptionsCallback),
        function() { this.pendingRequest = false; }
      );
    },

    onPaymentOptionsCallback: function(data) {
      this.pendingRequest = false;

      var dialog = $('#pickerDialog');
      var list = $('#pickerList');

      var result = JSON.parse(data);
      for (var key in result) {
        var value = result[key];
        var listItem = Utils.create('li', { class: 'ui-widget-content' });
        listItem.innerHTML = value.list_item;
        listItem.__key = key;
        list.append(listItem);
      }

      list.selectable();
      dialog.dialog({
        height: 140,
        modal: true
      });
    }
  }
})();