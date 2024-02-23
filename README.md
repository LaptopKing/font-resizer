# Font resizer
## Useage
```html
<div class="hl-container" id="hl-container"> <- Call function to this element
  <div class="hl">This is a test text</div>
</div>
```
```js
// call resizer with some options and get container element by class
resizer('.hl-container', {minFontSize: 12, maxFontSize: 96, wordWrap: false});

// call resizer to resize without wordWrap and resize font to container height
resizer('.hl-container', {minFontSize: 12, maxFontSize: 96, wordWrap: false, checkHeight: true});

// call resizer to resize with wordWrap and resize font to container width
resizer('.hl-container', {minFontSize: 12, maxFontSize: 96, wordWrap: true, checkWidth: true});

// call resizer with all options and get container element by id
resizer('#hl-container', {minFontSize: 12, maxFontSize: 96, checkWidth: false, checkHeight: false, wordWrap: false, resizer: true, timeout: 150, resize: 1, maxProbs: 300});
```

## Classes

<dl>
<dt><a href="#Resizer">Resizer</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#resizer">resizer(selector, options)</a> ⇒ <code>void</code></dt>
<dd><p>resizes container&#39;s text&#39;s font according
to the size of the container</p>
</dd>
</dl>

<a name="Resizer"></a>

## Resizer
**Kind**: global class  

* [Resizer](#Resizer)
    * [new Resizer(container, text, minFontSize, maxFontSize, wordWrap, checkWidth, checkHeight, maxProbs, probs, fontSize)](#new_Resizer_new)
    * [.resizeToFit()](#Resizer+resizeToFit) ⇒ <code>void</code>
    * [.increaseFontSize()](#Resizer+increaseFontSize) ⇒ <code>void</code>
    * [.decreaseFontSize()](#Resizer+decreaseFontSize) ⇒ <code>void</code>
    * [.resizeFont()](#Resizer+resizeFont) ⇒ <code>void</code>
    * [.resizeToWidth()](#Resizer+resizeToWidth) ⇒ <code>void</code>
    * [.resizeToHeight()](#Resizer+resizeToHeight) ⇒ <code>void</code>
    * [.resizeToContainer()](#Resizer+resizeToContainer) ⇒ <code>void</code>
    * [.makeFontSizeBigger(mode)](#Resizer+makeFontSizeBigger) ⇒ <code>void</code>
    * [.makeFontSizeSmaller(mode)](#Resizer+makeFontSizeSmaller) ⇒ <code>void</code>

<a name="new_Resizer_new"></a>

### new Resizer(container, text, minFontSize, maxFontSize, wordWrap, checkWidth, checkHeight, maxProbs, probs, fontSize)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>object</code> | HTML DOM element that contains the text |
| text | <code>object</code> | HTML DOM element that is the text in the container |
| minFontSize | <code>integer</code> | Minimum font size |
| maxFontSize | <code>integer</code> | Maximum font size |
| wordWrap | <code>boolean</code> | Should word wrap be used |
| checkWidth | <code>boolean</code> | Checks width either way, even if wordWrap is used |
| checkHeight | <code>boolean</code> | Checks height either way, even if wordWrap is not used |
| maxProbs | <code>integer</code> | The maximum number of probes |
| probs | <code>integer</code> | The current number of probes |
| fontSize | <code>integer</code> | Current font size of the text |

<a name="Resizer+resizeToFit"></a>

### resizer.resizeToFit() ⇒ <code>void</code>
decides if the resizing process
should be started by checking the
height of the container and text

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+increaseFontSize"></a>

### resizer.increaseFontSize() ⇒ <code>void</code>
increases size of the font of the text

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+decreaseFontSize"></a>

### resizer.decreaseFontSize() ⇒ <code>void</code>
decreases size of the font of the text

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+resizeFont"></a>

### resizer.resizeFont() ⇒ <code>void</code>
decides how and when to decrease or increase the size of the font
by checking if word wrap is used and if the text font size
reached either the minimum font size or the maximum font size

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+resizeToWidth"></a>

### resizer.resizeToWidth() ⇒ <code>void</code>
decides how and when to decrease or increase the size of the font
by checking the width of container and text and if the text font size
reached either the minimum font size or the maximum font size

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+resizeToHeight"></a>

### resizer.resizeToHeight() ⇒ <code>void</code>
decides how and when to decrease or increase the size of the font
by checking the height of container and text and if the text font size
reached either the minimum font size or the maximum font size

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+resizeToContainer"></a>

### resizer.resizeToContainer() ⇒ <code>void</code>
decides how and when to decrease or increase the size of the font
by checking the height and width of container and text and if the text font size
reached either the minimum font size or the maximum font size

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  
<a name="Resizer+makeFontSizeBigger"></a>

### resizer.makeFontSizeBigger(mode) ⇒ <code>void</code>
increases font size as long as it doesn't reach
the maximum font size or the edge of the container
or the height of the container depending on the word wrap

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>integer</code> | <code>2</code> | 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height) |

<a name="Resizer+makeFontSizeSmaller"></a>

### resizer.makeFontSizeSmaller(mode) ⇒ <code>void</code>
decreases font size as long as it doesn't reach
the minimum font size or the edge of the container
or the height of the container depending on the word wrap

**Kind**: instance method of [<code>Resizer</code>](#Resizer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>integer</code> | <code>2</code> | 0 = no word wrap (height), 1 = word wrap (width), 2 = check container boundries (width, height) |

<a name="resizer"></a>

## resizer(selector, options) ⇒ <code>void</code>
resizes container's text's font according
to the size of the container

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | Used to retrieve element from document |
| options | <code>object</code> | {   {integer} minFontSize Minimum font size the text can have   {integer} maxFontSize Maximum font size the text can have   {boolean} wordWrap Should word wrap be used or not   {boolean} resizer Should the resizer run or just exit   {integer} timeout How much to delay before starting resizer   {integer} resize How many times should the resizer run   {integer} maxProbs The amount of times it can resize a text } Custom options of the resizer |

