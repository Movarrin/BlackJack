// game object

var Game = {
	// properties
	players: [],													// array of player objects. Dealer is [0]
	shoe: {},													// object containing array of cards
	numOfDecks: 1,		
	activePlayerIdx: 0,												// this is to keep track which player turn
	blackjackFactor: 2.5,												// blackjack pay factor
	insuranceFactor: 2,												// insurance factor
	gameFactor: 2,													// game factor

	// behaviors

	gameStart: function () {
		this.gamePlayerCreate(1);
		this.gameMakeDecks();
		this.gameDeal();
		this.gameRender();

	},

	gamePlayerCreate: function (num) {										// allow for future expansion by accepting arg.
															// for now, hard coded to 1.
		for (var i = 0; i < (num + 1); i++) {									// for num times, plus one more for the dealer.
			var gamePlayer = new Player();								// create new player object
			gamePlayer.playerAddHand();									// create a new hand object for player			

			this.players.push(gamePlayer);									// push into the player array
		}

	},

	gameMakeDecks: function () {										
		this.shoe.selectNumOfDecks(numOfDecks);								// tell shoe how many decks to make

		for (var i = 0; i < num; i++) {
			this.shoe.addDeck();										// shoe will create decks and shuffle cards.
		}

	},

	gameRender: function () {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].playerRender();
		}

	},	

	/* this is an inside-out loop, it stops at each player, giving them each 1 card starting with the player first
		before dealing a second card to each. There are only 2 cards per hand. Dealer is alway game.playerers[0];*/
	gameDeal: function () {

		for (var i = 0; i < 2; i++) {										// 2 cards in each hand

			for (var j = this.players.length; j >= 0; j--) {							// deal to player first, dealer is index 0.

				for (var k =0; k < this.players[j].hands; i++) {						// for each hand the player has

					this.players[j].playerHit (k, dealCard);						// put new card in hand, pass idx of hand 	
				}
			}
		}

		this.players[0].hands[0].cards[1].showFace();								// make sure dealer's 2nd card is hidden.

	},

	gameResult: function () {											// run through rules to check for win.
		var dealerBlackjack = game.players[0].playerHasBlackjack(0);					// see if dealer has blackjack								
		var dealerBust = game.players[0].player.playerHasBusted(0);						// see if dealer has busted
		var dealerHandValue = game.players[0].player.playerGetValue(0);					// get hand value									//
		var playerBlackjack = [];										
		var playerBust = [];
		var playerHandValue = [];
		
		for (var i = 1; i < game.players.length; i++) {								// loop through players skipping dealer.

			for (var j = 0; j < game.players[i].hands.length; j++) {					// loop through each player's hand
			
			playerBlackjack.push(game.players[i].hands[j].playerHasBlackjack(J));				// find out if blackjack and push into arry
			playerBlackjack.push(game.players[i].hands[j].playerHasBusted(J));				// find out if busted and push into array
			playerBlackjack.push(game.players[i].hands[j].playerGetValue(J));				// get hand value and push into array


			I left off here. Need to clear insurance and double down on win or loss. 
			currently missing processing.



			if (playerBust) {										// if busted he loses regardless of anything else.								
				this.players[i].playerAdjustFunds(j, "lose", 1); 						// call with hand idx, action and factor
				return ("bust");										// return bust
			} else if (game.dealerHandValue == game.playerHandValue[l]) {				// --> push <--
				this.players[i].playerAdjustFunds(j, "winMoney", 1); 					// return bet to bank.
				return "winMoney";									// confirm
		
			} else if (game.dealerHandValue > game.playerHandValue[l]){				// player loses.
				this.players[i].playerAdjustFunds(j, "lose", 1); 						// call with hand idx, action and factor
				return ("lose");										// return lose

			} else if (game.dealerHandValue < game.playerHandValue[l]){

				if (game.playerBlackjack[l]) {
					game.gameHandBlackjack();	//write this function						//
				}else {
					game.gameHandWins();	// write this function
				}
			}
		
		}
	},

	gamePlayerTurns: function () {

	},

	gameDealerTurns: function () {

	},

	gameCashIn: function () {

	},

	gameCashOut: function () {

	},

	gamePlayerAction: function () {

	},

	gameAdjustMoney: function () {

	}



};