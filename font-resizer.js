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
  * } Custom options of the resizer
  *
  * @return void
  */
function resizer(selector, { minFontSize = 12, maxFontSize = 96, checkWidth = false, checkHeight = false, wordWrap = false, resizer = true, timeout = 100, resize = 1} = {}) {
  addEventListener("DOMContentLoaded", (event) => {
    setTimeout(function () {
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
        resizeToFit(container, text, minFontSize, maxFontSize, wordWrap, checkWidth, checkHeight);
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
  * decides if the resizing process
  * should be started by checking the
  * height of the container and text
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} maxFontSize Maximum font size
  * @param {boolean} wordWrap Should word wrap be used
  *
  * @return void
  */
function resizeToFit(container, text, minFontSize, maxFontSize, wordWrap, checkWidth, checkHeight) {
  if (text.offsetHeight == 0 || container.offsetHeight == 0) {
    console.log("Nothing to resize!");
    return;
  }

  resizeFont(container, text, minFontSize, maxFontSize, wordWrap);

  if (checkWidth && !checkHeight) {
    resizeToWidth(container, text, minFontSize, maxFontSize);
  }

  if (checkHeight && !checkWidth) {
    resizeToHeight(container, text, minFontSize, maxFontSize);
  }

  if (checkWidth && checkHeight) {
    resizeToContainer(container, text, minFontSize, maxFontSize);
  }
}

/**
  * increases size of the font of the text
  *
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} fontSize Current font size of the text
  *
  * @return void
  */
function increaseFontSize(text, fontSize) {
  text.style.fontSize = parseFloat(fontSize) + 1 + "px";
}

/**
  * decreases size of the font of the text
  *
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} fontSize Current font size of the text
  *
  * @return void
  */
function decreaseFontSize(text, fontSize) {
  text.style.fontSize = parseFloat(fontSize) - 1 + "px";
}

/**
  * decides how and when to decrease or increase the size of the font
  * by checking if word wrap is used and if the text font size
  * reached either the minimum font size or the maximum font size
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} maxFontSize Maximum font size
  * @param {boolean} wordWrap Should word wrap be used
  *
  * @return void
  */
function resizeFont(container, text, minFontSize, maxFontSize, wordWrap) {
  var fontSize = window.getComputedStyle(text).fontSize;

  if (fontSize < minFontSize) {
    console.log("Increasing font size because it is smaller than min font size!");
    makeFontSizeBigger(container, text, minFontSize, wordWrap);
    return;
  }
  
  if (fontSize > maxFontSize) {
    console.log("Reducing font size because it is bigger than max font size!");
    makeFontSizeSmaller(container, text, maxFontSize, wordWrap);
    return;
  }

  if (text.scrollHeight < container.offsetHeight && wordWrap) {
    console.log("Increasing font size!");
    makeFontSizeBigger(container, text, maxFontSize, wordWrap);
    return;
  }

  if (text.scrollHeight >= container.offsetHeight && wordWrap) {
    console.log("Reducing font size!");
    makeFontSizeSmaller(container, text, minFontSize, wordWrap);
    return;
  } 
  
  if (text.scrollWidth < container.offsetWidth && !wordWrap) {
    console.log("Increasing font size!");
    makeFontSizeBigger(container, text, maxFontSize, wordWrap);
    return;
  }

  if (text.scrollWidth >= container.offsetWidth && !wordWrap) {
    console.log("Reducing font size!");
    makeFontSizeSmaller(container, text, minFontSize, wordWrap);
    return;
  }
}

/**
  * decides how and when to decrease or increase the size of the font
  * by checking the width of container and text and if the text font size
  * reached either the minimum font size or the maximum font size
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} maxFontSize Maximum font size
  *
  * @return void
  */
function resizeToWidth(container, text, minFontSize, maxFontSize) {
  var fontSize = window.getComputedStyle(text).fontSize;

  if (fontSize < minFontSize) {
    console.log("Increasing font size because it is smaller than min font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }
  
  if (fontSize > maxFontSize) {
    console.log("Reducing font size because it is bigger than max font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
  
  if (text.scrollWidth < container.offsetWidth) {
    console.log("Increasing font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }

  if (text.scrollWidth >= container.offsetWidth) {
    console.log("Reducing font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
}

/**
  * decides how and when to decrease or increase the size of the font
  * by checking the height of container and text and if the text font size
  * reached either the minimum font size or the maximum font size
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} maxFontSize Maximum font size
  *
  * @return void
  */
function resizeToHeight(container, text, minFontSize, maxFontSize) {
  var fontSize = window.getComputedStyle(text).fontSize;

  if (fontSize < minFontSize) {
    console.log("Increasing font size because it is smaller than min font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }
  
  if (fontSize > maxFontSize) {
    console.log("Reducing font size because it is bigger than max font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
  
  if (text.scrollHeight < container.offsetHeight) {
    console.log("Increasing font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }

  if (text.scrollHeight >= container.offsetHeight) {
    console.log("Reducing font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
}

/**
  * decides how and when to decrease or increase the size of the font
  * by checking the height and width of container and text and if the text font size
  * reached either the minimum font size or the maximum font size
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} maxFontSize Maximum font size
  *
  * @return void
  */
function resizeToContainer(container, text, minFontSize, maxFontSize) {
  var fontSize = window.getComputedStyle(text).fontSize;

  if (fontSize < minFontSize) {
    console.log("Increasing font size because it is smaller than min font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }
  
  if (fontSize > maxFontSize) {
    console.log("Reducing font size because it is bigger than max font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
  
  if (text.scrollHeight < container.offsetHeight && text.scrollWidth < container.offsetWidth) {
    console.log("Increasing font size!");
    makeFontSizeBigger(container, text, minFontSize);
    return;
  }

  if (text.scrollHeight >= container.offsetHeight && text.scrollWidth >= container.offsetWidth) {
    console.log("Reducing font size!");
    makeFontSizeSmaller(container, text, minFontSize);
    return;
  }
}

/**
  * increases font size as long as it doesn't reach
  * the maximum font size or the edge of the container
  * or the height of the container depending on the word wrap
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} maxFontSize Maximum font size
  * @param {integer} mode 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height)
  *
  * @return void
  */
function makeFontSizeBigger(container, text, maxFontSize, mode = 2) {
  var fontSize = window.getComputedStyle(text).fontSize;

  console.log("Increase font size:", fontSize, text.scrollHeight, text.scrollWidth, mode);

  if (parseFloat(fontSize) >= maxFontSize) {
    console.log("Reached max font size", maxFontSize);
    return;
  }

  // no word wrap, check only width
  if (text.scrollWidth < container.offsetWidth && mode == 0) {
    increaseFontSize(text, fontSize);
    makeFontSizeBigger(container, text, maxFontSize, mode);
  }

  // word wrap, check only height
  if (text.scrollHeight < container.offsetHeight && mode == 1) {
    increaseFontSize(text, fontSize);
    makeFontSizeBigger(container, text, maxFontSize, mode);
    return;
  }

  // check boundries of container, check width and height
  if (text.scrollWidth < container.offsetWidth && text.scrollHeight < container.offsetHeight && mode == 2) {
    increaseFontSize(text, fontSize);
    makeFontSizeBigger(container, text, maxFontSize, mode);
  }
}

/**
  * decreases font size as long as it doesn't reach
  * the minimum font size or the edge of the container
  * or the height of the container depending on the word wrap
  *
  * @param {object} container HTML DOM element that contains the text
  * @param {object} text HTML DOM element that is the text in the container
  * @param {integer} minFontSize Minimum font size
  * @param {integer} mode 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height)
  *
  * @return void
  */
function makeFontSizeSmaller(container, text, minFontSize, mode) {
  var fontSize = window.getComputedStyle(text).fontSize;

  console.log("Decreasing font size:", fontSize, text.scrollHeight, text.scrollWidth, mode);

  if (parseFloat(fontSize) <= minFontSize) {
    console.log("Reached min font size", minFontSize);
    return;
  }

  if (text.scrollWidth >= container.offsetWidth && mode == 0) {
    decreaseFontSize(text, fontSize);
    makeFontSizeSmaller(container, text, minFontSize, mode);
  }

  if (text.scrollHeight >= container.offsetHeight && mode == 1) {
    decreaseFontSize(text, fontSize);
    makeFontSizeSmaller(container, text, minFontSize, mode);
  }

  // check boundries of container, check width and height
  if (text.scrollWidth >= container.offsetWidth || text.scrollHeight >= container.offsetHeight && mode == 2) {
    decreaseFontSize(text, fontSize);
    makeFontSizeSmaller(container, text, minFontSize, mode);
  }
}
