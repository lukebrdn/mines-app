function User() {
	// TODO possibly move default configs to a file so easily visible?
	this.streak = 0;
	this.lossStreak;
	this.best = 0;
	this.level = 1;
	this.rounds = 0;
	// TODO if storage is not active then set flag and not repeat checks
	if (!storage) {
		this.skipStorage = true;
	};

	this.setupUserStats();
};

User.prototype.get = function(property) {
	return this[property];
};

User.prototype.set = function(property, value) {
	this[property] = value;
	this.setStorageStat(property, value);
	return this.get(property);
}

// Create User stats
User.prototype.setupUserStats = function() {
	var stats = this.getStorageStats();
	if (stats) {
		console.log("Current Stats: ", stats);
		for (name in stats) {
			this.set(name, stats[name]);
		}
	} else {
		this.setDefaultStorageStats()
	};
};

// TODO not sure if it's better for stat to be an object in user
// so for now this will provide a stat object
User.prototype.getUsersStats = function() {
	return {
		'streak': this.get('streak'),
		'lossStreak': this.get('lossStreak'),
		'best': this.get('best'),
		'level': this.get('level'),
		'rounds': this.get('rounds')
	}
};

User.prototype.getStorageStats = function() {
	var stats = storage.getItem('stats');
	return JSON.parse(stats);
};


User.prototype.setStorageStat = function(stat, value) {
	// Get current stats, make requested change and update
	var stats = this.getStorageStats();
	if (stats) {
		console.log("Old Stats: ", stats)
		stats[stat] = value;
		console.log("New Stats: ", stats)
		this.setStorageStats(stats)
	} else {
		console.log("ERROR! Somethings not right with stats")
	}
};

// Setup default storage stats for a user
User.prototype.setDefaultStorageStats = function() {
	console.log("Setting default stats");
	this.setStorageStats({
		'streak': 0,
		'lossStreak': 0,
		'best': 0,
		'level': 1,
		'rounds': 0
	});
};

// Stringify and apply
User.prototype.setStorageStats = function(newStats) {
	storage.setItem('stats', JSON.stringify(newStats));
};

User.prototype.winning = function() {
	var currentStats = this.getUsersStats();
	this.set('lossStreak', 0);
	var newStreak = this.increment('streak', 1);
	var newLevel = this.increment('level', 1);
	if (newStreak > currentStats.best) {
		best = this.set('best', newStreak);
	}
};

User.prototype.decrement = function(property, decrementAmount, minimum) {
	var value = this.get(property) - decrementAmount;
	if (value > minimum) {
		console.log("Reducing Property: " + property + " to " + value);
		this.set(property, value);
	};
};

User.prototype.increment = function(property, incrementAmout) {
	var value = this.get(property) + incrementAmout;
	return this.set(property, value);
};
