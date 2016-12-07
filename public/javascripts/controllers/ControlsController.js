function ControlsController () {
	this.setDefaults();
	this.listen();	
}

ControlsController.prototype.setDefaults = function () {
	this.mode = 'default';
};

ControlsController.prototype.isFlagMode = function () {
	return this.get('mode') === 'flag';
};

ControlsController.prototype.listen = function () {

	var modeButtons = document.getElementsByClassName('js-mode-button');
	
	for (var i = 0; i < modeButtons.length; i++) {
		setClickListener(modeButtons[i], this.setMode, this);
	}	

	document.onkeydown = function (e) {
	
		if (e.keyCode === 91) {
			this.set('mode', 'flag');
			this.toggleModeUI();
		}
	}.bind(this);

	document.onkeyup = function (e) {
		if (e.keyCode === 91) {
			this.set('mode', 'default');
			this.toggleModeUI();
		}
	}.bind(this);

};

ControlsController.prototype.set = function (property, value) {
	this[property] = value;
	return this.get(property);
};

ControlsController.prototype.get = function (property) {
	return this[property];
};

ControlsController.prototype.setMode = function (e) {
	var mode = e.currentTarget.getAttribute('data-mode');
	if (mode !== this.get('mode')) {
		this.set('mode', mode);
		this.toggleModeUI();
	}
}

ControlsController.prototype.toggleModeUI = function () {
	var mode = this.get('mode');
	var buttons = document.getElementsByClassName('js-mode-button');

	document.getElementsByClassName('selected')[0].classList.remove('selected');
	
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].getAttribute('data-mode') === mode) {
			buttons[i].classList.add('selected');
		}
	}

}
