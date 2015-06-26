// player object

var Player = function  () {		
	// properties
	this.bank = 0;													// one bank per player
	this.hands = [];													// can be more than one hand per player
	this.bet = [0];													// one bet per hand, 
	this.doubleDown = [0];												// one double down per hand
	this.insurance = [0];												// one insurance per hand												


	//behaviors	
	this.playerAddHand = function () {
		var newHand = new Hand();										// create new hand
		this.hands.push(newHand);										// push it into hands array
	}
	this.playerHit = function (idx, card) {										// add card to hand
		this.hands[idx].handHit(card);										// call hand.handHit
		return;
	};

	this.playerGetValue = function (idx) {
		return this.hand.getValue();										// return hand value for given hand
	};

	this.playerHasBlackjack = function (idx) {
		return this.hands[idx].handHasBlackjack();								// call hand.hasBlackjack and return result
	};

	this.playerCanDoubleDown = function (idx) {
		return this.hands[idx].canHandDoubleDown;								// call canHandDoubleDown and return result
	};

	this.playerCanInsure = function (idx) {
		return this.hands[idx].canHandInsure();								// call canHandInsure and return result
	};

	this.playerCanSplit = function (idx) {
		return this.hands[idx].canHandSplit();									// call canHandSplit and return result
	};	

	this.playerHasBusted = function (idx) {
			return this.hands[idx].handHasBusted();							// call handHasBusted and return result
	};
	
	this.playerRender = function (idx) {
		return this.handRender(idx);										// return current state of hand
	};

	this.getBet = function (idx) {
		return this.bet;												// return bet amount
	};

	this.getDoubleDown = function (idx) {
		return this.doubleDown;										// return double down amount
	};

	this.getInsurance = function (idx) {
		return this.insurance;											// return insurance
	};
	
	this.playerAdjustFunds = function (idx, action, amt) {
		switch (action) {
			case "cashIn": 											//fallthrough
			case "winMoney": 										// do for either case.
				this.bank[idx] += amt;									// add money to bank					
				return true;										// confirm

			case "insurance": 

				if (amt > this.bank[idx]) {								// if amount is greater than bank
					return false;									// return false;
				}


				this.bank[idx] -= amt; 									// decrease bank by amount
				this.insurance[idx] = amt;								// insurance = amt				
				return true;										// confirm

			case "doubleDown":
				
				if (amt > this.bank[idx]) {								// if amount is greater than bank
					return false;									// return false;
				}

				this.bank[idx] -= amt;									// subtrace from bank
				this.doubleDown[idx] = amt;								// set doubleDown
				return true;										// confirm

			case "bet":

				if (amt > this.bank[idx]) {								// if amount is greater than bank
					return false;									// return false
				}

				this.bank[idx] -= amt;									// subtract from bank
				this.bet[idx] = amt;									// set bet
				return true;										// confirm

			case "cashOut": 										// precede by this.getBank
				bank = 0;										// set bank to zero
				return true;										// confirm
		}
	};

	this.playerHandSplit = function (idx) {										// function to split into 2 new hands
		var holdCard = this.hands[idx].handSplit();								// get one card from the hand
		var hand = new Hand();										// create new Hand object;
		hand.handHit(holdCard);										// put card in hand
		this.playerAddHand();											// create new hand
		
		for (var i = 0; i < this.hands.length; i++) {								// for each player hand
			this.hands[i].push(game.shoe.shoeDeal());							// get a card from the shoe and put in each hand.
		};

	};
	
};