function GameManager() {
	this.streak = 0;
	this.longestStreak = 0;

	this.start();
	this.displayCurrentStreak();

	if (storage) {
		this.getStats();
		this.displayStoredStats();
	}
}

GameManager.prototype.listen = function () {
	events.on('win', this.handleWin, this);
	events.on('lose', this.handleLose, this);
	events.on('restart', this.start, this);
};

GameManager.prototype.getStats = function () {
	var stats = storage.getItem('stats');
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
	if (this.streak > this.longestStreak && storage) {
		storage.setItem('stats', JSON.stringify({longestStreak: this.streak }));	
	}
};

GameManager.prototype.announceWin = function () {
	var modal = new ModalManager();
	modal.show({
		message: 'You won',
		buttonLabel: "Keep Playin'",
		state: 'win'
	});
};

GameManager.prototype.announceLose = function () {
	var modal = new ModalManager();
	modal.show({
		message: 'You lost',
		buttonLabel: 'Try Again',
		state: 'lose'
	});

};

GameManager.prototype.handleWin = function () {
	this.incrementStreak();
	this.announceWin();
	this.displayCurrentStreak();

	ga('send', 'event', {
  		'eventCategory': 'gameplay',
  		'eventAction': 'end',
  		'eventLabel': 'win'
	});
};

GameManager.prototype.handleLose = function () {
	this.clearStreak();
	this.announceLose();
	this.displayCurrentStreak();
	
	ga('send', 'event', {
  		'eventCategory': 'gameplay',
  		'eventAction': 'end',
  		'eventLabel': 'lose'
	});

};

GameManager.prototype.displayCurrentStreak = function () {
	var stat = document.getElementsByClassName('js-streak')[0];

	stat.innerHTML = this.streak;
};

GameManager.prototype.displayStoredStats = function () {
	var stat = document.getElementsByClassName('js-best')[0];

	stat.innerHTML = this.longestStreak;
};



