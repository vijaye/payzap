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
      var container = $('#pickerList');

      container.empty();

      var result = JSON.parse(data);
      var items = [];
      for (var key in result) {
        var value = result[key];
        var listItem = Utils.create('div');
        listItem.innerHTML = value.list_item;
        listItem.__key = key;
        items.push(listItem);
      }

      var listBox = new ListBox(items, function() {});
      container.append(listBox.getElement());
      dialog.dialog({
        modal: true,
        resizable: false,
        width: 480,
        buttons: {
          OK: function() {
            alert('okay');
          },
          Cancel: function() {
            $(this).dialog('close');
          }
        }
      });
    }
  }
})();