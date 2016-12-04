function CellView (options) {
	this.$el = this.buildElement();
	this.model = options.model;

	this.listen();
}

CellView.prototype.buildElement = function () {
	var $el = document.createElement('div');
	var $content = document.createElement('span');
 	
 	$el.classList.add('cell');

 	$content.classList.add('cell-content', 'js-cell-content');
 	$el.appendChild($content);

 	$el.content = $content;

 	return $el;
 };

CellView.prototype.listen = function () {
	
	// handles clicking on a cell
	this.$el.addEventListener('click', this.onClick.bind(this));

	


	events.on('mine:placed', function (cellWithMinePlaced) {

		if (this.isNeighbor(cellWithMinePlaced)) {
			this.model.minesNearby += 1;
		}

	}.bind(this));

	events.on('no:threat', function (cellWithNoThreat) {

		if (this.isNeighbor(cellWithNoThreat)) {
			this.openCell();
		}

	}.bind(this));
};

CellView.prototype.onClick = function () {
	
	// notify game cell is clicked
	events.trigger('cell:click', this.model);

	// open cell if not opened
	this.openCell();

};

CellView.prototype.openCell = function () {
	if (this.model.isOpen) return;

	if (this.model.isMine) {

		// notify game mine was clicked
		events.trigger('mine:click');

		// style mine
		this.$el.classList.add('mine');

	} else {
		
		// update cell state
		this.model.isOpen = true;

		// style cell
		this.$el.classList.add('open', 'open-' + this.model.minesNearby);

		// add threat level
		this.$el.content.innerHTML = this.model.minesNearby || '';
		
		// notify game cell has been opened
		events.trigger('cell:open', this.model);

		// notify game if cell has zero mines nearby
		if (!this.model.minesNearby) {
			events.trigger('no:threat', this);
		}

	}
		
};

CellView.prototype.isNeighbor = function (notifyingCell) {
		// is cell in question + or - 1 x from this cell
		if (notifyingCell.model.x === this.model.x + 1 || notifyingCell.model.x === this.model.x - 1) {
			if (notifyingCell.model.y === this.model.y + 1 || notifyingCell.model.y === this.model.y - 1) {
				return true;
			}
		}
		return false;

};