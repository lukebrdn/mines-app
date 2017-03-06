function ModalController () {};



// show modal
ModalController.prototype.show = function (data) {
	var that = this;
	var modal = document.getElementsByClassName('js-modal-container')[0];
	modal.innerHTML = this.template(data);
	this.listen();
	setTimeout(function() {
		that.animate();
	}, 100);
	
};

ModalController.prototype.listen = function () {
	var btnElement = document.getElementsByClassName('js-restart')[0];

	setClickListener(btnElement, this.onRestartClick, this);
};

ModalController.prototype.onRestartClick = function () {
	events.trigger('restart');
	this.hide();
};

// hide modal
ModalController.prototype.hide = function (data) {
	var modal = document.getElementsByClassName('js-modal-container')[0];
	modal.innerHTML = '';
};

ModalController.prototype.animate = function () {
	var overlay = document.getElementsByClassName('overlay')[0];
	var modal = document.getElementsByClassName('js-modal')[0];
	overlay.classList.add('animate');
	modal.classList.add('animate');
};

// modal template

ModalController.prototype.template = function (data) {

	var html = '<div class="overlay"></div>' +
				'<div class="modal js-modal">' +
					'<div class="message ' + data.state + '">' +
						data.message +
					'</div>' +
					'<button class="button js-restart">' + data.buttonLabel + '</button>' +
				'</div>';
	return html;
};
// 