// player object
console.log("player loaded");

var Player = function  () {		
	// properties
	this.bank = 0;													// one bank per player
	this.hands = [];													// can be more than one hand per player
	this.bet = [0];													// one bet per hand, 
	this.stand = [false];
	this.doubleDown = [0];												// one double down per hand
	this.insurance = [0];												// one insurance per hand
	this.playerHandsWon = 0;												// hands won by players
	this.playerHandsLost = 0;												// hands won by players
	this.playerHandsTied = 0;												// hands tied with dealer												


	//behaviors	

	//setter functions
	this.playerAddHand = function () {
		var newHand = new Hand();										// create new hand
		this.hands.push(newHand);										// push it into hands array
		return;
	};

	this.playerWon = function () {
		this.playerHandsWon++;											// increment hands won
		return this.playerHandsWon;
	};

	this.playerLost = function () {
		this.playerHandsLost++;											// increment hands lost
		return this.playerHandsLost;
	};

	this.playerPush = function () {
		this.playerHandsTied++;											// increment hands pushed
		return this.playerHandsTied;
	};

	this.playerHit = function (idx) {										// add card to hand
		var newCard = game.shoe.shoeDeal();
		this.hands[idx].handHit(newCard);									// call hand.handHit
		return;
	};

	this.playerAdjustFunds = function (idx, action, factor) {
		switch (action) {
			case "cashIn": 											//fallthrough
			case "winMoney": 										// do for either case.
				this.bank[idx] += (bet * factor);							// add money to bank	
				this.doubleDown[idx] = 0;								// clear doubleDown
				this.bet[idx] = 0;									// clear bet			
				return true;										// confirm

			case "insurance": 

				if (amt > this.bank) {									// if amount is greater than bank
					return false;									// return false;
				}


				this.bank -= (bet * factor);								// decrease bank by amount
				this.insurance[idx] = (bet * factor);							// insurance = amt				
				return true;										// confirm

			case "doubleDown":
				
				if (amt > this.bank) {									// if amount is greater than bank
					return false;									// return false;
				}

				this.bank[idx] -= (bet * factor);								// subtrace from bank
				this.doubleDown[idx] = bet + (bet * factor);						// set doubleDown double the bet
				return true;										// confirm

			case "bet":

				if (amt > this.bank) {									// if amount is greater than bank
					return false;									// return false
				}

				this.bank -= (bet * factor);								// subtract from bank
				this.bet[idx] =(bet * factor);								// set bet
				return true;										// confirm

			case "lose":
				this.bet[idx] = 0;									// lose bet
				return true;										// confirm

			case "winInsurance":
				this.bank += (this.insurance[idx] * factor);						// pay off insurance
				this.insurance[idx]  = 0;								// clear insurance
				return true;										// confirm

			case "loseInsurance":
				this.insurance[idx] = 0;								// lose insurance
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
		}
		return;
	};

	// getter functions
	this.playerGetValue = function (idx) {
		return this.hands[idx].getValue();										// return hand value for given hand
	};

	this.playerHasBlackjack = function (idx) {
		return this.hands[idx].handHasBlackjack();								// call hand.hasBlackjack and return result
	};

	this.playerCanDoubleDown = function (idx) {
		return this.hands[idx].canHandDoubleDown();								// call canHandDoubleDown and return result
	};

	this.playerCanInsure = function (idx) {
		return this.hands[idx].canHandInsure();								// call canHandInsure and return result
	};

	this.playerCanSplit = function (idx) {
		return this.hands[idx].canHandSplit();									// call canHandSplit and return result
	};	

	this.playerHasBusted = function (idx) {
		return (this.hands[idx].handHasBusted());								// call handHasBusted and return result
	};

	this.playerRender = function (idx) {
		var playRender = [];

		for (var i = 0; i < this.hands.length; i++) {
			
		playRender.push(this.hands[i].renderHand());						// return current state of hand
		
		}

		return playRender;
	};

	this.getBet = function (idx) {
		return this.bet[idx];											// return bet amount
	};

	this.getDoubleDown = function (idx) {
		return this.doubleDown[idx];										// return double down amount
	};

	this.getInsurance = function (idx) {
		return this.insurance[idx];										// return insurance
	};
	

	
};