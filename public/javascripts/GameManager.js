function GameManager() {
	this.streak = 0;

	this.start();
}

GameManager.prototype.listen = function () {
	// listen for wins/loses
	// on win, incrementStreak and start
	// on loss, reset();

	events.on('win', this.announceWin, this);
	events.on('lose', this.announceLose, this);
	events.on('restart', this.start, this);
};

GameManager.prototype.start = function () {
	events = new Events();
	new Grid();
	this.listen();
};

GameManager.prototype.clearStreak = function () {
	this.streak = 0;
};

GameManager.prototype.reset = function () {
	this.clearStreak();
	this.start();
};

GameManager.prototype.incrementStreak = function () {
	this.streak++;
};

GameManager.prototype.announceWin = function () {
	var modal = new ModalManager();
	modal.show({
		message: 'You win!',
		buttonLabel: 'Play Again?'
	});
};

GameManager.prototype.announceLose = function () {
	var modal = new ModalManager();
	modal.show({
		message: 'You lose',
		buttonLabel: 'Try Again?'
	});

};



