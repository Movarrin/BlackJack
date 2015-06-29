window.onload = function () {
	console.log("loaded window");

		startUp();

	

	$(".btn-img").css("opacity", ".25");
	$("#bet-btn").css("opacity", "1");

	$('#bet-btn').click( function() { actOnBet(this);} );
	};
	
	var actOnDeal = function(clicked) {
		console.log("deal clicked");
		game.gameDeal();											// deal cards.
		$("#bet-btn").unbind();										// turn off bet listener.
		$("#bet-btn").css("opactiy", ".25");									// gray out button
		$("#deal-btn").unbind();										// turn off deal listener.
		$("#deal-btn").css("opactiy", ".25");									// gray out button
		$("#hit-btn").css("opactiy", "1");									// turn on hit button
		$("#hit-btn").css("opactiy", "1");									// turn on hit button
		


	};

	var actOnBet = function(clicked) {
		console.log("bet clicked");
		game.gamePlayerBet();

		$("#deal-btn").css("opactiy", "1");

		$("#deal-btn").click( function () { actOnDeal(this);} );

		
	};

	var startUp = function () {

		start = function () {game.gameStart();};									// create shoe, deck and players								

		msg = function () {game.gameMsg();};									// get win/loss record
		createHands = function () {game.gameAddHands();};								// create hand objects
		banner = function () {game.gameBanner(0);};									// create banner message
		bottomBanner = function () {game.gameBottomBanner();};							// create bottom banner



		start();
		msg();
		createHands();
		banner();
		bottomBanner();
	};
