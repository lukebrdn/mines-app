function MinesController (grid) {
	this.grid = grid;
}

MinesController.prototype.setMines = function (num, clickedCell) {
		this.total = num;
		var mines = new MinesModel(num);
		var unplacedMines = mines.total;
		var cells = this.grid.model.cells;
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