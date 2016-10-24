function Grid(width, height) {
	this.width = width || 10;
	this.height = height || 10;
	this.cells = {};
	this.mines = [];
	this.cleared = 0;
	this.cellCount = this.width * this.height;
	this.mineCount = 0;

	this.resetGrid();
	this.setListeners();
	this.build();
}

Grid.prototype.setListeners = function () {

	// Grid listeners
	events.on('cell:clear', function () {
		this.cleared++;
		if (this.hasWon()) {
			events.trigger('win');
		}
	}, this);

	events.on('mine:set', function () {
		this.mineCount++;
	}, this);

	events.on('warning', function (cellName) {
		cellName && this.cells[cellName].incrementThreatLevel();
	}, this);

	events.on('no:threat', function (cellName) {
		var cell = this.cells[cellName] || null;

		if (cell && !cell.isOpen) {
			cell.open();
		}
	}, this);
};

Grid.prototype.hasWon = function () {
	return this.mineCount === this.cellCount - this.cleared;
};
	
Grid.prototype.resetGrid = function () {
	if (!isEmpty(this.cells)) {
		this.cells = {};
		this.mines = [];
		this.cleared = 0;
		this.mineCount = 0;

	}

};

Grid.prototype.build = function () {
	 var main = document.getElementById('minefield');
	 var row;
	 var cellElement;
	 var text;
	 var self = this;

	 main.innerHTML = '';

	 for (var y = this.width - 1; y >= 0; y--) {
	 	row = document.createElement('div');
	 	row.classList.add('row');
	 	// row.classList.add('js-Row-' + y);
	 	main.appendChild(row);	
	 	for(var x = 0; x < this.height; x++) {
	 		this.cells[String(x) + String(y)] = new Cell({x: x, y: y});
	 		cellElement = this.cells[String(x) + String(y)].getElement();
		 	row.appendChild(cellElement);
	 	}
	 }

	 events.trigger('grid:built');
};