/**
 * Requires JQuery
 */

var AjaxDialog = function(url, buttons) {
  this.url = url;
  this.buttons = buttons;
  this._pendingRequest = true;
  Utils.ajaxWithUrl(
    url,
    bind(this, this._successCallback),
    bind(this, this._failedCallback)
  );
};

AjaxDialog.prototype = {
  _failedCallback: function() {
    this._pendingRequest = false;
    alert('failed');
  },

  _successCallback: function(data) {
    this._pendingRequest = false;
    if (!data) {
      return;
    }

    this._response = JSON.parse(data);
    Utils.handleAjaxResponse(this._response);
    if (this._response.command !== 'dialog') {
      return;
    }

    this.show();
  },

  show: function() {
    if (!this._response) {
      this._showRequested = true;
      return;
    }

    if (!this._showRequested) {
      return;
    }

    this.container = Utils.create('div', {
      title: this._response.title
    });
    this.container.innerHTML = this._response.body;

    var buttons = this.buttons;
    if (this._response.buttons) {
      buttons = {};
      for (var key in this._response.buttons) {
        var value = this._response.buttons[key];
        buttons[key] = bind(this._response, function(scr) {
          eval(scr);
        }, value);
      }
    }

    this._dialog = $(this.container).dialog({
      draggable: false,
      modal: true,
      resizable: false,
      buttons: buttons
    });
  }
};

