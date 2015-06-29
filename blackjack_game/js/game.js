// game object
console.log("loaded game");

var game = {
	// properties
	players: [],													// array of player objects. Dealer is [0]
	shoe: new Shoe(),												// object containing array of cards
	numOfDecks: 6,												// how many decks to create
	gameRendered: [],		
	activePlayerIdx: 0,												// this is to keep track which player turn
	blackjackFactor: 2.5,												// blackjack pay factor
	insuranceFactor: 2,												// insurance factor
	gameFactor: 2,													// game factor

	// behaviors

	gameStart: function () {
		this.gamePlayerCreate(1);
		this.gameCashIn();
		this.gameMakeDecks();
		this.shoe.shuffle();
		

	},

	gamePlayerCreate: function ( num ) {										// allow for future expansion by accepting arg.
															// for now, hard coded to 1.
		for (var i = 0; i < ( num + 1 ); i++) {									// for num times, plus one more for the dealer.
			var gamePlayer = new Player();								// create new player object

			this.players.push( gamePlayer );								// push into the player array
		}

	},


	gameMakeDecks: function () {	

		this.shoe.addDeck( this.numOfDecks );									// shoe will create decks and shuffle cards.
		

	},

	gameMsg: function () {
		$(".hands-won").html("Won:<br />" + this.players[1].getPlayerWon());
		$(".hands-lost").html("Lost:<br />" + this.players[1].getPlayerLost());
		$(".pushed").html("Pushed:<br />" + this.players[1].getPlayerTied());

	},

	gameBanner: function (idx) {
		var gameBanners = [
			"Press 'Bet' to increase bet by $5.00. Press 'Deal' when ready for hand.",			// 0
			"Press 'Insurance' if you want to buy Insurance against Dealer Blackjack!",			// 1
			"You won.",											// 2
			"You lost. Press Bet to play next hand.",							// 3
			"Blackjack. Pays 2.5!",										// 4
			"Push."												// 5
		];

		var  bannerColors = [
			"cornflowerblue",										// 0
			"red",												// 1
		];

		$(".banner").html(gameBanners[idx]).css("color", bannerColors[idx]);
	},

	gameBottomBanner: function () {
		var holdPlayerSplit = 0;

		if (this.players[1].hands[0].handHasSplit) {								// if the hand has split

			holdPlayerSplit = this.player[1].getBet(1);							// bet [1] is split bet
		}
		
		$("#bank").html( "Bank:<br>$" + this.players[ 1 ].getPlayerBank() + ".00");				// get bank.
		$("#bet").html("Player Bet:<br>$" +  this.players[1].getBet(0) + ".00");				// get bet. bet index [0] is main bet.
		$("#split").html("Player Split Bet:<br>$" + holdPlayerSplit + ".00");					// bet [1] is split bet.
		$("#insurance").html("Player Insurance Bet:<br>$" + this.players[1].getInsurance(0) + ".00");		// get insurance.


	},

	gameAddHands: function () {

		for (var i = 0; i < this.players.length; i++) {								// for each player
			this.players[ i ].playerAddHand();								// create a hand
		}

		return "hands created";
	},

	gameCheckForOutOfCards: function () {									// check for cards present
		if ( this.shoe.checkForOutOfCards() ) {									// if out of cards
			this.gameMakeDecks();									// make more
		}
	},

	gameRender: function () {

		this.gameRendered = [];
		

		for ( var i = 0; i < this.players.length; i++ ) {
			this.gameRendered.push( this.players[ i ].playerRender( i ) );			
		}

		return this.gameRendered;

	},	

	gameDeal: function () {
		for (var z = 0; z < this.players.length; z++) {
			this.players[z].hands = [];									// kill old hands if any.
		}

		this.gameAddHands();

	/* this is an inside-out loop, it stops at each player, giving them each 1 card starting with the player first
		before dealing a second card to each. There are only 2 cards per hand. Dealer is alway game.playerers[0];*/

		for ( var i = 0; i < 2; i++ ) {										// 2 cards in each hand

			for ( var j = ( this.players.length - 1 ); j >= 0; j-- ) {						// deal to player first, dealer is index 0.

				for ( var k = 0; k < this.players[j].hands.length; k++ ) {				// for each hand the player has

					this.players[ j ].playerHit ( k );							// put new card in hand, pass idx of hand 	
				}
			}
		}

		$("#dlr-hole").css("visibility", "visible");
		$("#dlr-up").css("visibility", "visible");
		$("#ply-up1").css("visibility", "visible");
		$("#ply-up2").css("visibility", "visible");
		this.players[ 0 ].hands[ 0 ].cards[ 1 ].hideFace();							// make sure dealer's 2nd card is hidden.
		this.gameDetermineHandValues();									// determine each hands value
		return;

	},
	gameDetermineHandValues: function () {

		for (var m = 0; m < game.players.length; m++) {							// for each player

			for (var n = 0; n < game.players[ m ].hands.length; n++) {					// and each hand of each player

				game.players[ m ].hands[ n ].determineValue();					// figure the value of the hand
				game.players[ m ].hands[ n ].canHandSplit();						// can hand split
				game.players[ m ].hands[ n ].canHandDoubleDown();					// can hand split
				game.players[ m ].hands[ n ].canHandInsure();					// can hand split
				game.players[ m ].hands[ n ].handHasBlackjack();					// can hand split
				game.players[ m ].hands[ n ].hasThisHandBusted();					// can hand split


			}
			
		}

	},

	gameResult: function () {											// run through rules to check for win.
		var dealerBlackjack = game.players[0].playerHasBlackjack(0);					// see if dealer has blackjack								
		var dealerBust = game.players[0].playerHasBusted(0);						// see if dealer has busted
		var dealerHandValue = game.players[0].playerGetValue(0);						// get hand value									//
		var playerBlackjack = [];										
		var playerBust = [];
		var playerHandValue = [];
		
		for (var i = 1; i < game.players.length; i++) {								// loop through players skipping dealer.

			for (var j = 0; j < game.players[i].hands.length; j++) {					// loop through each player's hand
			
				playerBlackjack.push( game.players[ i ].playerHasBlackjack( j ) );			// find out if blackjack and push into arry
				playerBust.push( game.players[ i ].playerHasBusted( j ) );				// find out if busted and push into array
				playerHandValue.push( game.players[ i ].playerGetValue( j ) );			// get hand value and push into array


				if (playerBust[ j ]) {									// if busted he loses regardless of anything else.								
					this.players[ i ].playerAdjustFunds( j, "lose", 1 ); 				// call with hand idx, action and factor
					this.players[i].playerLost();
					return 3;									// return bust
				} else if (dealerBust) {			
					this.players[ i ].playerAdjustFunds( j, "winMoney", 2 ); 			// call with hand idx, action and factor
					this.players[i].playerWon();
					return 2;									// return win	

				} else if (dealerHandValue == playerHandValue[ j ]) {					// --> push <--
					this.players[ i ].playerAdjustFunds( j, "winMoney", 1 ); 			// return bet to bank.
					this.players[i].playerPush();
					return 5;									// confirm
				
				} else if ( dealerHandValue > playerHandValue[ j ]) {					// player loses.

					if (dealerBlackjack) {								// if player lost to blackjack

					this.players[ i ].playerAdjustFunds( j, "winInsurance", 2 ); 			// call with hand idx, action and factor
					this.players[ i ].playerAdjustFunds( j, "lose", 1 ); 				// call with hand idx, action and factor
					this.players[i].playerLost();
					return (3);									// return lose
						
					} else if (!dealerBlackjack) {							// not blackjack

					this.players[ i ].playerAdjustFunds( j, "lose", 1 ); 				// call with hand idx, action and factor
					this.players[i].playerLost();
					return 3;									// return "lose"
					}	

				} else if (dealerHandValue < playerHandValue[ j ] ){

					if (playerBlackjack[ j ]) {							// blackjack pay out
						this.players[ i ].playerAdjustFunds( j, "winMoney", 2.5 ); 		// call with hand idx, action and factor
						this.players[i].playerWon();
						return 4;								// return blackjack
												
					} else {									// normal win payout
						this.players[ i ].playerAdjustFunds( j, "winMoney", 2 ); 		// call with hand idx, action and factor
						this.players[i].playerWon();
						return 2;								// return win	
					}	
				}
			}
			
		}
	},



	dealerPlay: function () {
		this.players[0].hands[0].cards[1].showFace();

		while (this.players[0].hands[0].totValAceLow < 17) {
			this.players[0].playerHit(0);
			this.gameDetermineHandValues();

		}

	},

	gameCashIn: function () {
		for (var i = 1; i < this.players.length; i++) {								// skipping deal give each player 50K
			this.players[ i ].playerAdjustFunds( i, "cashIn", 1 );
		}

	},

	gamePlayerBet: function () {
		this.players[1].playerAdjustFunds(0, "bet", 1) ;
	},

};