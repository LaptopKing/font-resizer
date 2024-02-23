/**
  * resizes container's text's font according
  * to the size of the container
  *
  * @param {string} selector Used to retrieve element from document
  * @param {object} options {
  *   {integer} minFontSize Minimum font size the text can have
  *   {integer} maxFontSize Maximum font size the text can have
  *   {boolean} wordWrap Should word wrap be used or not
  *   {boolean} resizer Should the resizer run or just exit
  *   {integer} timeout How much to delay before starting resizer
  *   {integer} resize How many times should the resizer run
  *   {integer} maxProbs The amount of times it can resize a text
  * } Custom options of the resizer
  *
  * @returns {void}
  */
function resizer(selector, { minFontSize = 12, maxFontSize = 96, checkWidth = false, checkHeight = false, wordWrap = false, resizer = true, timeout = 100, resize = 1, maxProbs = 300 } = {}) {
  addEventListener("DOMContentLoaded", (event) => {
    setTimeout(function() {
      if ((typeof resizer === "boolean" ? resizer != true : resizer != 'true') || !resizer) {
        return;
      }
      var container = document.querySelectorAll(selector)[0];
      var text = container.firstElementChild;

      console.log("Start of script");
      console.log("Before resize Container height:", container.offsetHeight);
      console.log("Before resize Text height:", text.scrollHeight);
      console.log("Before resize Container width:", container.offsetWidth);
      console.log("Before resize Text width:", text.scrollWidth);
      console.log(text);

      text.style = '';

      if (wordWrap) {
        text.style['word-wrap'] = 'normal';
      } else {
        text.style['white-space'] = 'nowrap';
      }

      for (let i = 0; i < resize; i++) {

        const resizerInstance = new Resizer();
        resizerInstance.container = container;
        resizerInstance.text = text;
        resizerInstance.minFontSize = minFontSize;
        resizerInstance.maxFontSize = maxFontSize;
        resizerInstance.wordWrap = wordWrap;
        resizerInstance.checkWidth = checkWidth;
        resizerInstance.checkHeight = checkHeight;
        resizerInstance.maxProbs = maxProbs;

        resizerInstance.resizeToFit();
      }

      var container = document.querySelectorAll(selector)[0];
      var text = container.firstElementChild;
      var fontSize = window.getComputedStyle(text).fontSize;

      console.log(fontSize);
      console.log("After resize Container height:", container.scrollHeight);
      console.log("After resize Text height:", text.offsetHeight);
      console.log("After resize Container width:", container.offsetWidth);
      console.log("After resize Text width:", text.scrollWidth);
      console.log(text);
      console.log("End of script");
      console.log();
    }, timeout);
  });
}

/**
 * @class
 *
 * @param {object} container HTML DOM element that contains the text
 * @param {object} text HTML DOM element that is the text in the container
 * @param {integer} minFontSize Minimum font size
 * @param {integer} maxFontSize Maximum font size
 * @param {boolean} wordWrap Should word wrap be used
 * @param {boolean} checkWidth Checks width either way, even if wordWrap is used
 * @param {boolean} checkHeight Checks height either way, even if wordWrap is not used
 * @param {integer} maxProbs The maximum number of probes
 * @param {integer} probs The current number of probes
 * @param {integer} fontSize Current font size of the text
 *
 */
class Resizer {
  container;

  text;

  minFontSize;

  maxFontSize;

  wordWrap;

  checkWidth;

  checkHeight;

  maxProbs;

  probs;

  fontSize;

  constructor(container, text, minFontSize, maxFontSize, wordWrap, checkWidth, checkHeight, maxProbs) {
    this.container = container;
    this.text = text;
    this.minFontSize = minFontSize;
    this.maxFontSize = maxFontSize;
    this.wordWrap = wordWrap;
    this.checkWidth = checkWidth;
    this.checkHeight = checkHeight;
    this.maxProbs = maxProbs;
    this.probs = 0;
  }

  /**
    * decides if the resizing process
    * should be started by checking the
    * height of the container and text
    *
    * @returns {void}
    */
  resizeToFit() {
    if (this.text.offsetHeight == 0 || this.container.offsetHeight == 0) {
      console.log("Nothing to resize!");
      return;
    }

    this.resizeFont();

    if (this.probs >= this.maxProbs) {
      console.log("Reached max probation number!");
      return;
    }

    if (this.checkWidth && !this.checkHeight) {
      this.resizeToWidth();
    }

    if (this.checkHeight && !this.checkWidth) {
      this.resizeToHeight();
    }

    if (this.checkWidth && this.checkHeight) {
      this.resizeToContainer();
    }
  }

