/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domviewBabel = __webpack_require__(1);

	var _domviewBabel2 = _interopRequireDefault(_domviewBabel);

	var _Slider = __webpack_require__(2);

	var _Slider2 = _interopRequireDefault(_Slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DOMUtil = _domviewBabel2.default.DOMUtil;

	var App = function () {
	  function App(root) {
	    _classCallCheck(this, App);

	    this.root = root;
	    this._textbox = DOMUtil.create('p', null, ['Drag the cursor!']);
	    this._slider = new _Slider2.default(0, 100, 1, 50).setOnChange(this._onChange.bind(this));

	    DOMUtil.appendChildren(this.root, [this._textbox, this._slider]);
	  }

	  _createClass(App, [{
	    key: '_onChange',
	    value: function _onChange(x) {
	      this._textbox.textContent = 'The value is: ' + x;
	    }
	  }]);

	  return App;
	}();

	new App(document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domviewBabel = __webpack_require__(1);

	var _domviewBabel2 = _interopRequireDefault(_domviewBabel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOMUtil = _domviewBabel2.default.DOMUtil;


	var clamp = function clamp(min, x, max) {
	  return Math.max(min, Math.min(x, max));
	};

	var Slider = function (_DOMView) {
	  _inherits(Slider, _DOMView);

	  function Slider(min, max, step, value) {
	    _classCallCheck(this, Slider);

	    var cursor = DOMUtil.create('div', { className: 'slider-cursor' });
	    var leftBackground = DOMUtil.create('div', { className: 'left-background' });

	    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, 'div', {
	      className: 'ui-slider',
	      ondragstart: function ondragstart() {
	        return false;
	      }
	    }, [leftBackground, cursor]));

	    _this._min = min;
	    _this._max = max;
	    _this._step = step;
	    _this._totalSteps = (_this._max - _this._min) / _this._step;
	    _this._value = value;
	    _this._onChange = function () {}; // no-op
	    _this._selecting = false;
	    _this._cursor = cursor;
	    _this._leftBackground = leftBackground;

	    _this.root.onmousedown = _this._onMouseDown.bind(_this);
	    window.addEventListener('mousemove', _this._onMouseMove.bind(_this));
	    window.addEventListener('mouseup', _this._onMouseUp.bind(_this));
	    _this.setValue(value);
	    return _this;
	  }

	  _createClass(Slider, [{
	    key: 'setOnChange',
	    value: function setOnChange(handler) {
	      this._onChange = handler;
	      return this;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this._value;
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      // Round the value to the nearest step interval
	      var stepNo = Math.round((value - this._min) / this._step);
	      stepNo = clamp(0, stepNo, this._totalSteps);
	      this._value = this._min + stepNo * this._step;
	      var pct = stepNo * 100 / this._totalSteps;

	      DOMUtil.setStyle(this._cursor, 'left', pct + '%');
	      DOMUtil.setStyle(this._leftBackground, 'width', pct + '%');
	      return this;
	    }
	  }, {
	    key: '_onMouseDown',
	    value: function _onMouseDown(event) {
	      if (event.button !== 0) {
	        return;
	      }
	      this._selecting = true;
	      this._onMouseMove(event);
	    }
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove(event) {
	      if (!this._selecting) {
	        return;
	      }
	      var rect = this.root.getBoundingClientRect();
	      var left = clamp(0, event.clientX - rect.left, rect.width);
	      var pixelStep = rect.width / this._totalSteps;
	      this.setValue(left / pixelStep * this._step + this._min);
	      this._onChange(this._value);
	    }
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp(event) {
	      if (event.button !== 0) {
	        return;
	      }
	      this._onMouseMove(event);
	      this._selecting = false;
	    }
	  }]);

	  return Slider;
	}(_domviewBabel2.default);

	exports.default = Slider;

/***/ }
/******/ ]);