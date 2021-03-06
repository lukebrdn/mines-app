function User () {
	this.best = 0;
	this.level = 5;

	this.getStoredStats();
}

User.prototype.get = function (property) {
	return this[property];
}

User.prototype.set = function (property, value) {
	this[property] = value;	
	return this.get(property);
}

User.prototype.increment = function (property, incrementAmout) {
	var value = this.get(property) + incrementAmout;
	this.set(property, value)

	this.updateBest();

	return this.get(property);
};

User.prototype.updateBest = function () {
	var level = this.get('level');
	var best = this.get('best');

	if (level > best && storage) {
		best = this.set('best', level);
		storage.setItem('stats', JSON.stringify({best: best}));	
	}

};

User.prototype.getStoredStats = function () {
	if (storage) {
		var stats = storage.getItem('stats');
		stats = JSON.parse(stats);

		// legacy 12/6/2016
		if (stats && stats.longestStreak) {
			this.set('best', stats.longestStreak);
		}

		if (stats && stats.best) {
			this.set('best', stats.best);
		}	
	}	
};
