// Feature detect + local reference
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


var settings;
function start() {
	settings = new Settings();
	new GameManager();
}

document.onready = start();
