function setClickListener(el, fn, context) {
	if (fn) {
		el.onclick = fn.bind(context);	
	}
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}
