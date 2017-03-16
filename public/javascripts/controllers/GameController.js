function GameController () {

	// start game
	this.start();
}

GameController.prototype.start = function () {
	// set event system
	events = new Events();

	// set up controls
	controls = new ControlsController();

	var gridContainer = document.getElementsByClassName('js-grid-container')[0];

	// build grid
	this.grid = new GridController().buildGrid();

	// empty anchor element of any preexiting inner html
	gridContainer.innerHTML = '';

	// append grid to anchor element
	gridContainer.appendChild(this.grid.$el);

	// set defaults
	this.setDefaults();

	// set listeners
	this.listen();

	// create user if one doesn't exist
	this.user = this.user || new User();
	this.mines = this.user.level;

	this.showStats();

};

GameController.prototype.setDefaults = function () {

	// set defaults
	this.isFirstClick = true;
	this.cellsOpen = 0;
};

GameController.prototype.listen = function () {
	events.on('cell:click', this.onCellClick, this);
	events.on('cell:open', this.onCellOpen, this);
	events.on('mine:click', this.onMineClick, this);
	events.on('restart', this.start, this);
};



// Event Handlers
GameController.prototype.onCellClick = function (clickedCell) {

	if (this.isFirstClick) {

		// set mines, except on the clicked cell
		var minesController = new MinesController();
		minesController.setMines(this.mines, this.grid, clickedCell);
		
		this.isFirstClick = false;
	}

	return this.mode;
};

GameController.prototype.onCellOpen = function () {

	this.cellsOpen += 1;
	if (this.cellsOpen + this.mines === this.grid.model.cells.length) {
		this.handleWin();
	}
};

GameController.prototype.onMineClick = function () {
	this.handleLose();
};

GameController.prototype.handleLose = function () {
	this.user.set('streak', 0);
	this.user.set('level', 5);
	events.trigger('gameover');
	this.announceLose();
};

GameController.prototype.handleWin = function () {
	this.user.increment('streak', 1);
	this.user.increment('level', 1);
	this.announceWin();
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

GameController.prototype.showStats = function () {
	if (this.user.get('best') > 5) {
		this.showBest();
	}
	
	this.showLevel();
};


GameController.prototype.showBest = function () {
	var best = document.getElementsByClassName('js-level-best-container')[0];
	var stat = document.getElementsByClassName('js-level-best')[0];
	
	best.style.display = 'inline-block';
	stat.innerHTML = this.user.get('best');

};

GameController.prototype.showLevel = function () {
	var level = document.getElementsByClassName('js-level')[0];
	level.innerHTML = this.user.get('level');

};
