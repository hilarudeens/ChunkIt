/**
 * NAME: ChunkIt
 *
 * VERSION: 0.0.1
 *
 * AUTHOR: hilarudeens<hilar.udeen@gmail.com>
 *
 * ========================================
 * License
 * ========================================
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 hilarudeens<hilar.udeen@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(window, $, undefined) {'use strict';
	function ChunkIt(elem, options) {
		this.init(elem, options);
	}

	var prototypes = ChunkIt.prototype = {
		// INITIALIZATION
		/**
		 * Function to initiate cropping image.
		 *
		 * @param {Object} elem Javascript's DOM object
		 * @param {Object} defaults Defaults options
		 * @param {Object} options Overridden options
		 */
		init : function(elem, options) {
			var defaults = {
				imgURL : '', // Image url to fetch image from remote
				maxContainerWidth : 500, // Set maximum possible grid width.
				startXY : [0, 0], // Set start point of cropping in image.
				endXY : [0, 0], // Set end point of cropping in image. Zero is equivalent mention image's width and height.
				cellsInRow : 5, // Number of cells in grid row.
				cellsInColumn : 5, // Number of cells in grid column.
				shrinkCellDimension : true, // Adjust cell dimension to fit range of endXY - startXY.
				cropExtraSpaces : false, // Truncate extra/overflow spaces if any, this is automatically override by shrinkCellDimension option
				shuffle: false, // Boolean value set for shuffle cropped images.
				gridCellWrapperTpl : '<li class="cell"></li>', // Cell image's wrapper template
				gridRowWrapperTpl : '', // Row images wrapper template
				gridBodyWrapperTpl : '<ul class="grid"></ul>',

				// Event based callback functions
				onImageLoad : function($event, currentObj, $imageElem) {
					// Callback function will be executed after image load.
				},
				onGetGridMetaData : function($event, currentObj, gridData) {
					// Callback function will be executed after generating cropping co-ordinates.
				},
				onShuffleCoordinates : function($event, currentObj, gridData) {
					// Callback function will be executed on after shuffle done.
				},
				onCellWrapping : function($event, currentObj, $wrappedCellElem, $wrappedParentElem) {
					// Callback function will be executed on wrapping cell DOM element by using wrapper template.
				},
				onRowWrapping : function($event, currentObj, $wrappedRowElem, $wrappedParentElem) {
					// Callback function will be executed on wrapping row DOM elements by using wrapper template.
				},
				onGetGridElem : function($event, currentObj, $gridElem) {
					// Callback function will be executed on generating grid's DOM element.
				},
				onAfterFinish : function($event, currenObj) {
					// Callback function will be executed on after inserting grid in "document" object.
				}
			};
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);
			self.options = $.extend({}, defaults, options);

			// Check and update coordinates
			self.options.startXY[0] = self._checkPositiveInterger(self.options.startXY[0]);
			self.options.startXY[1] = self._checkPositiveInterger(self.options.startXY[1]);
			self.options.endXY[0] = self._checkPositiveInterger(self.options.endXY[0]);
			self.options.endXY[1] = self._checkPositiveInterger(self.options.endXY[1]);
			self.options.maxContainerWidth = self._checkPositiveInterger(self.options.maxContainerWidth) || 500;

			self.$elem.on('imageLoad', self.options.onImageLoad);
			self.$elem.on('getGridMetaData', self.options.onGetGridMetaData);
			self.$elem.on('shuffleCoordinates', self.options.onShuffleCoordinates);
			self.$elem.on('cellWrapping', self.options.onCellWrapping);
			self.$elem.on('rowWrapping', self.options.onRowWrapping);
			self.$elem.on('getGridElem', self.options.onGetGridElem);
			self.$elem.on('afterFinish', self.options.onAfterFinish);

			// Load image.
			self.imageLoad();
		},

		// UTILITIES
		/**
		 * Function to check and update positive integer.
		 * @param {*} number can be parshable valid number.
		 * @return {Number} return valid positive number
		 */
		_checkPositiveInterger : function(number) {
			return (number < 0 || !parseInt(number)) ? 0 : number;
		},

		// EXECUTION CONTROLLER
		/**
		 * Function to process image after load
		 */
		_afterImageLoad : function() {
			var self = this;
			var options = self.options;

			// Generate grid data.
			var gridData = self._getGridMetaData();

			// Shuffle data.
			gridData.coordinates = options.shuffle ? self._shuffleCoordinates(gridData.coordinates) : gridData.coordinates;

			// Chopping the image and generate grid element
			var $gridElem = self._chopImage(gridData);

			// Add generated grid element in DOM.
			self.$elem.append($gridElem);

			// Trigger event after finish workflow.
			self.$elem.trigger('afterFinish', self);
		},

		// LOADING IMAGE
		/**
		 * Function to load image.
		 */
		imageLoad : function() {
			var self = this;
			var $img = self.$img = $(document.createElement('img'));
			$img.one('load', function() {
				// Trigger event on image load done to execute callback.
				self.$elem.trigger('imageLoad', [self, $img]);
				self._afterImageLoad.call(self);
			});
			$img.error(function() {
				throw new Error('Failed to load image...')
			});
			$img.attr('src', self.options.imgURL);
		},

		// WRAPPER HANDLING
		/**
		 * Function to do cell wrapping.
		 * @param {Object} $cellContent jQuery object for cell content
		 */
		_cellWrapping : function($cellContent) {
			var self = this;
			var wrapData = (!!self.options.gridCellWrapperTpl ? $(self.options.gridCellWrapperTpl).append($cellContent) : $cellContent);
			return wrapData;
		},
		/**
		 * Function to do row wrapping.
		 * @param {Object} $rowContent jQuery object for row content.
		 */
		_rowWrapping : function($rowContent) {
			var self = this;
			return (!!self.options.gridRowWrapperTpl ? $(self.options.gridRowWrapperTpl).append($rowContent) : $rowContent);
		},
		/**
		 * Function to do grid wrapping.
		 * @param {Object} $gridContent jQuery object for grid content.
		 */
		_gridWrapping : function($gridContent) {
			var self = this;

			return (!!self.options.gridBodyWrapperTpl ? $(self.options.gridBodyWrapperTpl).append($gridContent) : $gridContent);
		},

		// COORDINATES PROCESSING
		/**
		 * FUnction to generate grid data like no. of rows, no. of columns, cell width, cell height,
		 * coordinates.
		 */
		_getGridMetaData : function() {
			var self = this;
			// Get plugin options
			var options = self.options;

			// Copy to locale variables
			var originX = options.startXY[0];
			var originY = options.startXY[1];
			var imgWidth = self.$img[0].width;
			var imgHeight = self.$img[0].height;

			// Check and update end coordinates
			options.endXY[0] = options.endXY[0] === 0 ? imgWidth : options.endXY[0];
			options.endXY[1] = options.endXY[1] === 0 ? imgHeight : options.endXY[1];

			// Adjust crop range based on image dimension
			if (options.shrinkCellDimension) {
				options.endXY[0] = options.endXY[0] > imgWidth ? imgWidth : options.endXY[0];
				options.endXY[1] = options.endXY[1] > imgHeight ? imgHeight : options.endXY[1];
			}

			// Limit possible crop range
			var maxWidthRange = options.endXY[0] - options.startXY[0];
			var maxHeightRange = options.endXY[1] - options.startXY[1];

			// Calculate cell dimension
			var cellWidth = parseInt(maxWidthRange / options.cellsInRow);
			var cellHeight = parseInt(maxHeightRange / options.cellsInColumn);

			var maxWidth = options.startXY[0] + (cellWidth * options.cellsInRow);
			var maxHeight = options.startXY[1] + (cellHeight * options.cellsInColumn);

			if (options.cropExtraSpaces) {
				maxWidth = maxWidth > imgWidth ? imgWidth : maxWidth;
				maxHeight = maxHeight > imgHeight ? imgHeight : maxHeight;
			}

			// Count number of rows and columns
			var columns = options.cellsInRow;
			var rows = options.cellsInColumn;

			// Calculate co-ordinates
			var coordinatesData = self._createCellCoordinates(originX, originY, rows, columns, cellWidth, cellHeight, maxWidth, maxHeight, options.cropExtraSpaces);

			var gridMetaData = {
				rows : coordinatesData.rowsCount,
				columns : coordinatesData.columnsCount,
				stdColumns : columns,
				stdRows : rows,
				stdCellWidth : cellWidth,
				stdCellHeight : cellHeight,
				coordinates : coordinatesData.coordinates
			};

			// Trigger event with generated grid meta data to execute callback.
			self.$elem.trigger('getGridMetaData', [self, self.options.onGetGridMetaData]);
			return gridMetaData;
		},
		/**
		 * Function to create cell co-ordinates. This will return list of cropping
		 * position in pixels.
		 *
		 * @return {Object}
		 */
		_createCellCoordinates : function(originX, originY, rows, columns, cellWidth, cellHeight, maxWidth, maxHeight, cropExcessRange) {

			// Stores grid information
			var coordinates = [];
			var rowsCount = 0;
			var columnsCount = 0;

			// Utility variables
			var x = 0, x1 = 0, y = 0, y1 = 0, count = 0, rowCellCoordinates = [], cellData = {};

			for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
				rowCellCoordinates = [];
				for (var columnIndex = 0; columnIndex < columns; columnIndex++) {
					count++;
					x = originX + (columnIndex * cellWidth);
					y = originY + (rowIndex * cellHeight);
					x1 = parseInt(x + cellWidth);
					y1 = parseInt(y + cellHeight);

					// To truncate unwanted spaces in width
					if (cropExcessRange) {
						if (x > maxWidth || y > maxHeight)
							break;
						x1 = x1 > maxWidth ? maxWidth : x1;
						y1 = y1 > maxHeight ? maxHeight : y1;
					}

					cellData = {
						id : count,
						x : x,
						y : y,
						x1 : x1,
						y1 : y1
					};
					coordinates.push(cellData);
					columnsCount = columnIndex + 1;
				}
				// To truncate unwanted spaces in height
				if (cropExcessRange) {
					if (y > maxHeight)
						break;
				}
				rowsCount = rowIndex + 1;
			}
			return {
				rowsCount : rowsCount,
				columnsCount : columnsCount,
				coordinates : coordinates
			};
		},
		/**
		 * Function to shuffle coordinates.
		 * @param {Array} coordinates
		 * @return {Array} shuffled coordinates.
		 */
		_shuffleCoordinates : function(coordinates) {
			var self = this;
			coordinates.forEach(function(elem, index, selfarr) {
				selfarr.splice(parseInt(Math.random() * selfarr.length), 0, selfarr.splice(index, 1)[0]);
			});
			// Trigger event on finishing shuffle.
			self.$elem.trigger('shuffleCoordinates', [self, coordinates]);
			return coordinates;
		},

		// IMAGE CROP
		/**
		 * Function to crop image based on co-ordinates data.
		 *
		 * @param {Object} gridData
		 * @return {Object} jQuery DOM Object
		 */
		_chopImage : function(gridData) {
			var self = this;
			var options = self.options;
			var containerWidth = options.maxContainerWidth;

			var gridsData = gridData.coordinates;
			var virtualCanvas = document.createElement('canvas');
			var virtualCanvasContext = virtualCanvas.getContext('2d');
			var gridWidth = 0;
			var img;

			// jQuery utility temporary holder elements.
			var $cellHolder = $('<div>');
			var $rowHolder = $('<div>');
			var $cellElem = null;
			var $rowElem = null;
			var $gridElem = null;

			// Counter to handle single dimensional array as two dimensional range
			var counter = 0;

			for (var rowIndex = 0; rowIndex < gridData.rows; rowIndex++) {

				$cellHolder = $('<div>');

				for (var columnIndex = 0; columnIndex < gridData.columns; columnIndex++) {

					// Setup image clip dimension.
					var clipWidth = gridsData[counter].x1 - gridsData[counter].x;
					var clipHeight = gridsData[counter].y1 - gridsData[counter].y;

					// Setup canvas dimension, this is to override default dimension.
					// This is should be reinitiate on each redraw.
					virtualCanvas.width = clipWidth;
					virtualCanvas.height = clipHeight;

					// Crop image
					virtualCanvasContext.drawImage(self.$img[0], gridsData[counter].x, gridsData[counter].y, clipWidth, clipHeight, 0, 0, clipWidth, clipHeight);

					// Read and store cropped image
					img = document.createElement('img');
					img.src = virtualCanvas.toDataURL('image/png');

					// Change image width based on container width
					var ratio = (containerWidth / gridData.stdColumns) / gridData.stdCellWidth;
					img.style.width = parseInt(ratio * clipWidth) + 'px';

					$cellElem = self._cellWrapping($(img)).attr('id', 'cell_' + gridsData[counter].id);
					$cellHolder.append($cellElem);

					// Trigger event on constructing cell element
					self.$elem.trigger('cellWrapping', [self, $cellElem, $cellHolder]);

					// Calculating row width
					if (rowIndex + 1 === gridData.rows) {
						gridWidth += parseInt(ratio * clipWidth);
					}
					counter++;
				}
				$rowElem = self._rowWrapping($cellHolder.children())
				$rowHolder.append($rowElem);

				// Trigger event on constructing row element
				self.$elem.trigger('rowWrapping', [self, $rowElem, $rowHolder]);
			}

			$gridElem = self._gridWrapping($rowHolder.children()).width(gridWidth);

			// Trigger event on constructing grid element
			self.$elem.trigger('getGridElem', [self, $gridElem]);

			return $gridElem;
		}
	};
	/**
	 * Function to iterate match element and do the image crop.
	 * @param {Object} options customized option list to override default functionality.
	 * @return {Object} jQuery object to support chain pattern.
	 */
	var chunkIt = function(options) {
		return this.each(function() {
			new ChunkIt(this, options);
		});
	};

	/**
	 * Function to allow extend ChunkIt plugins.
	 * @param {Object} Class
	 * @return {Object} extended class
	 */
	ChunkIt.extend = function(Class) {
		Class || ( Class = function() {
		});
		Class.prototype = $.fn.extend({}, prototypes, Class.prototype);
		return Class;
	};

	// Register plugin with jQuery
	window.$.fn['chunkIt'] = chunkIt;

})(window, jQuery);
