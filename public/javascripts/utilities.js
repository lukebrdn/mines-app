function setClickListener(el, fn, context) {
	if (fn) {
		el.onclick = fn.bind(context);
	}
}

function getAdjacentCoords(centroid, max) {
    var offset = 0;
    var maxZone = 12;
    var area = [{'x': centroid.x, 'y': centroid.y}];

    while (area.length < maxZone) {
        area.concat(getMyNeighbors(centroid, offset, max));
    }

    return area;
}

// TODO this solution is bulky... need to figure a js way to approach
function getMyNeighbors(me, delta, max) {
    var zone = []
    var separation = 1 + delta;
    var cardinalSafe = {
        'north': me.y !== max && me.y + separation < max,
        'south': me.y !== 0 && me.y - separation >= 0,
        'east': me.x !== max && me.x + separation < max,
        'west': me.x !== 0 && me.x - separation >= 0
    }

    if (cardinalSafe.west) {
        zone.push(getCoordObj(me.x-separation, me.y))
    }
    if (cardinalSafe.west && cardinalSafe.south) {
        zone.push(getCoordObj(me.x-separation, me.y-separation));
    }
    if (cardinalSafe.south) {
        zone.push(getCoordObj(me.x, me.y-separation));
    }
    if (cardinalSafe.south && cardinalSafe.east) {
        zone.push(getCoordObj(me.x+separation, me.y-separation));
    }
    if (cardinalSafe.east) {
        zone.push(getCoordObj(me.x+separation, me.y));
    }
    if (cardinalSafe.east && cardinalSafe.north) {
        zone.push(getCoordObj(me.x-separation, me.y+separation));
    }
    if (cardinalSafe.north) {
        zone.push(getCoordObj(me.x-separation, me.y+separation));
    }
    return zone
}

function getCoordObj(x, y) {
    return {'x': x, 'y': y}
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
