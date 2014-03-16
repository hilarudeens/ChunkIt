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
				imgURL : 'data:image/jpeg;base64,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', // Image url to fetch image from remote
				maxContainerWidth : 500, // Set maximum possible grid width.
				startXY : [0, 0], // Set start point of cropping in image.
				endXY : [0, 0], // Set end point of cropping in image. Zero is equivalent mention image's width and height.
				cellsInRow : 5, // Number of cells in grid row.
				cellsInColumn : 5, // Number of cells in grid column.
				shrinkCellDimension : true, // Adjust cell dimension to fit range of endXY - startXY.
				cropExtraSpaces : false, // Truncate extra/overflow spaces if any, this is automatically override by shrinkCellDimension option

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
