function GridController () {
	this.$el = document.getElementsByClassName('js-grid')[0];
	this.initialize();

	return this.grid;
}

GridController.prototype.initialize = function () { 
	this.$el.innerHTML = '';
	this.grid = new GridView({model: new GridModel(), cellView: CellView});
	this.$el.appendChild(this.grid.$el);
};

