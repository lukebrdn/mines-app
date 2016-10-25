function GameManager() {
	this.streak = 0;
	this.longestStreak = 0;

	this.start();
	this.getStats();
	this.displayStreak();
}

GameManager.prototype.listen = function () {
	// listen for wins/loses
	// on win, incrementStreak and start
	// on loss, reset();

	events.on('win', this.handleWin, this);
	events.on('lose', this.announceLose, this);
	events.on('restart', this.start, this);
};

GameManager.prototype.getStats = function () {
	var stats = localStorage.getItem('stats');
	stats = JSON.parse(stats);

	if (stats && stats.longestStreak) {
		this.longestStreak = stats.longestStreak;
	}
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
	if (this.streak > this.longestStreak) {
		localStorage.setItem('stats', JSON.stringify({longestStreak: this.streak }));
	}
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

GameManager.prototype.handleWin = function () {
	this.incrementStreak();
	this.announceWin();
	this.displayStreak();
};

GameManager.prototype.handleLose = function () {
	this.clearStreak();
	this.announceLose();
	this.displayStreak();
};

GameManager.prototype.displayStreak = function () {
	var statboard = document.getElementsByClassName('js-stats')[0];

	statboard.innerHTML = '<p>Current streak: ' +this.streak + '</p>' +
							'<p>Longest streak: ' + this.longestStreak + '</p>';
};



