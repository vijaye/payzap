var Popup = function(element, isAutoHide) {
  this.container = element;
  if (isAutoHide !== false) {
    isAutoHide = true;
  }
  this._isAutoHide = isAutoHide;

  if (!Popup._popups) {
    Popup._popups = [];
    Utils.listen(document, 'mousedown', function(e) {
      var el = e.srcElement;
      while (el) {
        if (el === element) {
          return;
        }
        el = el.parentElement;
      }
      Popup.hideAll(true);
    });
  }

  Popup._popups.push(this);
};

Popup.hideAll = function(onlyAutoHide) {
  for (var ii = 0, len = Popup._popups.length; ii < len; ii++) {
    var p = Popup._popups[ii];
    if (!onlyAutoHide || p._isAutoHide) {
      p.hide();
    }
  }
};

Popup.prototype = {
  getElement: function() {
    return this.container;
  },

  hide: function() {
    if (this.isShown()) {
      this._isShown = false;
      Utils.hide(this.container);
    }
  },

  isShown: function() {
    return this._isShown;
  },

  show: function(relativeTo) {
    if (this.isShown()) {
      return;
    }

    if (relativeTo) {
      var rect = Utils.getBounds(relativeTo);
      this.container.style.left = rect.left + "px";
      this.container.style.top = rect.bottom - 1 + "px";
    }

    this._isShown = true;
    Utils.show(this.container);
  },

  toggle: function(relativeTo) {
    if (this.isShown()) {
      this.hide();
    } else {
      this.show(relativeTo);
    }
  }
};

