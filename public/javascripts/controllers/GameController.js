function GameController () {
	this.isFirstClick = true;
	this.cellsOpen = 0;
	this.mines = 10;
	this.initialize();
}

GameController.prototype.initialize = function () {
	this.start();
	this.listen();
};

GameController.prototype.listen = function () {
	events.on('cell:click', this.onCellClick, this);
	events.on('cell:open', this.onCellOpen, this);
	events.on('mine:click', this.onMineClick, this);
	events.on('restart', this.start, this);
};

GameController.prototype.onCellClick = function (clickedCell) {
	if (this.isFirstClick) {
		// set mines
		var mines = new MinesController(this.grid);
		mines.setMines(this.mines, clickedCell);
		this.mineCount = mines.total;
		
		this.isFirstClick = false;
	}
};

GameController.prototype.onCellOpen = function () {

	this.cellsOpen += 1;
	if (this.cellsOpen + this.mineCount === this.grid.model.cells.length) {
		this.announceWin();
	}
};

GameController.prototype.onMineClick = function () {
	this.announceLose();
};

GameController.prototype.handleLose = function () {
	this.announceLose();
	// reveal all cells
	// reset streak

};

GameController.prototype.start = function () {
	this.grid = new GridController();
	this.isFirstClick = true;
	this.cellsOpen = 0;
	this.mineCount = 0;
};

GameController.prototype.announceWin = function () {
	var modal = new ModalController();
	modal.show({
		message: 'You won',
		buttonLabel: "Keep Playin'",
		state: 'win'
	});
};

GameController.prototype.announceLose = function () {
	var modal = new ModalController();
	modal.show({
		message: 'You lost',
		buttonLabel: 'Try Again',
		state: 'lose'
	});
};
// done build and destroy grid
// done place mines
// determine win lose
// user stats
// setup controls