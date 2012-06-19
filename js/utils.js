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

    ajax: function(endpoint, args, success, error, postData) {
      var uri = new Uri().
        setPath('/ajax/' + endpoint);

      for (var key in args) {
        uri.replaceQueryParam(key, args[key]);
      }

      return this.ajaxWithUrl(uri.toString(), success, error, postData);
    },

    ajaxWithUrl: function(url, success, error, postData) {
      var xhr = new XMLHttpRequest();
      var method = 'GET';
      if (postData) {
        method = 'POST';
      }
      xhr.open(method, url, true);

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

      if (postData) {
        xhr.send(JSON.stringify(postData));
      } else {
        xhr.send(null);
      }
    },

    callAjaxApi: function(method, args, callback) {
      var url = 'api/ajaxApi.php?method=' +
        encodeURIComponent(method) +
        '&args=' +
        encodeURIComponent(JSON.stringify(args));
      this.ajax(url, callback);
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

    getBounds: function(el) {
      var l = el.offsetLeft;
      var t = el.offsetTop;
      var w = el.offsetWidth;
      var h = el.offsetHeight;

      while (el = el.offsetParent) {
        l += el.offsetLeft;
        t += el.offsetTop;
      }

      return {
        left: l,
        top: t,
        width: w,
        height: h,
        right: l + w,
        bottom: t + h
      };
    },

    handleAjaxResponse: function(response) {
      if (!response || !response.ajax_response) {
        return;
      }

      var styles = response.styles;
      if (styles) {
        for (var ii = 0, len = styles.length; ii < len; ii++) {
          Utils.loadStyle(styles[ii]);
        }
      }

      var scripts = response.scripts;
      if (scripts) {
        for (var ii = 0, len = scripts.length; ii < len; ii++) {
          Utils.loadScript(scripts[ii]);
        }
      }
    },

    hide: function(el) {
      Utils.addClass(el, 'hidden_elem');
    },
    show: function (el) {
      Utils.removeClass(el, 'hidden_elem');
    },

    listen: function(element, name, handler) {
      if (!element) { return; }
      if (element.addEventListener) {
        element.addEventListener(name, handler, false);
      } else {
        var handlerx = function() { handler(window.event); }
        if (element.attachEvent) {
          element.attachEvent('on' + name, handlerx);
        } else {
          element['on' + name] = handlerx;
        }
      }
    },

    loadScript: function(script) {
      document.head.appendChild(
        Utils.create('script', {
          src: script,
          type: 'text/javascript'
        })
      );
    },

    loadStyle: function(style) {
      document.head.appendChild(
        Utils.create('link', {
          rel: 'stylesheet',
          href: style,
          type: 'text/css',
        })
      );
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
    },

    stopEvent: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
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