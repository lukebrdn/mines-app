function ModalManager() {};



// show modal
ModalManager.prototype.show = function (data) {
	var modal = document.getElementsByClassName('js-modal')[0];
	modal.innerHTML = this.template(data);
	this.listen();
};

ModalManager.prototype.listen = function () {
	var btnElement = document.getElementsByClassName('js-restart')[0];

	setClickListener(btnElement, this.onRestartClick, this);
};

ModalManager.prototype.onRestartClick = function () {
	events.trigger('restart');
	this.hide();
};

// hide modal
ModalManager.prototype.hide = function (data) {
	var modal = document.getElementsByClassName('js-modal')[0];
	modal.innerHTML = '';
};

// modal template

ModalManager.prototype.template = function (data) {

	var html = '<div class="overlay"></div>' +
				'<div class="modal">' +
					'<div class="message ' + data.state + '">' +
						data.message +
					'</div>' +
					'<button class="button js-restart">' + data.buttonLabel + '</button>' +
				'</div>';
	return html;
};
// 