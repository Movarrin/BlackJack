// deck object

var Deck = function () {

	this.cards = [];

	this.makeDeck = function () {
 		// calls Card constructor after assigning face, value and suit
		// loops to 13 4 times, once for each suit
		// pushes new card object into this.cards[]

		var cardSuits	= ["spades", "'clubs", "hearts", "diamonds"];
		var cardValues = [2,    3,    4,   5,    6,    7,    8,    9,    10,   10, 10,  10,  11];
		var cardFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
		for (var i = 0; i < cardSuits.length; i++) {
			
			for (var j = 0; j < cardValues.length; j++) {

				var playingCard = new Card (cardSuits [i], cardValues [j], cardFaces [j] );		//  use the same index for face and value. they should be associated.	
				this.playingCard.push(playingCard);							// push new card into deck
			}
		}

		console.log("deck created");										// return deck
		return this.cards;
	};

};