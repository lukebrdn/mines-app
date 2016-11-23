function Settings () {
	this.mode = 'default';

}

Settings.prototype.setMode = function (mode) {
	this.mode = mode;
};

Settings.prototype.getMode = function () {
	return this.mode;
};