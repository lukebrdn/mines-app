function MinesController () {}

// Think it may make more sense to have all code affecting mines
// open and numbers in the same spot
MinesController.prototype.getFieldCounts = function(stats, grid) {
	// determines mines by Grid size level, streak
	// Level of difficulty
	var tiles = grid.model.height * grid.model.width;
	var maxMines = tiles * .60;
	var streakAdj = .6;
	if (stats.streak <= 6) {
		streakAdj = .6 - (stats.streak * .1);
	}
	var mines = Math.round(maxMines * (stats.level * streakAdj), 1);
	var rTiles = tiles - mines;
	var open = Math.round(rTiles * .5, 1) - stats.level - stats.streak;
	// console.log("Need ", out)
	return {'mines': mines, 'open': open};
};

MinesController.prototype.buildSafeZone = function(stats, field, grid, clickedCell) {
	var coords = {x: clickedCell.x, y: clickedCell.y}
	var maxZoneSize = field.open
	// TODO add better tuning to below
	var zoneSize = 7;
	if (stats.level > 4) zoneSize = 8 - Math.round(stats.level/2, 1);

	// var zone = getAdjacentCoords(clickedCell, 7).slice(0, zoneSize);
	var indexOfClick = getCellIndex(clickedCell, grid.model.height, grid.model.width);
	console.log(indexOfClick);
	var zoneIndexes = getAreaIndexes(indexOfClick, grid.model.width, grid.model.height);
	return zoneIndexes.slice(0, zoneSize)
};

MinesController.prototype.setMines = function (stats, grid, clickedCell) {
	var theField = this.getFieldCounts(stats, grid);
	console.log("Generating Mine Field: ", theField);
	var safeZone = this.buildSafeZone(stats, theField, grid, clickedCell);
	var mines = new MinesModel(theField.mines);
	var unplacedMines = mines.total;
	var cells = grid.model.cells;
	var cell;

	while (unplacedMines > 0) {
		for (var i = 0; i < cells.length; i++) {
			cell = cells[i];

			// if (safeZone.includes(i)) {
			// 	cell.model.isOpen = true;
			// }
			// else
				if (unplacedMines) {
				if (!cell.model.isMine) {
					if (!(clickedCell.x === cell.model.x && clickedCell.y === cell.model.y)) {

						if (getRandomIntInclusive(0, 20) > 18) {
							cell.model.isMine = true;
							events.trigger('mine:placed', cell);
							unplacedMines--;
						}
					}
				}

			}
		}
	}
}
