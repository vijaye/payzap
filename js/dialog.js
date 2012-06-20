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

  if (!AjaxDialog._dialogs) {
    AjaxDialog._dialogs = [];
  }
  AjaxDialog._dialogs.push(this);
};

AjaxDialog.destroyAll = function() {
  AjaxDialog.hideAll();
  for (var ii = 0, len = AjaxDialog._dialogs.length; ii < len; ii++) {
    var d = AjaxDialog._dialogs[ii];
    d.destroy(true);
  }
  AjaxDialog._dialogs = [];
};

AjaxDialog.hideAll = function() {
  for (var ii = 0, len = AjaxDialog._dialogs.length; ii < len; ii++) {
    var d = AjaxDialog._dialogs[ii];
    d.hide();
  }
};

AjaxDialog.prototype = {
  destroy: function(leaveInList) {
    this.container.parentElement.removeChild(this.container);
    this.container = null;

    if (!leaveInList) {
      var index = AjaxDialog._dialogs.indexOf(this);
      AjaxDialog._dialogs = AjaxDialog._dialogs.splice(index, 1);
    }
  },

  _failedCallback: function() {
    this._pendingRequest = false;
    alert('failed');
  },

  hide: function() {
    $(this._dialog).dialog('close');
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

