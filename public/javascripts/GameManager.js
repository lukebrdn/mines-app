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

	var modeButtons = document.getElementsByClassName('js-mode-button');
	for (var i = 0; i < modeButtons.length; i++) {
		setClickListener(modeButtons[i], this.setMode, this);
	}
	

	document.onkeydown = function (e) {
	
		if (e.keyCode === 91) {
			settings.setMode('flag');
			this.toggleModeUI();
		}
	}.bind(this);

	document.onkeyup = function (e) {
		if (e.keyCode === 91) {
			settings.setMode('default');
			this.toggleModeUI();
		}
	}.bind(this);
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

GameManager.prototype.setMode = function (e) {
	var mode = e.currentTarget.getAttribute('data-mode');
	if (mode !== settings.getMode()) {
		settings.setMode(mode);
		this.toggleModeUI();
	}
}

GameManager.prototype.toggleModeUI = function () {
	var mode = settings.getMode();

	document.getElementsByClassName('selected')[0].classList.remove('selected');
	var buttons = document.getElementsByClassName('js-mode-button');

	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].getAttribute('data-mode') === mode) {
			buttons[i].classList.add('selected');
		}
	}

}


