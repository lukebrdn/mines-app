
// storage feature detect + local reference
var storage;
var fail;
var uid;
try {
	uid = new Date;
	(storage = window.localStorage).setItem(uid, uid);
	fail = storage.getItem(uid) != uid;
	storage.removeItem(uid);
	fail && (storage = false);
} catch (exception) {}

// other globals
var events;
var controls;

// start application
function initialize () {
	new GameController();
}

document.onready = initialize();
