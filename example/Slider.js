'use strict';

import DOMView from '../domview-babel.js';

let {DOMUtil} = DOMView;

let clamp = function (min, x, max) {
  return Math.max(min, Math.min(x, max));
};

export default class Slider extends DOMView {

  constructor(min, max, step, value) {
    let cursor =
      DOMUtil.create('div', { className: 'slider-cursor' });
    let leftBackground =
      DOMUtil.create('div', { className: 'left-background' });
    super('div', {
      className: 'ui-slider',
      ondragstart: function () {
        return false;
      }
    }, [leftBackground, cursor]);

    this._min = min;
    this._max = max;
    this._step = step;
    this._totalSteps = (this._max - this._min) / this._step;
    this._value = value;
    this._onChange = function () {};  // no-op
    this._selecting = false;
    this._cursor = cursor;
    this._leftBackground = leftBackground;

    this.root.onmousedown = this._onMouseDown.bind(this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    this.setValue(value);
  }

  setOnChange(handler) {
    this._onChange = handler;
    return this;
  }

  getValue() {
    return this._value;
  }

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

  _onMouseDown(event) {
    if (event.button !== 0) {
      return;
    }
    this._selecting = true;
    this._onMouseMove(event);
  }

  _onMouseMove(event) {
    if (!this._selecting) {
      return;
    }
    let rect = this.root.getBoundingClientRect();
    let left = clamp(0, event.clientX - rect.left, rect.width);
    let pixelStep = rect.width / this._totalSteps;
    this.setValue(left / pixelStep * this._step + this._min);
    this._onChange(this._value);
  }

  _onMouseUp(event) {
    if (event.button !== 0) {
      return;
    }
    this._onMouseMove(event);
    this._selecting = false;
  }

}
