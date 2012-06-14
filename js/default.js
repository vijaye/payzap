(function () {
  DefaultPage = {
    showPaymentOptionsPicker: function() {
      if (this.pendingRequest) {
        return false;
      }

      this.pendingRequest = true;
      alert('sdfsdf');
    }
  }
})();