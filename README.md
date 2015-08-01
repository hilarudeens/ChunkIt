ChunkIt
=======

## Welcome words!
A jQuery plugin and image processing utility. This is useful when you are playing with images. This enables you to extract portion of image, crop, de-sprite and many more.

## Document
[Website](http://hilarudeens.github.io/ChunkIt)

## Demo
[Show me demo](http://hilarudeens.github.io/ChunkIt/demo)

## Browser Requirements
This plugin is using HTML5 canvas internally. Hence, It require IE9 or higher version and latest Mozilla, Chrome. Please read following url for [browser support](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)

## Options
- imgURL
- maxContainerWidth
- scaleImage
- startXY
- endXY
- cellsInRow
- cellsInColumn
- shrinkCellDimension
- cropExtraSpaces
- shuffle
- gridCellWrapperTpl
- gridRowWrapperTpl
- gridBodyWrapperTpl

## Callbacks
- onImageLoad : function($event, currentObj, $imageElem) 
- onGetGridMetaData : function($event, currentObj, gridData)
- onShuffleCoordinates : function($event, currentObj, gridData)
- onCellWrapping : function($event, currentObj, $wrappedCellElem, $wrappedParentElem)
- onRowWrapping : function($event, currentObj, $wrappedRowElem, $wrappedParentElem)
- onGetGridElem : function($event, currentObj, $gridElem)
- onAfterFinish : function($event, currenObj)

## Events
- imageLoad
- getGridMetaData
- shuffleCoordinates
- cellWrapping
- rowWrapping
- getGridElem
- afterFinish

For more detail please read [website](http://hilarudeens.github.io/ChunkIt)

## Author
Hilarudeen Sheik Allaudeen(@hilarudeens)

**Email** <hilar.udeen@gmail.com>

## Support or Contact
Please open the issues in [GitHub](https://github.com/hilarudeens/ChunkIt/issues)

## License 
The MIT License [MIT](https://github.com/hilarudeens/ChunkIt/blob/master/LICENSE)


