// hand object

var Hand = function() {
	//properties
	this.cards = [];												// array of cards in the hand.
	this.totValAceHigh = 0;										// total value of hand when Ace is treated as 13.
	this.totValAceLow = 0;											// total value of hand when Ace is treated as 1.
	this.handHasAce = 0;											// count Aces in hand
	this.handCanSplit = false;										// boolean indicates splitable hand
	this.handCanDoubleDown = false;									// boolean indicates if player can double down
	this.handDoubledDown = false;
	this.handCanInsure = false;										// if dealer's up card is Ace
	this.handInsured = true;
	this.handDoesHaveBlackjack = false;									// two cars equaling 21 and one must be an Ace.
	this.handHasSplit = false;										// if hand has split, do not pay out blackjack
	this.handBusted = false;										// is value over 21?


	// behaviors
	// setter functions
	this.handHit = function (card) {									// add card to hand
		this.cards.push(card);										// add card to hand
		return card;
	};

	this.handSplit = function () {										
		return this.cards.pop();										// remove card from hand 	
	};

	this.determineValue = function() {
		this.totValAceHigh = 0;									// at the beginning reset all of the 
		this.totValAceLow = 0;										// objects accumulators when
		this.handHasAce = 0;										// this function is called

		for (var i = 0; i < this.cards.length; i++) {							// for each card in the hand

			if (this.cards[i].value  === 11) {							// if we have an ace

				if (this.handHasAce === 0 ) {							// if this is our first Ace

					this.totValAceHigh += 11;						// add 11 to  this.totValAceHigh
					this.totValAceLow += 1;						// add 1 to this.totValAceLow and
					this.handHasAce++;							// increase ace counter by 1

				} else {									// all Aces after first one are counted as 1

					this.totValAceHigh += 1;						// add card value this.totValAceHigh
					this.totValAceLow += 1;						// add 1 to this.totValAceLow and
					this.handHasAce++;							// increase ace counter by 1
				}

			} else if (this.cards[i].value !== 11) {
				this.totValAceLow += this.cards[i].value;					// add card value to this.totValAceLow
				this.totValAceHigh += this.cards[i].value;					// add card value this.totValAceHigh
			}

		}
		return ([this.totValAceLow, this.totValAceHigh, this.handHasAce]);				// return value of hand
	};


	this.canHandSplit = function () {									// determine if first 2 cards dealt are the same

		if (this.cards[0].face === this.cards[1].face) {							// if they match
			this.handCanSplit = true;								// hand can split
		} else {											// else
			this.handCanSplit = false;								// hand cannot split
		}

		return this.handCanSplit;									// return answer
	};

	this.canHandDoubleDown = function () {								// can this hand double down
		

		switch  (this.totValAceHigh) {									// what is numeric value of first hand
			case 9: 											// if 9
				// fallthrough
			case 10:   										// or 10					
				// fallthrough
			case 11: 										// or 11
				this.handCanDoubleDown = true;						// hand can double down
				break;										// return answer. first true answer is valid result
			default: 
				this.handCanDoubleDown = false;						// else hand cannot double down			
		}
		return this.handCanDoubleDown;								// return answer
	};


	this.canHandInsure = function () {									// for dealer only

		if (this.cards[1].face === "A") {								// if the dealer's up card is an Ace
			this.handCanInsure = true;								// player can insure
		} else {
			this.handCanInsure = false;								// player cannot
		}

		return this.handCanInsure;									// return answer
	};

	this.handHasBlackjack= function () {									//  determine if blackjack

		if ((this.cards.length === 2)     && 								// hand is only 2 cards							
		    (this.totValAceHigh === 21) && 								// the value is 21 (can only happen with Ace + 10)
		    (!this.handHasSplit)) {									// hand hasn't split. 21 on split doesn't pay blackjack																
			this.handDoesHaveBlackjack = true;							// has blackjack					
		} else {
			this.handDoesHaveBlackjack = false;							// does not have blackjack			
		}

		return this.handDoesHaveBlackjack;								// return answer
	};

	this.handHasBusted = function () {									// determine if busted
		if (this.totValAceLow > 21) {									// if even with ace counted as one
			this.handHasBusted = true;								// hand busted
			this.totValAceLow = 0;									// busted hand has no value
			this.totValAceHigh = 0;								// busted hand has no value
		} else {
			this.handHasBusted = false;								// hasn't busted
		}
		return this.handHasBusted;									// return answer
	};

	this.setDoubleDown = function () {
		this.handDoubledDown = true;
		return this.handDoubledDown;
	};

	this.setInsured = function () {
		this.handInsured = true;
		return this.handInsured;
	};

	this.showFace = function (idx) {
		return this.cards[idx].showFace();
	};

	this.hideFace = function (idx) {
		return this.cards[idx].hideFace();
	};

	// getter functions
	this.renderHand = function () {
		var renderedHand = "";									// clear current render

		for (var i = 0; i < this.cards.length; i++) {							// for each card in hand
			renderedHand = renderedHand + this.cards[i].render();				// get it's render and append to renderedHand
		}
		return (renderedHand);										// return renedered hand
	};

	this.getValue = function () {
		return ([this.totValAceLow, this.totValAceHigh, this.handHasAce]);				// return value of hand
	};

	this.getHandSplit = function () {
		return this.handHasSplit;
	};

	this.gethandBusted = function () {
		return this.handBusted;
	};
	this.getHandDoesHaveBlackjack = function () {
		return this.handDoesHaveBlackjack;
	};

	this.getHandDoubledDown = function () {
		return this.handDoubledDown;
	};

};