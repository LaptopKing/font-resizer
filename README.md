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
resizer('#hl-container', {minFontSize: 12, maxFontSize: 96, checkWidth = false, checkHeight = false, wordWrap: false, resizer: true, timeout: 150, resize: 1});
```

## Functions
## resizer(selector, options) ⇒
resizes container's text's font according
to the size of the container

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| selector | string | Used to retrieve element from document |
| options | object | Used to set options for resizer |

| Option | Type | Description | Default value |
| --- | --- | --- | --- |
| minFontSize | integer | Minimum font size the text can have | (int) 12
| maxFontSize | integer | Maximum font size the text can have | (int) 96
| wordWrap | boolean | Should word wrap be used or not | (boolean) false
| checkWidth | boolean | Make sure to resize font to container width | (boolean) false
| checkHeight | boolean | Make sure to resize font to container height | (boolean) false
| resizer | boolean | Should the resizer run or just exit | (boolean) true
| timeout | integer | How much to delay before starting resizer | (int) 100
| resize | integer | How many times should the resizer run | (int) 1

### wordWrap Option
If set to true it adds wordWrap style and resize font with checking only container height
If set to false it removes any wordWrap style and resize font with checking only container width

## resizeToFit(container, text, minFontSize, maxFontSize, wordWrap) ⇒
decides if the resizing process
should be started by checking the
height of the container and text

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| container | object | HTML DOM element that contains the text |
| text | object | HTML DOM element that is the text in the container |
| minFontSize | integer | Minimum font size |
| maxFontSize | integer | Maximum font size |
| wordWrap | boolean | Should word wrap be used |

## increaseFontSize(text, fontSize) ⇒
increases size of the font of the text

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| text | object | HTML DOM element that is the text in the container |
| fontSize | integer | Current font size of the text |

## decreaseFontSize(text, fontSize) ⇒
decreases size of the font of the text

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| text | object | HTML DOM element that is the text in the container |
| fontSize | integer | Current font size of the text |

## resizeFont(container, text, minFontSize, maxFontSize, wordWrap) ⇒
decides how and when to decrease or increase the size of the font
by checking if word wrap is used and if the text font size
reached either the minimum font size or the maximum font size

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| container | object | HTML DOM element that contains the text |
| text | object | HTML DOM element that is the text in the container |
| minFontSize | integer | Minimum font size |
| maxFontSize | integer | Maximum font size |
| wordWrap | boolean | Should word wrap be used |

## makeFontSizeBigger(container, text, maxFontSize, wordWrap) ⇒
increases font size as long as it doesn't reach
the maximum font size or the edge of the container
or the height of the container depending on the word wrap

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| container | object | HTML DOM element that contains the text |
| text | object | HTML DOM element that is the text in the container |
| maxFontSize | integer | Maximum font size |
| wordWrap | boolean | Should word wrap be used |

## makeFontSizeSmaller(container, text, minFontSize, wordWrap) ⇒
decreases font size as long as it doesn't reach
the minimum font size or the edge of the container
or the height of the container depending on the word wrap

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| container | object | HTML DOM element that contains the text |
| text | object | HTML DOM element that is the text in the container |
| minFontSize | integer | Minimum font size |
| wordWrap | boolean | Should word wrap be used |
