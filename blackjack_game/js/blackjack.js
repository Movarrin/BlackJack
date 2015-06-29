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

	fireDealListener = function () {
		$("#deal-btn").click( actOnDeal ); 
	};	
	fireHitListener = function () {
		$("#deal-btn").click( actOnDeal ); 
	};
	fireStandListener = function () {
		$("#deal-btn").click( actOnDeal ); 
	};
	fireSplitListener = function () {
		$("#deal-btn").click( actOnDeal ); 
	};
	fireDoubleListener = function () {
		$("#deal-btn").click( actOnDeal ); 
	};
	fireInsuranceListener = function () {
		$("#deal-btn").click( actOnDeal ); 
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
