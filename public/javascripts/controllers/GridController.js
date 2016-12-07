function GridController () {}

GridController.prototype.buildGrid = function () {
	return new GridView({model: new GridModel(), cellView: CellView});
};

