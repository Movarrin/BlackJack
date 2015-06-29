window.onload = function () {
	console.log("loaded window");

		startUp();

	

	$(".btn-img").css("opacity", ".25");
	$("#bet-btn").css("opacity", "1");

	$('#bet-btn').click( actOnBet );
	};
	
	var actOnDeal = function(clicked) {
		console.log("deal clicked");
		game.gameDeal();												// deal cards.
		bottomBanner();
		game.gameCheckForOutOfCards();
		$("#bet-btn").unbind();											// turn off bet listener.
		$("#bet-btn").css("opacity", ".25");										// gray out button
		$("#deal-btn").unbind();											// turn off deal listener.
		$("#deal-btn").css("opacity", ".25");										// gray out button
		$("#hit-btn").css("opacity", "1");										// ungray on hit button
		$("#stand-btn").css("opacity", "1");										// ungray on stand button
		$("#hit-btn").unbind();												// prevent multiple listeners
		caller(fireHitListener);												// make listener
		$("#stand-btn").unbind();											// prevent multiple listeners
		caller(fireStandListener);											// make listener

		for (var i = 0; i < game.players[1].hands.length; i++) {
			if (game.players[1].playerCanInsure(i)) {
				caller(fireInsureListener);	
			}

			if (game.players[1].playerCanSplit(i)) {
				caller(fireSplitListener);	
			}

			if (game.players[1].playerCanDoubleDown(i)) {
				caller(fireDoubleListener);	
			}

		}

		renderGame();


		return;

	};

	function caller(f) {
   	 // Call the given function
    		f();
	}

	var bottomBanner = function () {game.gameBottomBanner();};							// create bottom banner

	var renderGame = function () {
		var gameCards = game.gameRender();
		var imgNames = ["dlr-", "ply-"];
		var handName= "";
		var imgName = "";
		var handsToEmpty = 0;
		handsToEmpty = (game.players.length + (game.players[1].hands.length - 1));

		for (var z = 0; z < handsToEmpty; z++) {
			handName = ".hand" + z;
			$(handName).empty();

		}


		for (var i = 0; i < gameCards.length; i++ ) {									// players

			for (var k = 0; k < gameCards[i].length; k++) {							// hands of player

				for (var m = 0; m < gameCards[i][k].length; m++) {						// cards in hand
					
				var cardDiv = $("<div>");									// create <div>
				cardDiv.attr("class", "cards hold-card");							// <div class="cards hold-card">
				cardDiv.attr("id", "dealer-holecard");								// + <div id="dealer-holecard">

				imgName = (imgNames[i] + m);								// dlr- +num or ply- +num

				var cardImg = $("<img>");									// <img>
				cardImg.attr("id", imgName);									// <img id="dlr-0"> for example.
				cardImg.attr("class", "cardback");								// + <img class="cardback">

				var showMeSrc = gameCards[i][k][m];								// image file name

				cardImg.attr("src", showMeSrc);								// <img src="big link"/>

				cardDiv.append(cardImg);									// append img to div
				handName = (".hand" + i);									// select hand name

				var holdHandDiv = $(handName);
				holdHandDiv.css("visibility", "visible");
				holdHandDiv.append(cardDiv);										// append to that hand Div

				}

			}


		}

	};

	var actOnBet = function(clicked) {
		console.log("bet clicked");
		game.gamePlayerBet();
		bottomBanner();
		$("#deal-btn").css("opacity", "1");
		$("#deal-btn").unbind();											// prevent multiple listeners
		caller(fireDealListener);											// make listener

		return;
		
	};


	var actOnHit = function () {
		$("#insure-btn").unbind().attr("opacity", ".25");
		$("#double-btn").unbind().attr("opacity", ".25");
		$("#split-btn").unbind().attr("opacity", ".25");

		game.players[1].playerHit(0);
		renderGame();
		game.gameCheckForOutOfCards();
	};
	var actOnStand = function () {
		$("#hit-btn").unbind().attr("opacity", ".25");
		$("#insure-btn").unbind().attr("opacity", ".25");
		$("#double-btn").unbind().attr("opacity", ".25");
		$("#split-btn").unbind().attr("opacity", ".25");
		// game.player[1].playerHit();
		renderGame();
	};
	var actOnSplit = function () {
		$("#insure-btn").unbind().attr("opacity", ".25");
		$("#split-btn").unbind().attr("opacity", ".25");

		// game.player[1].playerHit();
		renderGame();
	};
	var actOnInsure = function () {
		$("#insure-btn").unbind().attr("opacity", ".25");
		// game.player[1].playerHit();
		renderGame();
	};
	var actOnDouble = function () {
		$("#hit-btn").unbind().attr("opacity", ".25");
		$("#insure-btn").unbind().attr("opacity", ".25");
		$("#double-btn").unbind().attr("opacity", ".25");
		$("#split-btn").unbind().attr("opacity", ".25");
		game.player[1].playerHit();
		renderGame();
	};


	fireDealListener = function () {
		$("#deal-btn").unbind();
		$("#deal-btn").click( actOnDeal ); 
	};	
	fireHitListener = function () {
		$("#hit-btn").unbind();
		$("#hit-btn").click( actOnHit ); 
	};
	fireStandListener = function () {
		$("#stand-btn").unbind();
		$("#stand-btn").click( actOnStand ); 
	};
	fireSplitListener = function () {
		$("#split-btn").unbind();
		$("#split-btn").click( actOnSplit ); 
	};
	fireDoubleListener = function () {
		$("#double-btn").unbind();
		$("#double-btn").click( actOnDouble ); 
	};
	fireInsureListener = function () {
		$("#insure-btn").unbind();
		$("#insure-btn").click( actOnInsure ); 
	};

	var startUp = function () {

		start = function () {game.gameStart();};									// create shoe, deck and players								

		msg = function () {game.gameMsg();};									// get win/loss record
		createHands = function () {game.gameAddHands();};								// create hand objects
		banner = function () {game.gameBanner(0);};									// create banner message


		start();
		msg();
		createHands();
		banner();
		bottomBanner();
	};
