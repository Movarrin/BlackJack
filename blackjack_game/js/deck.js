// deck object

var Deck = function () {
	//properties
	this.cards = [];													// array of card objects

	// behaviors
	this.makeDeck = function () {
		var cardSuits	= ["spades", "'clubs", "hearts", "diamonds"];						// literal array of suits
		var cardValues = [2,    3,    4,   5,    6,    7,    8,    9,    10,   10, 10,  10,  11];				// literal array of values
		var cardFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];				// literal array of faces

		for (var i = 0; i < cardSuits.length; i++) {								// for each suit
			
			for (var j = 0; j < cardValues.length; j++) {							// and each value
															// create a new playing card
				var playingCard = new Card (cardSuits [i], cardValues [j], cardFaces [j] );		// use the same index for face and value. they should be associated.	
				this.cards.push(playingCard);								// push new card into deck
			}	
		}

		console.log("deck created");										
		return this.cards;											// return deck
	};

};