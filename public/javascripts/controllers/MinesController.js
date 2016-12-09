function MinesController () {}

MinesController.prototype.setMines = function (numberOfMines, grid, clickedCell) {
	console.log(numberOfMines);
		var mines = new MinesModel(numberOfMines);
		console.log(mines);
		var unplacedMines = mines.total;
		var cells = grid.model.cells;
		var cell;

		while (unplacedMines > 0) {

			for (var i = 0; i < cells.length; i++) {
				cell = cells[i];

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