"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMUtil = {

  /**
   * Convenience method for creating a html element
   * @param {String} elType The type of element (e.g. div)
   * @param {Object?} attrs Attributes to set on the element
   * @param {Array?} children Children to set (see DOMUtil.appendChild)
   * @returns {HTMLElement}
   */
  create: function create(elType, attrs, children) {
    var el = document.createElement(elType);

    if (attrs) {
      DOMUtil.setAttrs(el, attrs);
    }

    if (children) {
      DOMUtil.appendChildren(el, children);
    }
    return el;
  },


  /**
   * Convenience method for creating a text node
   * @param {String} content
   * @returns {Text}
   */
  text: function text(content) {
    return document.createTextNode(content);
  },
  setAttr: function setAttr(el, attr, val) {
    attr = attr.toLowerCase();

    if (attr == 'style') {
      DOMUtil.setStyles(el, val /* styleMap */);
    }
  },


  /**
   * Sets a series of attributes on the html element
   * @param {HTMLElement} el
   * @param {Object} attrMap Attributes to set
   */
  setAttrs: function setAttrs(el, attrMap) {
    for (var attr in attrMap) {
      DOMUtil.setAttr(el, attr, attrMap[attr]);
    }
  },


  /**
   * Append a child node to the view. If the child is a
   * number or string, a text node is appended
   * @param {string|number|Node|DOMView} child
   */
  appendChild: function appendChild(el, child) {
    if (typeof child === 'string' || typeof child == 'number') {
      child = DOMUtil.text(child);
    }
    if (child instanceof DOMView) {
      child = child.getRoot();
    }
    el.appendChild(child);
  },


  /**
   * Convenience method for appending multiple children
   */
  appendChildren: function appendChildren(el, children) {
    children.forEach(DOMUtil.appendChild.bind(null, el));
  },
  hasClass: function hasClass(el, cls) {
    return !!el.className.match(new RegExp('\\b' + cls + '\\b'));
  },
  addClass: function addClass(el, cls) {
    if (DOMUtil.hasClass(el, cls)) {
      return;
    }
    if (el.className.length) {
      // Add a space in between if necessary
      el.className += ' ';
    }
    el.className += cls;
  },
  toggleClass: function toggleClass(el, cls) {
    if (DOMUtil.hasClass(el, cls)) {
      DOMUtil.removeClass(el, cls);
    } else {
      DOMUtil.addClass(el, cls);
    }
  },
  removeClass: function removeClass(el, cls) {
    el.className = el.className
    // Replace instances where there are spaces on both
    // sides of the class name with just one space
    .replace(new RegExp('\\s' + cls + '\\s', 'g'), ' ')
    // If there is a space on one side (it's the first or
    // last class name), replace with no spaces
    .replace(new RegExp('\\s?\\b' + cls + '\\b\\s?', 'g'), '');
  },
  setStyle: function setStyle(el, type, val) {
    el.style[type] = val;
  },


  /**
   * Sets a series of styles on the html element
   * @param {HTMLElement} el
   * @param {Object} styleMap Styles to set
   */
  setStyles: function setStyles(el, styleMap) {
    for (var type in styleMap) {
      DOMUtil.setStyle(el, type, styleMap[type]);
    }
  }
};

/**
 * Wrapper class for creating html elements.
 * Extend this class to create custom views and widgets
 */

var DOMView = function () {

  /**
   * Sets the root element for the view
   * @param {String} elType The type of element (e.g. div)
   * @param {Object?} attrs Attributes to set on the element
   * @param {Array?} children Children to set (see DOMUtil.appendChild)
   */
  function DOMView(elType, attrs, children) {
    _classCallCheck(this, DOMView);

    this.root = DOMUtil.create(elType, attrs, children);
  }

  _createClass(DOMView, [{
    key: 'getRoot',
    value: function getRoot() {
      return this.root;
    }

    /**
     * Append a child node to the view. If the child is a
     * number or string, a text node is appended
     * @param {string|number|Node|DOMView} child
     */

  }, {
    key: 'appendChild',
    value: function appendChild(child) {
      DOMUtil.appendChild(this.root, child);
      return this;
    }
  }, {
    key: 'appendChildren',
    value: function appendChildren(children) {
      DOMUtil.appendChildren(this.root, children);
      return this;
    }
  }, {
    key: 'hasClass',
    value: function hasClass(cls) {
      return DOMUtil.hasClass(this.root, cls);
    }
  }, {
    key: 'addClass',
    value: function addClass(cls) {
      DOMUtil.addClass(this.root, cls);
      return this;
    }
  }, {
    key: 'removeClass',
    value: function removeClass(cls) {
      DOMUtil.removeClass(this.root, cls);
      return this;
    }
  }, {
    key: 'setStyle',
    value: function setStyle(type, val) {
      DOMUtil.setStyle(this.root, type, val);
      return this;
    }
  }, {
    key: 'setStyles',
    value: function setStyles(styleMap) {
      DOMUtil.setStyles(this.root, styleMap);
      return this;
    }
  }]);

  return DOMView;
}();

DOMView.DOMUtil = DOMUtil;

exports.default = DOMView;
