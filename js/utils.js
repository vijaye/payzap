(function () {
  Utils = {
    addClass: function(element, name) {
      var names = element.className.split(' ');
      var found = false;
      for (var ii = 0, len = names.length; ii < len; ii++) {
        if (names[ii].toLowerCase() === name.toLowerCase()) {
          found = true;
        }
      }

      if (!found) {
        element.className += ' ' + name;
      }
    },

    ajaxRequest: function (url, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            if (success) {
              success(xhr.responseText);
            }
          } else if (error) {
            error(xhr.statusText);
          }
        }
      };

      xhr.send(null);
    },

    callAjaxApi: function(method, args, callback) {
      var url = 'api/ajaxApi.php?method=' +
        encodeURIComponent(method) +
        '&args=' +
        encodeURIComponent(JSON.stringify(args));
      this.ajaxRequest(url, callback);
    },

    create: function(tag, props) {
      var el = document.createElement(tag);
      if (props) {
        for (var key in props) {
          var attr = key;
          if (attr === 'className') {
            attr = 'class';
          }
          el.setAttribute(attr, props[key]);
        }
      }

      return el;
    },

    empty: function(el) {
      var child = el.firstChild;
      while (child) {
        el.removeChild(child);
        child = el.firstChild;
      }
    },

    hide: function(el) {
      Utils.addClass(el, 'hidden_elem');
    },
    show: function (el) {
      Utils.removeClass(el, 'hidden_elem');
    },

    removeClass: function(element, name) {
      var names = element.className.split(' ');
      var newName = '';
      for (var ii = 0, len = names.length; ii < len; ii++) {
        var n = names[ii];
        if (n.toLowerCase() !== name.toLowerCase()) {
          newName += ' ' + n;
        }
      }

      element.className = newName;
    }
  };

  var
    NODE_ELEMENT = 1,
    NODE_ATTRIBUTE = 2,
    NODE_TEXT = 3;

  DataTemplate = {
    _applyDataToNode: function(element, data) {
      var ii, len;
      if (element.nodeType === NODE_ELEMENT) {
        // First the attributes
        for (ii = 0, len = element.attributes.length; ii < len; ii++) {
          var attr = element.attributes[ii];
          this._applyDataToNode(attr, data);
          if (element.nodeName.toLowerCase() === 'img' &&
              attr.nodeName === 'meta') {
            var imgUrl = attr.nodeValue;
            if (imgUrl) {
              element.setAttribute('src', imgUrl);
            } else {
              Utils.hide(element);
            }
          }
        }

        // ...then the child nodes
        for (ii = 0, len = element.childNodes.length; ii < len; ii++) {
          this._applyDataToNode(element.childNodes[ii], data);
        }
      } else if (element.nodeType === NODE_ATTRIBUTE) {
        var newAttrValue = this._applyDataToValue(element.nodeValue, data);
        if (element.nodeValue !== newAttrValue) {
          element.nodeValue = newAttrValue;
        }
      } else if (element.nodeType === NODE_TEXT) {
        var html = this._applyDataToValue(element.nodeValue, data);
        if (element.parentNode && $.trim(html)) {
          // If this is hosted by a parent, then we insert the transformed
          // text as inner HTML
          var span = document.createElement('span');
          span.innerHTML = html;
          element.parentNode.replaceChild(span, element);
        } else {
          element.nodeValue = html;
        }
      }
    },

    _applyDataToValue: function(templatedText, replaceWith) {
      var re = /\{(\w+)\}/g;
      var retText = templatedText;

      while (true) {
        var g = re.exec(templatedText);
        if (!g) {
          break;
        }

        var key = g[1];
        var val = replaceWith[key];
        if (!val) {
          val = '';
        }

        retText = retText.replace(g[0], val);
      }

      return retText;
    },

    applyTemplate: function(templateElement, data) {
      var element = templateElement.cloneNode(true);

      this._applyDataToNode(element, data);
      Utils.removeClass(element, "template");
      element.removeAttribute("id");
      return element;
    }
  };

  window['$E'] = function(id) {
    return document.getElementById(id);
  };

  window['bind'] = function(d, c) {
    var a = Array.prototype.slice.call(arguments, 2);
    function b() {
      var f = d || (this == window ? false : this),
        e = a.concat(Array.prototype.slice.call(arguments));
      if (typeof(c) == "string") {
        if (f[c]) {
          return f[c].apply(f, e);
        }
      } else {
        return c.apply(f, e);
      }
    }
    return b;
  }
})();