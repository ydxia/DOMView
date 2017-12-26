# DOMView

A lightweight DOM wrapper for creating object-oriented view classes!

An example for the implementation of a view class can be found in `example/Slider.js`. You can see a [live demo here](http://htmlpreview.github.io/?https://github.com/ydxia/domview/blob/master/example/static/index.html).

## Usage

Creating new view objects is quite simple using `DOMView(elementType, attributes, children)`:

```javascript
class MyView extends DOMView {
  constructor() {
    super('div', { className: 'my-view' }, [new MyHeaderView(), 'Check out my view!']);
  }
}
```

But we probably want something more than just a plain ol' div. So let's add some child elements with `DOMView.prototype.appendChildren(children)`. This method is also used by the constructor:

```javascript
class MyView extends DOMView {
  constructor() {
    super('div', { className: 'my-view' }, [new MyHeaderView(), 'Check out my view!']);
    
    this._body = new MyBodyView();
    this._footer = new MyFooterView();
    
    this.appendChildren([this._body, this._footer]);
  }
}
```

Sometimes we don't need to construct new views when just a simple wrapper `HTMLElement` will do the trick. This is where `DOMView.DOMUtil` comes into action:

```javascript
let {DOMUtil} = DOMView;

class MyView extends DOMView {
  constructor() {
    super('div', { className: 'my-view' }, [new MyHeaderView(), 'Check out my view!']);
    
    // Note that these are HTMLElements, not DOMViews!
    this._body = DOMUtil.create('div', { className: 'my-view-body' });
    this._footer = DOMUtil.create('div', { className: 'my-view-footer' });
    
    this.appendChildren([this._body, this._footer]);
  }
}
```

Nearly all of the regular convenience methods you can use a `DOMView` object can be applied to an `HTMLElement` simply by using `DOMUtil` instead. If you ever need to get the root `HTMLElement` of a `DOMView`, simply use `DOMView.prototype.getRoot()`.

And that's all there is, folks!

Here is a list of other handy convenience methods:

* `DOMView.prototype.appendChild(child)`/`DOMUtil.appendChild(element, child)`: Appends a `DOMView`, `HTMLElement`, string or number (as text) to the view or element
* `DOMView.prototype.appendChildren(children)`/`DOMUtil.appendChildren(element, children)`: Same as `appendChild()` but for an array of objects
* `DOMView.prototype.removeChild(child)`/`DOMUtil.removeChild(element, child)`: Removes a `DOMView` or `HTMLElement` from the containing view or element
* `DOMView.prototype.removeChildren(children)`/`DOMUtil.removeChild(element, children)`: Same as `removeChild()` but for an array of objects
* `DOMView.prototype.setAttr(attr, value)`/`DOMUtil.setAttr(element, attr, value)`: Sets an attribute (e.g. className, id, etc.) on a view or element
* `DOMView.prototype.setAttrs(attrs)`/`DOMUtil.setAttrs(element, attrs)`: Same as `setAttr()` but for a dict of attributes to values
* `DOMView.prototype.setStyle(style, value)`/`DOMUtil.setStyle(element, style, value)`: Sets a CSS style on a view or element
* `DOMView.prototype.setStyles(styles)`/`DOMUtil.setStyles(element, styles)`: Same as `setStyle()` but for a dict of styles to values
* `DOMView.prototype.addClass(className)`/`DOMUtil.addClass(element, className)`
* `DOMView.prototype.removeClass(className)`/`DOMUtil.removeClass(element, className)`
* `DOMView.prototype.hasClass(className)`/`DOMUtil.hasClass(element, className)`
* `DOMView.prototype.toggleClass(className)`/`DOMUtil.toggleClass(element, className)`


## Example

```javascript
import DOMView from 'domview';

// Utilites for modifying and creating new HTMLElements
let DOMUtil = {DOMView}

class Slider extends DOMView {

  constructor(min, max, step, value) {
    
    // Create some HTMLElements
    let cursor =
        DOMUtil.create('div', { className: 'slider-cursor' } /* properties */);
    let leftBackground =
        DOMUtil.create('div', { className: 'left-background' } /* properties */);
    
    super(
        'div', /* element type */ 
        { className: 'ui-slider' }, /* properties */ 
        [leftBackground, cursor] /* children */);
 
    /**
     * Or alternatively,
     *
     * super('div');
     * this.addAttrs({ className: 'ui-slider' });
     * this.addChildren([leftBackground, cursor]);
     */
 
    this._min = min;
    this._max = max;
    this._step = step;
    this._value = value;
    
    ...
 
    this._cursor = cursor;
    this._leftBackground = leftBackground;
    ...
  }
  
  // Add more methods as you please
  
  setValue(value) {
    // Round the value to the nearest step interval
    let stepNo = Math.round((value - this._min) / this._step);
    stepNo = clamp(0, stepNo, this._totalSteps);
    this._value = this._min + stepNo * this._step;
    let pct = stepNo * 100 / this._totalSteps;

    DOMUtil.setStyle(this._cursor, 'left', pct + '%');
    DOMUtil.setStyle(this._leftBackground, 'width', pct + '%');
    return this;
  }
}       

```

## Making changes
Make sure you have [node.js](https://nodejs.org/en/download/) (currently using v4.4.4) and [npm](https://www.npmjs.com/) installed

Once you have that set up, all you need to do is run

```
npm install
```

Rebuilding DOMView changes into an ES5-friendly format can be done with

```
npm run transpile
```

The sample app is built with webpack. Rebuilding the sample app can be done by running
```
npm run build-example
```
