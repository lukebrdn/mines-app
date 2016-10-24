function Cell(position) {
	if (!position) {
		console.error('cell must have a position');
		return;
	}
	this.setPosition(position);
	this.setDefaults();
	this.setUIElement();
	this.setMine();
	this.setListeners();
}

Cell.prototype.messageNeighbors = function (message) {
	for (var i = 0; i < this.neighbors.length; i++) {
		events.trigger(message, this.neighbors[i])
	}
};

Cell.prototype.warnNeighbors = function () {
	if (this.isMine) {
		this.messageNeighbors('warning');
	}
};

Cell.prototype.mapNeighbors = function () {
	var rowTop = String(this.y + 1);
	var rowMid = String(this.y);
	var rowBottom = String(this.y - 1);

	var colLeft = String(this.x - 1);
	var colMid = String(this.x);
	var colRight = String(this.x + 1);

	var topLeft = colLeft + rowTop;
	var topMid = colMid + rowTop
	var topRight = colRight + rowTop;

	var midLeft = colLeft + rowMid;
	var midMid = colMid + rowMid;
	var midRight = colRight + rowMid;

	var bottomLeft = colLeft + rowBottom;
	var bottomMid = colMid + rowBottom;
	var bottomRight = colRight + rowBottom;


	if (this.x === 0) {
		topLeft = '';
		midLeft = '';
		bottomLeft = '';
	}

	if (this.x === 9) {
		topRight = '';
		midRight = '';
		bottomRight = '';
	}

	if (this.y === 0) {
		bottomLeft = '';
		bottomMid = '';
		bottomRight = '';
	}

	if (this.y === 9) {
		topLeft = '';
		topMid = '';
		topRight = '';
	}

	return [topLeft, topMid, topRight, midLeft, midRight, bottomLeft, bottomMid, bottomRight]
};

Cell.prototype.buildUIElement = function () {
	var $el;
	var $content;

	$el = document.createElement('div');
 	$el.classList.add('cell');
 	$el.classList.add('js-Cell-' + this.x + this.y);

 	$content = document.createElement('span');
 	$content.classList.add('cell-content', 'js-cell-content');
	
 	$el.appendChild($content);

 	return { cell: $el, content: $content };
 };

Cell.prototype.onClick = function (e) {
	// Stop click handler if cell is open
	if (this.isOpen) return;
	
	if (this.isMine) {
		events.trigger('lose');
	} else {
		this.isOpen = true;
		events.trigger('cell:clear');
	
		if (!this.threatLevel) {
			this.messageNeighbors('no:threat');
		}

		this.displayThreat();

	}
};

Cell.prototype.getElement = function () {
	return this.ui.cell;
};

Cell.prototype.incrementThreatLevel = function () {
	this.threatLevel++;
	return this.threatLevel;
};

Cell.prototype.open = function () {
	this.onClick();
};

Cell.prototype.displayThreat = function () {

	if (this.isMine) {
		this.ui.content.innerHTML = 'M';
	} else {
		this.ui.content.innerHTML = this.threatLevel;
		this.ui.cell.classList.add('open-' + this.threatLevel);
	}
	this.isOpen = true;
};









// These set cell values
// They all have side effects that alter the cell's properties
// These should not be used publicly
Cell.prototype.setPosition = function (position) {
	this.x = position.x;
	this.y = position.y;
};

Cell.prototype.setDefaults = function () {
	this.isOpen = false;
	this.isMine = false;
	this.threatLevel = 0;
	this.neighbors;
};

Cell.prototype.setUIElement = function () {
	var UIElement = this.buildUIElement();
	this.ui = UIElement;
};

Cell.prototype.setMine = function () {
	this.isMine = getRandomIntInclusive(1, 10) < 3;

	if (this.isMine) {
		events.trigger('mine:set', {x: this.x, y: this.y});
	}
};

Cell.prototype.setNeighbors = function () {
	this.neighbors = this.mapNeighbors();
	this.warnNeighbors();
};

Cell.prototype.setListeners = function () {
	setClickListener(this.ui.cell, this.onClick, this);
	events.on('grid:built', this.setNeighbors, this);
};