  /**
    * increases size of the font of the text
    *
    * @returns {void}
    */
  increaseFontSize() {
    this.text.style.fontSize = parseFloat(this.fontSize) + 1 + "px";
    this.probs++;
  }

  /**
    * decreases size of the font of the text
    *
    * @returns {void}
    */
  decreaseFontSize() {
    this.text.style.fontSize = parseFloat(this.fontSize) - 1 + "px";
    this.probs++;
  }

  /**
    * decides how and when to decrease or increase the size of the font
    * by checking if word wrap is used and if the text font size
    * reached either the minimum font size or the maximum font size
    *
    * @returns {void}
    */
  resizeFont() {
    this.fontSize = window.getComputedStyle(this.text).fontSize;

    if (this.fontSize < this.minFontSize) {
      console.log("Increasing font size because it is smaller than min font size!");
      this.makeFontSizeBigger();
      return;
    }

    if (this.fontSize > this.maxFontSize) {
      console.log("Reducing font size because it is bigger than max font size!");
      this.makeFontSizeSmaller();
      return;
    }

    if (this.text.scrollHeight < this.container.offsetHeight && this.wordWrap) {
      console.log("Increasing font size!");
      this.makeFontSizeBigger();
      return;
    }

    if (this.text.scrollHeight >= this.container.offsetHeight && this.wordWrap) {
      console.log("Reducing font size!");
      this.makeFontSizeSmaller();
      return;
    }

    if (this.text.scrollWidth < this.container.offsetWidth && !this.wordWrap) {
      console.log("Increasing font size!");
      this.makeFontSizeBigger();
      return;
    }

    if (this.text.scrollWidth >= this.container.offsetWidth && !this.wordWrap) {
      console.log("Reducing font size!");
      this.makeFontSizeSmaller();
      return;
    }
  }

  /**
    * decides how and when to decrease or increase the size of the font
    * by checking the width of container and text and if the text font size
    * reached either the minimum font size or the maximum font size
    *
    * @returns {void}
    */
  resizeToWidth() {
    this.fontSize = window.getComputedStyle(this.text).fontSize;

    if (this.fontSize < this.minFontSize) {
      console.log("Increasing font size because it is smaller than min font size!");
      this.makeFontSizeBigger(1);
      return;
    }

    if (this.fontSize > this.maxFontSize) {
      console.log("Reducing font size because it is bigger than max font size!");
      this.makeFontSizeSmaller(1);
      return;
    }

    if (this.text.scrollWidth < this.container.offsetWidth) {
      console.log("Increasing font size!");
      this.makeFontSizeBigger(1);
      return;
    }

    if (this.text.scrollWidth >= this.container.offsetWidth) {
      console.log("Reducing font size!");
      this.makeFontSizeSmaller(1);
      return;
    }
  }

  /**
    * decides how and when to decrease or increase the size of the font
    * by checking the height of container and text and if the text font size
    * reached either the minimum font size or the maximum font size
    *
    * @returns {void}
    */
  resizeToHeight() {
    this.fontSize = window.getComputedStyle(this.text).fontSize;

    if (this.fontSize < this.minFontSize) {
      console.log("Increasing font size because it is smaller than min font size!");
      this.makeFontSizeBigger(0);
      return;
    }

    if (this.fontSize > this.maxFontSize) {
      console.log("Reducing font size because it is bigger than max font size!");
      this.makeFontSizeSmaller(0);
      return;
    }

    if (this.text.scrollHeight < this.container.offsetHeight) {
      console.log("Increasing font size!");
      this.makeFontSizeBigger(0);
      return;
    }

    if (this.text.scrollHeight >= this.container.offsetHeight) {
      console.log("Reducing font size!");
      this.makeFontSizeSmaller(0);
      return;
    }
  }

