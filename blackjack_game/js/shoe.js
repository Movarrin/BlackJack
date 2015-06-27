// shoe object

var Shoe = function() {
	// properties
	this.decks = [];	
	this.numOfDecks = 1;												// controller for how many decks. allows extensibility

	// behaviors
	this.addDeck = function (numofDecks) {
		this.numOfDecks = numofDecks;									//  set number of decks to make

		// create deck and add to array
		for (var i = 0; i < this.numOfDecks; i++) {								//  one per numOfDecks
			
			var shoeDeck = new Deck();									// create a new Deck object
			shoeDeck.makeDeck();										// create the cards that make up the deck

			for (var j = 0; j < shoeDeck.cards.length; j++) {						// for each card in the deck

				this.decks.push(shoeDeck.cards[j]);							// push each card into the this.decks array
			}
		}
		return this.decks;											// return
	};


	this.checkForOutOfCards = function() {									
		if (this.decks.length < 1) {										// if length of decks is 0
			return true;											// out of cards
		} else {
			return false;											// still have at least one
		}

	};

	this.shoeDeal = function () {
		return this.decks.pop();
	};

	this.shuffle = function() {
		shuffle(this.decks);											// shuffle function. Not my code.
															// this operates on the cards in place. no new variable needed.
		// USE THIS TO SHUFFLE YOUR NUMBERS
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/array/shuffle [v1.0]
		function shuffle(o){ //v1.0
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
		} 

	};
};