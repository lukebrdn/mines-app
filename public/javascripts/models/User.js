function User () {
	// TODO possibly move default configs to a file so easily visible?
	this.streak = 0;
	this.best = 0;
	this.level = 1;

	this.setupUserStats();
};

User.prototype.get = function (property) {
	return this[property];
};

User.prototype.set = function (property, value) {
	this[property] = value;
	return this.get(property);
}

User.prototype.decrement = function(property, decrementAmount, minimum) {
	var value = this.get(property) - decrementAmount;
	if (value > minimum) {
		console.log("Reducing Property: "+property + " to " +value);
		this.set(property, value);
	};
};

User.prototype.incrementProps = function(properties, incrementAmout) {
	for (var i = properties.length - 1; i >= 0; i--) {
		this.increment(properties[i], incrementAmout);
	};
};

User.prototype.increment = function (property, incrementAmout) {

	var value = this.get(property) + incrementAmout;
	this.set(property, value)

	// This could be removed, but is it better?
	this.updateBest();
	return this.get(property);

};

// TODO create update stat to allow multi stat handling
User.prototype.updateBest = function () {

	var streak = this.get('streak');
	var best = this.get('best');

	if (streak > best && storage) {
		best = this.set('best', streak);
		storage.setItem('stats', JSON.stringify({best: best}));
	}

};

User.prototype.getStoredStats = function () {
	if (storage) {
		var stats = storage.getItem('stats');
		return JSON.parse(stats);
	}
};

User.prototype.setupUserStats = function() {
	// Used to build user stats
	var stats = this.getStoredStats();
	console.log("Current Stats: ", stats);
		if (stats && getSize(stats) !== 0) {
			var streakKeys = ['longestStreak','streak'];
			for (name in stats) {
				// continues support for legacy 12/6/2016
				if (streakKeys.includes(name)) {
					// keey old name or replace it?
					this.set(name, stats[name]);
				}
				else {
					this.set(name, stats[name]);
				}
			}
		}
		else
		{

	}
};

User.prototype.setStoredStat = function(stat, value) {
	// Get current stats, make requested change and update
	var stats = getStoredStats();
	if (stats) {

	}
};

// Setup default storage stats for a user
User.prototype.setDefaultStoredStats = function() {
	console.log("Setting default stats");
	this.setStats({'streak': 0, 'best': 0, 'level': 1});
};

// Stringify and apply
// TODO this could overwrite may need to add checks
User.prototype.setStats = function(newStats) {
	if (storage) {
		storage.setItem('stats', JSON.stringify(newStats));
	}
};