  /**
    * decides how and when to decrease or increase the size of the font
    * by checking the height and width of container and text and if the text font size
    * reached either the minimum font size or the maximum font size
    *
    * @returns {void}
    */
  resizeToContainer() {
    this.fontSize = window.getComputedStyle(this.text).fontSize;

    if (this.fontSize < this.minFontSize) {
      console.log("Increasing font size because it is smaller than min font size!");
      this.makeFontSizeBigger();
      return;
    }

    if (this.fontSize > this.maxFontSize) {
      console.log("Reducing font size because it is bigger than max font size!");
      this.makeFontSizeSmaller();
      return;
    }

    if (this.text.scrollHeight < this.container.offsetHeight && this.text.scrollWidth < this.container.offsetWidth) {
      console.log("Increasing font size!");
      this.makeFontSizeBigger();
      return;
    }

    if (this.text.scrollHeight >= this.container.offsetHeight && this.text.scrollWidth >= this.container.offsetWidth) {
      console.log("Reducing font size!");
      this.makeFontSizeSmaller();
      return;
    }
  }

  /**
    * increases font size as long as it doesn't reach
    * the maximum font size or the edge of the container
    * or the height of the container depending on the word wrap
    *
    * @param {integer} mode 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height)
    *
    * @returns {void}
    */
  makeFontSizeBigger(mode = 2) {
    if (this.probs >= this.maxProbs) {
      console.log("Reached max probation count!");
      return;
    }

    this.fontSize = window.getComputedStyle(this.text).fontSize;


    if (parseFloat(this.fontSize) >= this.maxFontSize) {
      console.log("Reached max font size", this.maxFontSize);
      return;
    }

    // no word wrap, check only width
    if (this.text.scrollWidth < this.container.offsetWidth && mode == 0) {
      console.log("Increasing font size because of width:", this.fontSize, this.text.scrollWidth, this.container.offsetWidth, mode);
      this.increaseFontSize();
      this.makeFontSizeBigger(mode);
      return;
    }

    // word wrap, check only height
    if (this.text.scrollHeight < this.container.offsetHeight && mode == 1) {
      console.log("Increasing font size because of width:", this.fontSize, this.text.scrollWidth, this.container.offsetWidth, mode);
      this.increaseFontSize();
      this.makeFontSizeBigger(mode);
      return;
    }

    // check boundries of container, check width and height
    if (this.text.scrollWidth < this.container.offsetWidth && this.text.scrollHeight < this.container.offsetHeight && mode == 2) {
      console.log("Increasing font size because of width and height:", this.fontSize, this.text.scrollWidth, this.container.offsetWidth, "|", this.text.scrollHeight, this.container.offsetHeight, mode);
      this.increaseFontSize();
      this.makeFontSizeBigger(mode);
      return;
    }
  }

  /**
    * decreases font size as long as it doesn't reach
    * the minimum font size or the edge of the container
    * or the height of the container depending on the word wrap
    *
    * @param {integer} mode 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height)
    *
    * @returns {void}
    */
  makeFontSizeSmaller(mode = 2) {
    if (this.probs >= this.maxProbs) {
      console.log("Reached max probation count!");
      return;
    }

    this.fontSize = window.getComputedStyle(this.text).fontSize;

    if (parseFloat(this.fontSize) <= this.minFontSize) {
      console.log("Reached min font size", this.minFontSize);
      return;
    }

    if (this.text.scrollWidth >= this.container.offsetWidth && mode == 0) {
      console.log("Decreasing font size because of width:", this.fontSize, this.text.scrollWidth, this.container.offsetWidth, mode);
      this.decreaseFontSize();
      this.makeFontSizeSmaller(mode);
      return;
    }

    if (this.text.scrollHeight >= this.container.offsetHeight && mode == 1) {
      console.log("Decreasing font size because of height:", this.fontSize, this.text.scrollHeight, this.container.offsetHeight, mode);
      this.decreaseFontSize();
      this.makeFontSizeSmaller(mode);
      return;
    }

    // check boundries of container, check width and height
    if (this.text.scrollWidth >= this.container.offsetWidth || this.text.scrollHeight >= this.container.offsetHeight && mode == 2) {
      console.log("Decreasing font size because of width and height:", this.fontSize, this.text.scrollWidth, this.container.offsetWidth, "|", this.text.scrollHeight, this.container.offsetHeight, mode);
      this.decreaseFontSize();
      this.makeFontSizeSmaller(mode);
      return;
    }
  }
}
