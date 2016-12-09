function setClickListener(el, fn, context) {
	if (fn) {
		el.onclick = fn.bind(context);
	}
}

function getCellIndex(cell, height, width) {
    return cell.x + ((height - cell.y - 1) * width);
}

function getAreaIndexes(centerIndex, width, height) {
    var indexes = [centerIndex]
    var offCenter = centerIndex % width

    var side = [-1, 1]
    if (offCenter === 0) { side = [1,2]; }
    if (offCenter === (width - 1)) { side = [-1,-2]; }
    var vert = [-width, width]
    if (centerIndex < width) { vert = [width, width*2]; }
    if (((width * height) - offCenter) < width) { vert = [-width,-width*2]; }

    for (var i = 0; i < side.length; i++) {
       indexes.push(centerIndex + side[i]);
       indexes.push(centerIndex + side[i] + vert[i]);
       indexes.push(centerIndex + vert[i]);
       indexes.push(centerIndex + side[i] + vert[i+1]);
       indexes.push(centerIndex + vert[i+1]);
    };

    return indexes
}
// function boundryTester(loc, )

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

function getSize(obj) {
    return Object.keys(obj).length;
}
