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

		// is notifying cell within 1 on the x axis
		if (cellWithMinePlaced.model.x <= this.model.x + 1 && cellWithMinePlaced.model.x >= this.model.x - 1) {
			
			// is notifying cell within 1 on the y axis
			if (cellWithMinePlaced.model.y <= this.model.y + 1 && cellWithMinePlaced.model.y >= this.model.y - 1) {
				this.model.minesNearby += 1;
			}
		}


	}.bind(this));

	events.on('no:threat', function (cellWithNoThreat) {

		// is notifying cell within 1 on the x axis
		if (cellWithNoThreat.model.x <= this.model.x + 1 && cellWithNoThreat.model.x >= this.model.x - 1) {
			
			// is notifying cell within 1 on the y axis
			if (cellWithNoThreat.model.y <= this.model.y + 1 && cellWithNoThreat.model.y >= this.model.y - 1) {
				
				this.openCell();
			
			}
		
		}

	}.bind(this));

	events.on('gameover', function () {
		if (this.model.isMine) {
			this.showMine();
		}		
	}.bind(this));
	
	events.on('win', function () {
		if (this.model.isMine) {
			this.animateFlag();
		}		
	}.bind(this));
};

CellView.prototype.onClick = function () {
	
	// notify game cell is clicked
	events.trigger('cell:click', this.model);

	// open cell
	this.openCell();

};

CellView.prototype.showMine = function () {
	this.$el.classList.add('mine');
	setTimeout(this.animateMine.bind(this), 20);
};

CellView.prototype.animateMine = function () {
	this.$el.classList.add('mine-animate');
};

CellView.prototype.animateFlag = function () {
	this.$el.classList.add('flag-animate');
};

CellView.prototype.openCell = function () {
	if (this.model.isOpen) return;
	if (this.model.isFlag && !controls.isFlagMode()) return;

	if (controls.isFlagMode()) {
		this.model.isFlag = !this.model.isFlag;
		if (this.model.isFlag) {
			this.animateFlag();
		} else {
			this.$el.classList.remove('flag-animate');
		}
		
	} else if (this.model.isMine) {

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
		// is notifying cell within 1 on the x axis
		if (notifyingCell.model.x <= this.model.x + 1 && notifyingCell.model.x >= this.model.x - 1) {
			
			// is notifying cell within 1 on the y axis
			if (notifyingCell.model.y <= this.model.y + 1 && notifyingCell.model.y >= this.model.y - 1) {
				
				// is notifying cell not this cell, then it is a neighbor
				if (!(notifyingCell.model.y === this.model.y && notifyingCell.model.y === this.model.y)) {
					return true;	
				}
			}
		}
		return false;

};