// card object

var Card = function  (suit, value, face) {
	//properties
	this.value = value;											// the value of the card 1 to 13
	this.state = true;										// true is face up, false is face down
	this.face = face;											// the face of the card
	this.back = "X";											// link to back of the card?
	this.suit = suit;											// suit of the card may not be needed. can't hurt

	// behaviors
	this.showFace = function () {
		this.state = !this.state;	
		return state;									// whatever it cuurrently is, make it the opposite.
	};

	this.render = function() {
		if (this.state) {
			return this.face;								// return the face of the card
		} else {
			return this.back;								// return the back of the card
		}

	};

	this.getValue = function () {
		return	this.value;									// return the value of the card.
	};


};