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

	// create user if one doesn't exist
	this.user = this.user || new User();

	// set defaults
	this.setDefaults();

	// set listeners
	this.listen();


	this.showStats();

};

GameController.prototype.setMineCount = function() {
	// determines mines by Grid size level, streak
	// Level of difficulty
	var level = this.user.get("level");
	var streak =  this.user.get("streak");
	var streakAdj = .5 - (streak * .1);
	var grid = this.grid.model;
	var tiles = grid.height * grid.width;
	var maxMines = tiles * .60;
	var mines = Math.round(maxMines * (level * streakAdj), 1);
	console.log(mines);
	this.mines = mines;
};

GameController.prototype.setDefaults = function () {
	// Add Level Complexity
	this.setMineCount();

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
	this.user.decrement('level', 1, 1);
	this.announceLose();
};

GameController.prototype.handleWin = function () {
	this.user.incrementProps(['streak', 'level'], 1);
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
	this.showStreak();
	this.showBest();
};

GameController.prototype.showStreak = function () {
	var stat = document.getElementsByClassName('js-streak')[0];
	stat.innerHTML = this.user.get('streak');
};

GameController.prototype.showBest = function () {
	var stat = document.getElementsByClassName('js-best')[0];
	stat.innerHTML = this.user.get('best');
};
