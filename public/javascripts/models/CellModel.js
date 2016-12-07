function CellModel (x, y) {
	this.x = x;
	this.y = y;
	this.minesNearby = 0;
	this.isMine = false;
	this.isOpen = false;
	this.isFlag = false;
}
