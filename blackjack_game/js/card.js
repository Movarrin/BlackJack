// card object

var Card = function  (suit, value, face) {
	//properties
	this.value = value;											// the value of the card 1 to 13
	this.state = true;											// true is face up, false is face down
	this.face = face;											// the face of the card
	this.back = "X";											// link to back of the card?
	this.suit = suit;												// suit of the card may not be needed. can't hurt

	// behaviors
	// setter functions
	this.showFace = function () {
		this.state = true;	
		return this.state;											// whatever it cuurrently is, make it the opposite.
	};

	this.hideFace = function () {
		this.state = false;
		return this.state;
	};

	// getter functions
	this.getState = function () {
		return this.state;
	};

	this.getValue = function () {
		return	this.value;										// return the value of the card.
	};

	this.render = function() {
		if (this.state) {
			return this.face;									// return the face of the card
		} else {
			return this.back;									// return the back of the card
		}

	};

};