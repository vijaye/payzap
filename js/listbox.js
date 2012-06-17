var ListBox = function(items, selectCallback) {
  this.items = items;
  this.selectCallback = selectCallback;

  this.container = Utils.create('div', {
    className: 'list-box'
  });

  Utils.listen(this.container, 'keydown', bind(this, this.handleEvents));
  Utils.listen(this.container, 'click', bind(this, this.handleClick));

  setTimeout(bind(this, this.performLayout), 100);
};

ListBox.prototype = {
  addListItemToContainer: function(item) {
    var title = item.title ? item.title : item;
    var subtitle = item.subtitle;
    var icon = item.icon;

    var itemDiv = Utils.create('div', {
      className: 'list-box-item'
    });
    itemDiv.appendChild(item);

    this.container.appendChild(itemDiv);
    itemDiv.__item = item;
  },

  getElement: function() {
    return this.container;
  },

  handleClick: function(event) {
    var el = event.srcElement;
    var item = el.__item;
    while (!item) {
      if (el == this.container) {
        return;
      }

      el = el.parentElement;
      item = el.__item;
    }

    if (item) {
      var index = this.items.indexOf(item);
      this.selectIndex(index);
      this.selectCallback(item);
    }
  },

  handleEvents: function(event) {
    var code = event.keyCode;
    switch (code) {
      case 13:
        Utils.stopEvent(event);
        if (this.selectCallback) {
          this.selectCallback(this.items[this.selectedIndex]);
        }
        break;

      case 38:
        Utils.stopEvent(event);
        this.selectIndex(Math.max(0, this.selectedIndex - 1));
        break;

      case 40:
        Utils.stopEvent(event);
        this.selectIndex(
          Math.min(this.items.length - 1, this.selectedIndex + 1));
        break;
    }
  },

  performLayout: function() {
    Utils.empty(this.container);
    for (var ii = 0, len = this.items.length; ii < len; ii++) {
      var item = this.items[ii];
      this.addListItemToContainer(item);
    }
  },

  selectIndex: function(index) {
    if (index >= this.items.length) {
      return;
    }

    if (this.previousSelectedDiv) {
      Utils.removeClass(this.previousSelectedDiv, 'selected');
    }

    this.selectedIndex = index;
    this.previousSelectedDiv = this.container.childNodes[index];
    Utils.addClass(this.previousSelectedDiv, 'selected');

    this.previousSelectedDiv.scrollIntoView(false);
  }
};

