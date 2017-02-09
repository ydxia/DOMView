"use strict";


class DOMView {

  constructor(elType) {
    this.root = document.createElement(elType);
  }

  getRoot() {
    return this.root;
  }

}

export default DOMView;
