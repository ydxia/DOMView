"use strict";


let DOMUtil = {

  /**
   * Convenience method for creating a html element
   * @param {String} elType The type of element (e.g. div)
   * @param {Object?} attrs Attributes to set on the element
   * @param {Array?} children Children to set (see DOMUtil.appendChild)
   * @returns {HTMLElement}
   */
  create(elType, attrs, children) {
    let el = document.createElement(elType);

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
  text(content) {
    return document.createTextNode(content);
  },

  setAttr(el, attr, val) {
    if (attr == 'style') {
      DOMUtil.setStyles(el, val /* styleMap */);
    } else {
      el[attr] = val;
    }
  },

  /**
   * Sets a series of attributes on the html element
   * @param {HTMLElement} el
   * @param {Object} attrMap Attributes to set
   */
  setAttrs(el, attrMap) {
    for (let attr in attrMap) {
      DOMUtil.setAttr(el, attr, attrMap[attr]);
    }
  },

  /**
   * Append a child node to the view. If the child is a
   * number or string, a text node is appended
   * @param {string|number|Node|DOMView} child
   */
  appendChild(el, child) {
    if (typeof child === 'string' || typeof child == 'number') {
      child = DOMUtil.text(child);
    } else if (child instanceof DOMView) {
      child = child.getRoot();
    }
    el.appendChild(child);
  },

  /**
   * Convenience method for appending multiple children
   */
  appendChildren(el, children) {
    children.forEach(DOMUtil.appendChild.bind(null, el));
  },

  /**
   * Append a child node to the view. Also accepts DOMView objects
   * @param {string|number|Node|DOMView} child
   */
  removeChild(el, child) {
    if (child instanceof DOMView) {
      child = child.getRoot();
    }
    el.removeChild(child);
  },

  /**
   * Convenience method for removing multiple children
   */
  removeChildren(el, children) {
    children.forEach(DOMUtil.removeChild.bind(null, el));
  },

  hasClass(el, cls) {
    return !!el.className
      .match(new RegExp('\\b' + cls + '\\b'));
  },

  addClass(el, cls) {
    if (DOMUtil.hasClass(el, cls)) {
      return;
    }
    if (el.className.length) {
      // Add a space in between if necessary
      el.className += ' ';
    }
    el.className += cls;
  },

  toggleClass(el, cls) {
    if (DOMUtil.hasClass(el, cls)) {
      DOMUtil.removeClass(el, cls);
    } else {
      DOMUtil.addClass(el, cls);
    }
  },

  removeClass(el, cls) {
    el.className = el.className
      // Replace instances where there are spaces on both
      // sides of the class name with just one space
      .replace(new RegExp('\\s' + cls + '\\s', 'g'), ' ')
      // If there is a space on one side (it's the first or
      // last class name), replace with no spaces
      .replace(new RegExp('\\s?\\b' + cls + '\\b\\s?', 'g'), '');
  },

  setStyle(el, type, val) {
    el.style[type] = val;
  },

  /**
   * Sets a series of styles on the html element
   * @param {HTMLElement} el
   * @param {Object} styleMap Styles to set
   */
  setStyles(el, styleMap) {
    for (let type in styleMap) {
      DOMUtil.setStyle(el, type, styleMap[type]);
    }
  }
}

/**
 * Wrapper class for creating html elements.
 * Extend this class to create custom views and widgets
 */
class DOMView {

  /**
   * Sets the root element for the view
   * @param {String} elType The type of element (e.g. div)
   * @param {Object?} attrs Attributes to set on the element
   * @param {Array?} children Children to set (see DOMUtil.appendChild)
   */
  constructor(elType, attrs, children) {
    this.root = DOMUtil.create(elType, attrs, children);
  }

  getRoot() {
    return this.root;
  }

  /**
   * Append a child node to the view. If the child is a
   * number or string, a text node is appended
   * @param {string|number|Node|DOMView} child
   */
  appendChild(child) {
    DOMUtil.appendChild(this.root, child);
    return this;
  }

  appendChildren(children) {
    DOMUtil.appendChildren(this.root, children);
    return this;
  }

  removeChild(child) {
    DOMUtil.removeChild(this.root, child);
    return this;
  }

  removeChildren(children) {
    DOMUtil.removeChildren(this.root, children);
    return this;
  }

  hasClass(cls) {
    return DOMUtil.hasClass(this.root, cls);
  }

  addClass(cls) {
    DOMUtil.addClass(this.root, cls);
    return this;
  }

  removeClass(cls) {
    DOMUtil.removeClass(this.root, cls);
    return this;
  }

  setStyle(type, val) {
    DOMUtil.setStyle(this.root, type, val);
    return this;
  }

  setStyles(styleMap) {
    DOMUtil.setStyles(this.root, styleMap);
    return this;
  }
}

DOMView.DOMUtil = DOMUtil;

export default DOMView;
