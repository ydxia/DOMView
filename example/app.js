'use strict';

import DOMView from '../domview-babel.js';
import Slider from './Slider.js';

let {DOMUtil} = DOMView;

class App {

  constructor(root) {
    this.root = root;
    this._textbox = DOMUtil.create('p', null, ['Drag the cursor!']);
    this._slider = new Slider(0, 100, 1, 50)
      .setOnChange(this._onChange.bind(this));

    DOMUtil.appendChildren(this.root, [this._textbox, this._slider]);
  }

  _onChange(x) {
    this._textbox.textContent = 'The value is: ' + x;
  }
}

new App(document.getElementById('root'));
