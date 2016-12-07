function GridView (options) {
	this.$el = document.createElement('div');
	this.model = options.model;
	this.cellView = options.cellView;

	this.buildGrid();

	return {$el: this.$el, model: this.model};
}

GridView.prototype.buildGrid = function () {
	var row;
	var cell;
	
	for (var y = this.model.width - 1; y >= 0; y--) {

		row = this.buildRow();

		this.$el.appendChild(row);
		
		for(var x = 0; x < this.model.height; x++) {
			
			cell = new CellView({model: new CellModel(x, y)});
			
			this.model.cells.push(cell);
	 		
	 		// add cell element to row
	 		row.appendChild(cell.$el);
		}
	}
	events.trigger('grid:built');
};

GridView.prototype.buildRow = function () {
	var row = document.createElement('div');
	row.classList.add('row');
	
	return row;
};
