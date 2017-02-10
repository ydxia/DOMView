# DOMView

A lightweight DOM wrapper for creating object-oriented view classes!

An example for the implementation of a view class can be found in `example/Slider.js`. You see a [live demo here](http://htmlpreview.github.io/?https://github.com/ydxia/domview/blob/master/example/static/index.html).

## Example

```
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
