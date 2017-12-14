var gameWindow = document.getElementById("gameWindow");


var wrap;
var anim_state = 0;

//dialogue readers
var c = 0;
var readSpeed = 80;
var read;

var lines;
var lineid = 0;
var linecomplete = 0;

var speaker;
var speakerid = 0;

var plotId = 0;

//movement speed for parallax background
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;



//worldstate
var lastLoc;
var gamestart = true;
var gatedown = false;
var fruitgrab = false;
var talkolmec = false
var guardsdown = false;
var poweron = false;


//inventory
var inventoryTimer = 0;

var menu = true;

var fruit = false;
var trapezoid = false;
var tusk = false;
var magnet = false;
var food = false;
var jewel = false;
var battery = false;
var rope = false;

var currentItem="";

//popups

var facePuzzPop = false;

function giveInstructions() {
	alert("Hey dummy! Use your mouse to explore the screen, and click to navigate the game world. To access the inventory, mouse over the white bar at the bottom of the game window. You will need to turn sound on to beat this demo. Enjoy!");
}



//sound

var soundPath = "./sound/";
var sounds = [
     {src:"music.mp3", id:"music"},
     {src:"unlock.mp3", id:"unlock"},
     {src:"in.mp3", id:"in"},
	 {src:"out.mp3", id:"out"},
     {src:"magic.mp3", id:"magic"},	 
	 {src:"splat.mp3", id:"splat"},	
	 {src:"electricity.mp3", id:"electricity"},	
	];

createjs.Sound.registerSounds(sounds, soundPath);

var music = new Audio('sound/music.mp3');
var elec = new Audio('sound/electricity.mp3');
music.loop = true;
elec.loop = true;

//=========================== ~ PLOT DIRECTIONS ~ =================================//


//CHANGE THIS FUNCTION TO ACCESS DEBUG SKIP
document.addEventListener('DOMContentLoaded', nextAction(0), false);

//document.addEventListener('DOMContentLoaded', initDoorPuzzle(), false);


function pushNextAction(id){
	plotId = id;
	console.log(plotId);
	nextAction();
	refreshInventory();
}

 function nextAction(){
	
	//////start Screen
	if (plotId == 0){
			initStartMenu();
			//setDialogue(1);
			//setTimeout(spawnDialogueBox, 100);
 	}
	///////Start Room
	else if (plotId == 100){
		clearScreen();
		initStartRoom();
		lastLoc = 100;
 	}
	else if (plotId == 101){
		setDialogue(101);
		spawnDialogueBox();
 	}
	else if (plotId == 102){
		setDialogue(102);
		spawnDialogueBox();
 	}
	
	//////Gate Room
	else if (plotId == 200){
		if (gatedown == false){
				clearScreen();
				initGateRoom();
				 
		}
		else {
			clearScreen();
			initGateRoom();
			hitBoxWrap.removeChild(hitbox2);
			$('#bridgeSprite').css('background-position', '1024px 767px')
		}
		
		lastLoc = 200;
 	}
	else if (plotId == 201){
			getItem("fruit");
 	}
	else if (plotId == 202){
		//knock gate down
		gatedown = true;
		hitBoxWrap.removeChild(hitbox2);
		$("#neutralSprite").hide();
		$('#throwSprite')
		.show().sprite({
			fps: 12, 
			no_of_frames: 60,
			do_once: true,
			on_frame: {
				0: function(obj){

				},
				1: function(){
					createPreventOverlay();
				},
				11: function(obj){
					obj.spState(2);
				},
				23: function(obj){
					obj.spState(3);
				},
				35: function(obj){
					obj.spState(4);
				},
				46: function(obj){
					createjs.Sound.play("splat");
					$('#bridgeSprite')
					.sprite({
						fps: 12, 
						no_of_frames: 23,
						do_once: true,
						on_frame: {
							11: function(obj){
								obj.spState(2);
							},
						}
					});
				},
				47: function(obj){
					obj.spState(5);
				},
				56: function(obj){
					$("#throwSprite").destroy();
					$("#throwSprite").remove();
					$("#neutralSprite").show();
					removePreventOverlay();	
				},
			}
		});			
 	}
	else if (plotId == 203){
			//I could probably get past this...
			setDialogue(202);
			spawnDialogueBox();
			plotId = 210;
 	}	
	else if (plotId == 204){
			//I don't think that will work...
			setDialogue(204);
			spawnDialogueBox();
			plotId = 210;
 	}	
	else if (plotId == 205){		
			//Wow it worked!
			setDialogue(202);
			spawnDialogueBox();
			plotId = 210;
 	}			
	else if (plotId == 210){
			//to the courtyard
			if (gatedown == true){
				getAnim_Exit_Right(2, 400);
			}
			else{
			//i can't get over there...
			setDialogue(2);
			spawnDialogueBox();
			plotId = 210;
			}
	}
	else if (plotId == 211){				

	}
 	

	
	///////Tree Room
		else if (plotId == 300){
			
			if (fruitgrab == false){
				clearScreen();
				initTreeRoom();
				getAnim(3, "fruit", "fruitSprite");
			}
			else {
				clearScreen();
				initTreeRoom();
				$("#fruitSprite").destroy();
				hitBoxWrap.removeChild(hitbox2);
			}	
			lastLoc = 300;
		}
		else if (plotId == 301){
			$("#neutralSprite").hide();
			$('#grabSprite')
			.show().sprite({
				fps: 12, 
				no_of_frames: 72,
				do_once: true,
				on_frame: {
					0: function(obj){
					},
					1: function(){
						createPreventOverlay();
					},
					11: function(obj){
						obj.spState(2);
					},
					23: function(obj){
						obj.spState(3);
					},
					30: function(obj){
						$("#fruitSprite").hide();
					},
					35: function(obj){
						obj.spState(4);
					},
					47: function(obj){
						obj.spState(5);
					},
					59: function(obj){
						obj.spState(6);
					},
					69: function(obj){
						$("#grabSprite").destroy();
						$("#grabSprite").remove();
						$("#neutralSprite").show();
						removePreventOverlay();	
						pushNextAction(302);
					},
				},
				on_last_frame: function(obj){
	
				}
			});	
 	}
		else if (plotId == 302){
			fruitgrab = true;
			fruit = true;
			setDialogue(300);
			spawnDialogueBox();
 	}
		else if (plotId == 303){
			refreshInventory();
			hintInventory();
 	}

	
	///////Courtyard
		else if (plotId == 400){
			clearScreen();
			initCourtyardRoom();
			lastLoc = 400;
 	}
		else if (plotId == 401){
			setDialogue(3);
			plotId = 402;
			spawnDialogueBox();
 	}

	/////////Lobby
		else if (plotId == 500){
			clearScreen();
			initLobbyRoom();
			lastLoc = 500;
			
			if (facePuzzPop == true){
				gameWindow.removeChild(facePuzzleWrap);
				refreshInventory();
				facePuzzPop = false;
			}
		}
		else if (plotId == 501){
			setDialogue(501);
			spawnDialogueBox();
			plotId = 502;
		}
		

 
 	/////////Control Room
		else if (plotId == 600){
			clearScreen();
			initControlRoom();
 			lastLoc = 600;
		}
		else if (plotId == 601){
			if (poweron == true){
				plotId = 603;
				setDialogue(610);
				spawnDialogueBox();
			}
			else if (talkolmec == true){
				setDialogue(630);
				spawnDialogueBox();
				
			}
			else {
				setDialogue(620);
				spawnDialogueBox();
			}
		}
		else if (plotId == 602){
			talkolmec = true;
		}
		else if (plotId == 604){
			endgame();
		}
 

	/////////Reception Room
		else if (plotId == 700){
			clearScreen();
			initReceptionRoom();
			lastLoc = 700;
		}
		else if (plotId == 701){
			
			if(talkolmec == false){
				setDialogue(711);
				spawnDialogueBox();
			}
			else{
			setDialogue(701);
			plotId = 702;
			spawnDialogueBox();
			}
		}
		else if (plotId == 703){
			initFacePuzzle();
			hitBoxWrap.removeChild(hitbox3);
		}
		else if (plotId == 710){
			//debug
			initReceptionRoom();
			gameWindow.removeChild(hitBoxWrap);
			initFacePuzzle();
			
		}		
		else if (plotId == 711){
			//correct
			setDialogue(721);
			spawnDialogueBox();
		}
		else if (plotId == 712){
			gameWindow.removeChild(facePuzzleWrap);			
			$('#guardsSprite')
				.sprite({
					do_once: true,
					fps: 6, 
					no_of_frames: 6,
				});
				
			guardsdown = true;
			
			
			var hitbox4 = document.createElement("div"); 
			hitbox4.id = "hitbox4";
			
			hitbox4.setAttribute("class", "hitbox up");
			hitbox4.style.width = "720px";
			hitbox4.style.height = "440px";
			
			hitbox4.style.top = "150px";
			hitbox4.style.left = "190px";
			
			hitBoxWrap.appendChild(hitbox4);
			hitbox4.addEventListener("click", function(){getAnim_Exit_Left(7, 800);}, false);
			
		}
		else if (plotId == 721){
			//not correct
			setDialogue(711);
			spawnDialogueBox();
		}
		else if (plotId == 722){
			gameWindow.removeChild(facePuzzleWrap);
			getAnim_Exit_Right(7, 500);
			}
		
		
		else if (plotId == 800){
			clearScreen();
			initElectricRoom();
			lastLoc = 800;
		}
 }
 
 
 //=========================== ~ Room Map ~ =================================//
 
 function initStartMenu() {
	 getBackground(0);
	 getWrappers();
	 
	
	 
	//create startButton
	var startButton = document.createElement("div"); 
	startButton.id = "startButton";
	startButton.style.zIndex = 100;
	gameWindow.appendChild(startButton);
	startButton.setAttribute("class", "hit");
	startButton.addEventListener("click", startGame);
	
	//create optionsButton
	var optionsButton = document.createElement("div"); 
	optionsButton.id = "optionsButton";
	optionsButton.style.zIndex = 100;
	gameWindow.appendChild(optionsButton);
	optionsButton.setAttribute("class", "hit");
	optionsButton.addEventListener("click", openInfo);
}

 function initStartRoom(){
	getBackground(1);
	getWrappers();
	
/////////////////////////////
	var hitbox1 = document.createElement("div"); 
	hitbox1.id = "hitbox1";
	
	hitbox1.setAttribute("class", "hitbox right");
	hitbox1.style.width = "300px";
	hitbox1.style.height = "750px";
	
	hitbox1.style.top = "0px";
	hitbox1.style.left = "768px";
	
	hitbox1.addEventListener("click", function(){
		getAnim_Exit_Right(1, 200);
		}, false);

	
	
/////////////////////////////
	var hitbox2 = document.createElement("div"); 
	hitbox2.id = "hitbox2";
	
	hitbox2.setAttribute("class", "hitbox left");
	hitbox2.style.width = "300px";
	hitbox2.style.height = "750px";
	
	hitbox2.style.top = "0px";
	hitbox2.style.left = "0px";
	
	hitbox2.addEventListener("click", function(){
		console.log("click");
		getAnim_Exit_Left(1, 300);
		}, false);
		
		
 //////////////////////////////
	if (gamestart == true){
		
		gamestart = false;
		getAnim(1, "awaken", "awakenSprite");
		getAnimNeutral(1);
		$("#neutralSprite").hide();

		
		$('#awakenSprite')
		.sprite({
			fps: 12, 
			no_of_frames: 12,
			on_frame: {
					0: function(obj){
						obj.spStop();
					},
					1: function(){
						createPreventOverlay();
						music.play();
						createjs.Sound.play("magic");
					},
					11: function(){
						console.log("11");
						$("#neutralSprite").show();

						$("#awakenSprite").destroy();
						$("#awakenSprite").remove();					
						hitBoxWrap.removeChild(hitbox3);
						
						setTimeout(function(){
							removePreventOverlay();
							pushNextAction(101);
						}, 300);
					},
				}
		});
		
	 	/////////////////////////////
		var hitbox3 = document.createElement("div"); 
		hitbox3.id = "hitbox3";
		
		hitbox3.setAttribute("class", "hitbox hit");
		hitbox3.style.width = "300px";
		hitbox3.style.height = "220px";
		
		hitbox3.style.top = "350px";
		hitbox3.style.left = "420px";
		
		hitBoxWrap.appendChild(hitbox3);
		hitbox3.addEventListener("click", function(){
			$('#awakenSprite').spStart();
			hitBoxWrap.appendChild(hitbox2);
			hitBoxWrap.appendChild(hitbox1);
		}, false);
	}
	else{
		
		if (lastLoc == "200"){
			getAnim_Enter (1, "right");
		}
		else if (lastLoc == "300"){
			getAnim_Enter (1, "left");
		}
		hitBoxWrap.appendChild(hitbox2);
		hitBoxWrap.appendChild(hitbox1);
	}
	
	

 

	}	
 
 function initGateRoom(){
		getBackground(2);
		getWrappers();
		
		getAnim(2, "bridge", "bridgeSprite");
		getAnim(2, "throw", "throwSprite");
		$("#throwSprite").hide();
		
		//entrances
		if (lastLoc == "400"){
			getAnim_Enter (2, "right");
		}
		else if (lastLoc == "100"){
			getAnim_Enter (2, "left");
		}

		
		//////////////////// to start room
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox downleft");
		hitbox1.style.width = "300px";
		hitbox1.style.height = "500px";
		
		hitbox1.style.top = "200px";
		hitbox1.style.left = "0px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){getAnim_Exit_Left(2, 100);}, false);
		
		
		//////////////////// gate
		var hitbox2 = document.createElement("div"); 
		hitbox2.id = "hitbox2";
		
		hitbox2.setAttribute("class", "hitbox hit");
		hitbox2.style.width = "150px";
		hitbox2.style.height = "230px";
		
		hitbox2.style.top = "100px";
		hitbox2.style.left = "550px";
		
		hitBoxWrap.appendChild(hitbox2);
		hitbox2.addEventListener("click", function(){pushNextAction(201);}, false);


		//////////////////// to courtyard
		var hitbox3 = document.createElement("div"); 
		hitbox3.id = "hitbox3";
		
		hitbox3.setAttribute("class", "hitbox upright");
		hitbox3.style.width = "300px";
		hitbox3.style.height = "700px";
		
		hitbox3.style.top = "0px";
		hitbox3.style.left = "768px";
		
		hitBoxWrap.appendChild(hitbox3);
		hitbox3.addEventListener("click", function(){pushNextAction(210);}, false);
 }
 
 function initTreeRoom(){
		getBackground(3);
		getWrappers();
		

		
		getAnim(3, "tree", "treeSprite");
		getAnim_Enter (3, "right");
		getAnim(3, "grab", "grabSprite");
		$("#grabSprite").hide();
		
		treeanim = setInterval(animateTree, 2000);

		
		///////////////////////////// to start screen
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox right");
		hitbox1.style.width = "400px";
		hitbox1.style.height = "700px";
		
		hitbox1.style.top = "10px";
		hitbox1.style.left = "768px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){clearInterval(treeanim); getAnim_Exit_Right(3, 100);}, false);
		
		
		////////////////////
		var hitbox2 = document.createElement("div"); 
		hitbox2.id = "hitbox2";
		
		hitbox2.setAttribute("class", "hitbox hit");
		hitbox2.style.width = "400px";
		hitbox2.style.height = "500px";
		
		hitbox2.style.top = "100px";
		hitbox2.style.left = "300px";
		
		hitBoxWrap.appendChild(hitbox2);
		hitbox2.addEventListener("click", function(){ pushNextAction(301);}, false);

		
 }

 function initCourtyardRoom(){
		getBackground(4);
		getWrappers();
		
		if (lastLoc == "200"){
			getAnim_Enter (4, "left");
		}
		else if (lastLoc == "500"){
			getAnim_Enter (4, "right");
		}
		
	/////////////////////////////
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox upright");
		hitbox1.style.width = "610px";
		hitbox1.style.height = "200px";
		
		hitbox1.style.top = "250px";
		hitbox1.style.left = "660px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){pushNextAction(401);}, false);
		
		
		/////////////////////////////
		var hitbox2 = document.createElement("div"); 
		hitbox2.id = "hitbox2";
		
		hitbox2.setAttribute("class", "hitbox downleft");
		hitbox2.style.width = "110px";
		hitbox2.style.height = "300px";
		
		hitbox2.style.top = "500px";
		hitbox2.style.left = "10px";
		
		hitBoxWrap.appendChild(hitbox2);
		hitbox2.addEventListener("click", function(){getAnim_Exit_Left(4, 200);}, false);		
	
		////////////////////
		var hitbox3 = document.createElement("div"); 
		hitbox3.id = "hitbox3";
		
		hitbox3.setAttribute("class", "hitbox left");
		hitbox3.style.width = "150px";
		hitbox3.style.height = "200px";
		
		hitbox3.style.top = "300px";
		hitbox3.style.left = "220px";
		
		hitBoxWrap.appendChild(hitbox3);
		hitbox3.addEventListener("click", function(){getAnim_Exit_Right(4, 500);}, false);
		
		
 }
 
 function initLobbyRoom(){
		getBackground(5);
		getWrappers();
		if (lastLoc == "400"){
			getAnim_Enter (5, "right");
		}
		else if (lastLoc == "600"){
			getAnim_Enter (5, "left");
		}
		else if (lastLoc == "700"){
			getAnim_Enter (5, "up");
		}
		
	/////////////////////////////toCourtyard
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox right");
		hitbox1.style.width = "210px";
		hitbox1.style.height = "400px";
		
		hitbox1.style.top = "250px";
		hitbox1.style.left = "790px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){getAnim_Exit_Right(5, 400);}, false);
		
		
		/////////////////////////////toReception
		var hitbox2 = document.createElement("div"); 
		hitbox2.id = "hitbox2";
		
		hitbox2.setAttribute("class", "hitbox up");
		hitbox2.style.width = "200px";
		hitbox2.style.height = "450px";
		
		hitbox2.style.top = "20px";
		hitbox2.style.left = "460px";
		
		hitBoxWrap.appendChild(hitbox2);
		hitbox2.addEventListener("click", function(){getAnim_Exit_Up(5, 700);}, false);		
	
		////////////////////toControlRoom
		var hitbox3 = document.createElement("div"); 
		hitbox3.id = "hitbox3";
		
		hitbox3.setAttribute("class", "hitbox left");
		hitbox3.style.width = "150px";
		hitbox3.style.height = "300px";
		
		hitbox3.style.top = "290px";
		hitbox3.style.left = "120px";
		
		hitBoxWrap.appendChild(hitbox3);
		hitbox3.addEventListener("click", function(){getAnim_Exit_Left(5, 600);}, false);
		
		var hitbox4 = document.createElement("div"); 
		hitbox4.id = "hitbox4";
		
		hitbox4.setAttribute("class", "hitbox hit");
		hitbox4.style.width = "120px";
		hitbox4.style.height = "160px";
		
		hitbox4.style.top = "290px";
		hitbox4.style.left = "270px";
		
		hitBoxWrap.appendChild(hitbox4);
		hitbox4.addEventListener("click", function(){pushNextAction(501);}, false);
		
		
 }
 
 function initControlRoom(){
		getBackground(6);
		getWrappers();
		

		getAnim_Enter (6, "right");

	/////////////////////////////toLobby
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox right");
		hitbox1.style.width = "210px";
		hitbox1.style.height = "200px";
		
		hitbox1.style.top = "500px";
		hitbox1.style.left = "790px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){getAnim_Exit_Right(6, 500);}, false);
		
		
		/////////////////////////////Olmec
		var hitbox2 = document.createElement("div"); 
		hitbox2.id = "hitbox2";
		
		hitbox2.setAttribute("class", "hitbox hit");
		hitbox2.style.width = "450px";
		hitbox2.style.height = "600px";
		
		hitbox2.style.top = "10px";
		hitbox2.style.left = "300px";
		
		hitBoxWrap.appendChild(hitbox2);
		hitbox2.addEventListener("click", function(){pushNextAction(601);}, false);	
		
 }
 
 function initReceptionRoom(){
		getWrappers();
		
		if (lastLoc == "500"){
			getAnim_Enter (7, "right");
		}
		else if (lastLoc == "800"){
			getAnim_Enter (7, "left");
		}
		
		if (guardsdown == true){
			getBackground(8);
			
			var hitbox4 = document.createElement("div"); 
			hitbox4.id = "hitbox4";
			hitbox4.setAttribute("class", "hitbox up");
			hitbox4.style.width = "720px";
			hitbox4.style.height = "440px";
			hitbox4.style.top = "150px";
			hitbox4.style.left = "190px";
			hitBoxWrap.appendChild(hitbox4);
			hitbox4.addEventListener("click", function(){getAnim_Exit_Left(7, 800);}, false);
		}
		else {
			getBackground(7);
			getAnim(7, "guards", "guardsSprite");
			
			////////////////////start puzzle
			var hitbox3 = document.createElement("div"); 
			hitbox3.id = "hitbox3";
			
			hitbox3.setAttribute("class", "hitbox up");
			hitbox3.style.width = "720px";
			hitbox3.style.height = "340px";
			
			hitbox3.style.top = "150px";
			hitbox3.style.left = "190px";
			
			hitBoxWrap.appendChild(hitbox3);
			hitbox3.addEventListener("click", function(){pushNextAction(701);}, false);
		}
		
		if (poweron == true){
			getAnim(7, "lightning", "lightningSprite");
			$('#lightningSprite')
				.sprite({
					fps: 6, 
					no_of_frames: 6,
				});
			hitBoxWrap.removeChild(hitbox4);
			elec.play();
		}
		
		
	/////////////////////////////to lobb
		var hitbox1 = document.createElement("div"); 
		hitbox1.id = "hitbox1";
		
		hitbox1.setAttribute("class", "hitbox down");
		hitbox1.style.width = "790px";
		hitbox1.style.height = "200px";
		
		hitbox1.style.top = "550px";
		hitbox1.style.left = "0px";
		
		hitBoxWrap.appendChild(hitbox1);
		hitbox1.addEventListener("click", function(){getAnim_Exit_Right(7, 500); elec.pause();}, false);
		

		
 }
 
 function initElectricRoom(){
	 supressInventory();
	 initDoorPuzzle();
		
 }
//========================= ~ Game Functions ~ ========================//

function startGame (){
	gameWindow.removeChild(startButton);
	gameWindow.removeChild(optionsButton);
	initInventory();
	pushNextAction(100);
}

function endgame(){
	supressInventory();
	clearScreen();
	getWrappers();
	openInfo();
}
 
function openInfo(){
	var infoScreen = document.createElement("div"); 
	infoScreen.id = "infoScreen";
	hitBoxWrap.appendChild(infoScreen);
	infoScreen.setAttribute("class", "hit");
	infoScreen.addEventListener("click", refreshPage);
}

function refreshPage(){
	location.reload();
}

function initInventory(){
	var inventoryWrap = document.createElement("div"); 
	inventoryWrap.id = "inventoryWrap";
	inventoryWrap.setAttribute("class", "normal")
	inventoryWrap.style.zIndex = 40;
	gameWindow.appendChild(inventoryWrap);
	
	var inventoryListener = document.createElement("div"); 
	inventoryListener.id = "inventoryListener";
	inventoryListener.setAttribute("class", "normal")
	inventoryListener.style.zIndex = 60;
	inventoryWrap.appendChild(inventoryListener);
	inventoryListener.addEventListener("mouseenter", startInventoryTimer, false);
	inventoryListener.addEventListener("mouseleave", stopInventoryTimer, false);
	
	var inventoryItemWrap = document.createElement("div"); 
	inventoryItemWrap.id = "inventoryItemWrap";
	inventoryItemWrap.style.zIndex = 50;
	inventoryWrap.appendChild(inventoryItemWrap);
	
	
	if (fruit == true){
		
		var fruitBg = document.createElement("div"); 
		fruitBg.id = "fruitBg";
		fruitBg.style.zIndex = 70;
		fruitBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(fruitBg);
		
		var fruitInv = document.createElement("div"); 
		fruitInv.id = "fruitInv";
		fruitInv.style.zIndex = 80;
		fruitInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(fruitInv);
		fruitInv.addEventListener("click", function(){grabInventory("fruit")}, false);
	}
	if (trapezoid == true){
		
		var trapezoidBg = document.createElement("div"); 
		trapezoidBg.id = "trapezoidBg";
		trapezoidBg.style.zIndex = 70;
		trapezoidBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(trapezoidBg);
		
		var trapezoidInv = document.createElement("div"); 
		trapezoidInv.id = "trapezoidInv";
		trapezoidInv.style.zIndex = 80;
		trapezoidInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(trapezoidInv);
		trapezoidInv.addEventListener("click", function(){grabInventory("trapezoid")}, false);
	}	
	if (tusk == true){
		
		var tuskBg = document.createElement("div"); 
		tuskBg.id = "tuskBg";
		tuskBg.style.zIndex = 70;
		tuskBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(tuskBg);
		
		var tuskInv = document.createElement("div"); 
		tuskInv.id = "tuskInv";
		tuskInv.style.zIndex = 80;
		tuskInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(tuskInv);
		tuskInv.addEventListener("click", function(){grabInventory("tusk")}, false);
	}
	if (magnet == true){
		
		var magnetBg = document.createElement("div"); 
		magnetBg.id = "magnetBg";
		magnetBg.style.zIndex = 70;
		magnetBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(magnetBg);
		
		var magnetInv = document.createElement("div"); 
		magnetInv.id = "magnetInv";
		magnetInv.style.zIndex = 80;
		magnetInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(magnetInv);
		magnetInv.addEventListener("click", function(){grabInventory("magnet")}, false);
	}
	if (food == true){
		
		var foodBg = document.createElement("div"); 
		foodBg.id = "foodBg";
		foodBg.style.zIndex = 70;
		foodBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(foodBg);
		
		var foodInv = document.createElement("div"); 
		foodInv.id = "foodInv";
		foodInv.style.zIndex = 80;
		foodInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(foodInv);
		foodInv.addEventListener("click", function(){grabInventory("food")}, false);
	}
	if (jewel == true){
		
		var jewelBg = document.createElement("div"); 
		jewelBg.id = "jewelBg";
		jewelBg.style.zIndex = 70;
		jewelBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(jewelBg);
		
		var jewelInv = document.createElement("div"); 
		jewelInv.id = "jewelInv";
		jewelInv.style.zIndex = 80;
		jewelInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(jewelInv);
		jewelInv.addEventListener("click", function(){grabInventory("jewel")}, false);
	}
	if (battery == true){
		
		var batteryBg = document.createElement("div"); 
		batteryBg.id = "batteryBg";
		batteryBg.style.zIndex = 70;
		batteryBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(batteryBg);
		
		var batteryInv = document.createElement("div"); 
		batteryInv.id = "batteryInv";
		batteryInv.style.zIndex = 80;
		batteryInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(batteryInv);
		batteryInv.addEventListener("click", function(){grabInventory("battery")}, false);
	}
	if (rope == true){
		
		var ropeBg = document.createElement("div"); 
		ropeBg.id = "ropeBg";
		ropeBg.style.zIndex = 70;
		ropeBg.setAttribute("class", "inventoryBackground");
		inventoryItemWrap.appendChild(ropeBg);
		
		var ropeInv = document.createElement("div"); 
		ropeInv.id = "ropeInv";
		ropeInv.style.zIndex = 80;
		ropeInv.setAttribute("class", "inventoryItem hit");
		inventoryItemWrap.appendChild(ropeInv);
		ropeInv.addEventListener("click", function(){grabInventory("rope")}, false);
	}
}

function startInventoryTimer(){
	InvTimer = setInterval(inventoryAddTime, 150);
	console.log("on");
}

function stopInventoryTimer(){
	console.log("off");
	clearInterval(InvTimer);
	inventoryTimer = 0;
}

function inventoryAddTime(){
	inventoryTimer += .5;
	console.log(inventoryTimer);
	
	if (inventoryTimer > 1){
		clearInterval(InvTimer);
		inventoryTimer = 0;
		displayInventory();
	}
}

function displayInventory(){
	console.log("display");
	
	//stop listening to the timer
	inventoryListener.removeEventListener("mouseenter", startInventoryTimer, false);
	inventoryListener.removeEventListener("mouseleave", stopInventoryTimer, false);

	
	$("#inventoryListener").addClass("invisible");
	
	
	setTimeout(function () {$('.inventoryBackground').removeClass('inventoryInactive');}, 0);
	setTimeout(function () {$('.inventoryBackground').addClass('inventoryActive');}, 1);
	
	setTimeout(function () {$('.inventoryItem').removeClass('inventoryInactive');}, 100);
	setTimeout(function () {$('.inventoryItem').addClass('inventoryActive');}, 101);
	setTimeout(function ()	{inventoryWrap.addEventListener("mouseleave", hideInventory, false);}, 102);
}

function hideInventory(){
	//start listening for the timer
	console.log("hide");
	
	$("#inventoryListener").removeClass("invisible");
	
	inventoryListener.addEventListener("mouseenter", startInventoryTimer, false);
	inventoryListener.addEventListener("mouseleave", stopInventoryTimer, false);
	
	//animate 
	
	setTimeout(function () {$('.inventoryBackground').removeClass('inventoryActive');}, 0);
	setTimeout(function () {$('.inventoryBackground').addClass('inventoryInactive');}, 1);
	
	setTimeout(function () {$('.inventoryItem').removeClass('inventoryActive');}, 0);
	setTimeout(function () {$('.inventoryItem').addClass('inventoryInactive');}, 1);
	
	inventoryWrap.removeEventListener("mouseleave", hideInventory, false);
	
}

function hintInventory(){
	displayInventory();
	createPreventOverlay();
	setTimeout(removePreventOverlay, 1000);
	setTimeout(hideInventory, 1000);
}

function supressInventory(){
	gameWindow.removeChild(inventoryWrap);
}

function refreshInventory(){
	gameWindow.removeChild(inventoryWrap);
	initInventory();
}

function grabInventory(inv){
	
	
	fn = function(){ungrabInventory(inv);};
	
	gameWindow.addEventListener("mouseup", fn, false);

	setTimeout(function () {$('.hitbox').removeClass('hit');}, 1);
	setTimeout(function () {$('.hitbox').addClass(inv);}, 1);
	
	setTimeout(function () {$('#hitBoxWrap').removeClass('hit');}, 1);
	setTimeout(function () {$('#hitBoxWrap').addClass(inv);}, 1);

	setTimeout(function () {$('#inventoryWrap').removeClass('hit');}, 1);
	setTimeout(function () {$('#inventoryWrap').addClass(inv);}, 1);

	currentItem = inv;
	currentInv = document.getElementById(inv + "Inv");

	
	$("#" + inv + "Inv").addClass("invisible");

}

function ungrabInventory(item){

	$('.hitbox').removeClass(item).addClass("hit");
	$('#hitBoxWrap').removeClass(item).addClass("normal");
	$('#inventoryWrap').removeClass(item).addClass("normal");
	
	refreshInventory();
	
	gameWindow.removeEventListener("mouseup", fn, false);
}

function getItem(ans){

	if (currentItem === ans){
		plotId++;
		nextAction();
		currentItem = "";
		window[ans] = false; 
		refreshInventory();
	}
	else if(currentItem === ""){
		plotId += 2;
		nextAction();
		currentItem="";
		$("#" + ans + "Inv").removeClass("invisible");
	}
	else{
		setDialogue(1);
		spawnDialogueBox();
		plotId -= 2;
	}
	
}

function clearScreen(){
	gameWindow.removeChild(bg);
	gameWindow.removeChild(hitBoxWrap);
	gameWindow.removeChild(spriteWrap);
}

function getWrappers(){
	var hitBoxWrap = document.createElement("div"); 
	hitBoxWrap.setAttribute("class", "normal");
	hitBoxWrap.id = "hitBoxWrap";
	hitBoxWrap.style.zIndex = 20;
	gameWindow.appendChild(hitBoxWrap);
	
	var spriteWrap = document.createElement("div"); 
	spriteWrap.id = "spriteWrap";
	spriteWrap.style.zIndex = 19;
	gameWindow.appendChild(spriteWrap);
}

function getBackground(num){
	var bg = document.createElement("img"); 
	bg.id = "bg";
	bg.style.zIndex = 10;
	bg.setAttribute("class", "bg");
	bg.setAttribute("src", "assets/bg" + num + ".jpg");
	gameWindow.appendChild(bg);
	
}
 
function walkOffscreen(){

	orange.style.left = (pos + "px");
	pos += 2;

	if(pos > 1000){
		gameWindow.removeChild(orange);
		clearInterval(move);
	}
}

function createPreventOverlay(){
	console.log("preventoverlay");
	var preventOverlay = document.createElement("div"); 
	preventOverlay.id = "preventOverlay";
	preventOverlay.style.zIndex = 5000;
	gameWindow.appendChild(preventOverlay);
}

function removePreventOverlay(){
	gameWindow.removeChild(preventOverlay);	
}

//========================= ~ ANIMATIONS ~ ========================//

function getAnim(screen, path, id){
	animSprite = document.createElement("div"); 
	animSprite.id = id;
	
	animSprite.setAttribute("class", "fullsprite");
	animSprite.style.backgroundImage = "url('anims/anim" + screen + "_" + path + ".png')";
	
	spriteWrap.appendChild(animSprite);
}

function getAnimNeutral(screen){
		
	neutralSprite = document.createElement("div"); 
	neutralSprite.id = "neutralSprite";
	
	neutralSprite.setAttribute("class", "fullsprite");
	neutralSprite.style.backgroundImage = "url('anims/anim" + screen + "_neutral.png')";
	

	spriteWrap.appendChild(neutralSprite);
	
	$('#neutralSprite')
		.spState(1)
		.sprite({
			fps: 12, 
			no_of_frames: 12,
			on_frame: {
					0: function(obj){
						console.log("0");
					},
				}
		});
}

function getAnim_Exit_Left (screen, destination){
		
		var neutralSprite = document.getElementById("neutralSprite");
		var spriteWrap = document.getElementById("spriteWrap")

		
		var exitleftSprite = document.createElement("div"); 
		exitleftSprite.id = "exitleftSprite";

		
		exitleftSprite.setAttribute("class", "fullsprite");
		exitleftSprite.style.backgroundImage = "url('anims/anim" + screen + "_exitleft.png')";
		
		spriteWrap.appendChild(exitleftSprite);
		
		$("#neutralSprite").destroy();
		$("#neutralSprite").remove();
		
		$('#exitleftSprite')
			.sprite({
				fps: 12, 
				no_of_frames: 12,
				on_frame: {
					1: function(){
						createPreventOverlay();
					},
					10: function(){
						//alert("11");
						removePreventOverlay();
					},
					11: function(){
						$("#exitleftSprite").destroy();
						$("#exitleftSprite").remove();

						pushNextAction(destination);

					},
				}
			})
		createjs.Sound.play("out");
			}	

function getAnim_Exit_Right (screen, destination){
		
		var neutralSprite = document.getElementById("neutralSprite");
		var spriteWrap = document.getElementById("spriteWrap")

		
		var exitrightSprite = document.createElement("div"); 
		exitrightSprite.id = "exitrightSprite";

		
		exitrightSprite.setAttribute("class", "fullsprite");
		exitrightSprite.style.backgroundImage = "url('anims/anim" + screen + "_exitright.png')";
		
		spriteWrap.appendChild(exitrightSprite);
		
		$("#neutralSprite").destroy();
		$("#neutralSprite").remove();

		$('#exitrightSprite')
			.sprite({
				fps: 12, 
				no_of_frames: 12,
				on_frame: {
					0: function(){
						createPreventOverlay();
					},
					10: function(){
						//alert("11");
					//	removePreventOverlay();
					},
					11: function(){
						removePreventOverlay();
						$("#exitrightSprite").destroy();
						$("#exitrightSprite").remove();
						pushNextAction(destination);

					},
				}
			})
		createjs.Sound.play("out");
			}	

function getAnim_Exit_Up (screen, destination){
		
		var neutralSprite = document.getElementById("neutralSprite");
		var spriteWrap = document.getElementById("spriteWrap")

		
		var exitrightSprite = document.createElement("div"); 
		exitrightSprite.id = "exitupSprite";

		
		exitrightSprite.setAttribute("class", "fullsprite");
		exitrightSprite.style.backgroundImage = "url('anims/anim" + screen + "_exitup.png')";
		
		spriteWrap.appendChild(exitrightSprite);
		
		$("#neutralSprite").destroy();
		$("#neutralSprite").remove();

		$('#exitupSprite')
			.sprite({
				fps: 12, 
				no_of_frames: 12,
				on_frame: {
					0: function(){
						createPreventOverlay();
					},
					10: function(){
						//alert("11");
					//	removePreventOverlay();
					},
					11: function(){
						removePreventOverlay();
						$("#exitupSprite").destroy();
						$("#exitupSprite").remove();
						pushNextAction(destination);

					},
				}
			})
		createjs.Sound.play("out");
			}	

function getAnim_Enter (screen, direction){
		var neutralSprite = document.getElementById("neutralSprite");
		var spriteWrap = document.getElementById("spriteWrap")

		
		var enterSprite = document.createElement("div"); 
		enterSprite.id = "enterSprite";

		
		enterSprite.setAttribute("class", "fullsprite");
		enterSprite.style.backgroundImage = "url('anims/anim" + screen + "_enter" + direction + ".png')";
		
		spriteWrap.appendChild(enterSprite);

		$('#enterSprite')
			.sprite({
				fps: 12, 
				no_of_frames: 12,
				on_frame: {
					0: function(){
						createPreventOverlay();
					},
					10: function(){
						//alert("11");
					//	removePreventOverlay();
					},
					11: function(){
						getAnimNeutral(screen);
						removePreventOverlay();
						$("#enterSprite").destroy();
						$("#enterSprite").remove();

					},
				}
			})
		createjs.Sound.play("in");
			}

function animateTree(){
		$('#treeSprite')
		.sprite({
			do_once: true,
			fps: 9, 
			no_of_frames: 12,
		});
		$('#fruitSprite')
		.sprite({
			do_once: true,
			fps: 9, 
			no_of_frames: 12,
		});
}

//========================= ~ Face  Puzzle ~ ========================//

function initFacePuzzle(){
	
	facePuzzPop = true;
	
	facePartAns = [250, 1250, 1500, 315, 210, 105];
	
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	var c = Math.floor((Math.random() * 10) + 1);
	var j = a*250;
	var k = b*250;
	var l = c*250;
	
	
	facePartPos = [j, k, l, 315, 210, 105];
	
	
	
	var facePuzzleWrap = document.createElement("div"); 
	facePuzzleWrap.id = "facePuzzleWrap";
	facePuzzleWrap.style.zIndex = 100;
	gameWindow.appendChild(facePuzzleWrap);
	
	//add go button
	var facePuzzleGo = document.createElement("div"); 
	facePuzzleGo.id = "facePuzzleGo";
	facePuzzleGo.style.zIndex = 120;
	facePuzzleWrap.appendChild(facePuzzleGo);
	facePuzzleGo.addEventListener("click", function(){setTimeout(checkFaceAnswer, 300)}, false);
	
	//add random button
	var facePuzzleRand = document.createElement("div"); 
	facePuzzleRand.id = "facePuzzleRand";
	facePuzzleRand.style.zIndex = 120;
	facePuzzleWrap.appendChild(facePuzzleRand);
	facePuzzleRand.addEventListener("click", function(){setTimeout(randFacePuzzle, 300)}, false);
	
	//add button wrappers
	var facePuzzleButtonWrap1 = document.createElement("div"); 
	facePuzzleButtonWrap1.id = "facePuzzleButtonWrap1";
	facePuzzleButtonWrap1.style.zIndex = 110;
	facePuzzleWrap.appendChild(facePuzzleButtonWrap1);
	
	
	var facePuzzleButtonWrap2 = document.createElement("div"); 
	facePuzzleButtonWrap2.id = "facePuzzleButtonWrap2";
	facePuzzleButtonWrap2.style.zIndex = 110;
	facePuzzleWrap.appendChild(facePuzzleButtonWrap2);
	
	
	//add  counter wrap
	var facePuzzleCounterWrap = document.createElement("div"); 
	facePuzzleCounterWrap.id = "facePuzzleCounterWrap";
	facePuzzleCounterWrap.style.zIndex = 110;
	facePuzzleWrap.appendChild(facePuzzleCounterWrap);
	
	
	//add counters
	for(var i=0; i<3; i++){
		addFacePuzzleCounters(i);
	}
	//add buttons
	for(var i=0; i<3; i++){
		addFacePuzzleButtonsLeft(i);
	}
	for(var i=0; i<3; i++){
		addFacePuzzleButtonsRight(i);
	}
	
	//add sounds
	var soundPath = "./sound/";
	var facePuzzleSounds = [
     {src:"rocks1.mp3", id:"rocks1"},
     {src:"rocks2.mp3", id:"rocks2"},
	 {src:"dice.mp3", id:"dice"},
	];
	
	createjs.Sound.registerSounds(facePuzzleSounds, soundPath);
}

function addFacePuzzleCounters(id){
	var facePuzzleCounter = document.createElement("div"); 
	facePuzzleCounter.id = "facePuzzleCounter"+ id;
	facePuzzleCounter.setAttribute("class", "facePuzzleCounter");
	facePuzzleCounter.style.zIndex = 120;
	facePuzzleCounter.style.backgroundImage = "url('assets/faces.png')";
	facePuzzleCounterWrap.appendChild(facePuzzleCounter);
	
	var currentFacePart = document.getElementById("facePuzzleCounter" + id);

	currentFacePart.style.backgroundPosition = facePartPos[id] + "px" + " " + facePartPos[id+3] + "px";

}

function addFacePuzzleButtonsLeft(id){

	var facePuzzleButton = document.createElement("div"); 
	facePuzzleButton.id = "facePuzzleButton" + id;
	facePuzzleButton.setAttribute("class", "facePuzzleButton1");
	facePuzzleButton.style.backgroundImage = "url('assets/facepuzzlebuttons.png')";
	facePuzzleButton.style.zIndex = 100;
	facePuzzleButtonWrap1.appendChild(facePuzzleButton);
	facePuzzleButton.addEventListener("click", function(){faceBack(id);}, false);
}

function addFacePuzzleButtonsRight(id){
	var facePuzzleButton = document.createElement("div"); 
	facePuzzleButton.id = "facePuzzleButton" + id;
	facePuzzleButton.setAttribute("class", "facePuzzleButton2");
	facePuzzleButton.style.backgroundImage = "url('assets/facepuzzlebuttons.png')";
	facePuzzleButton.style.zIndex = 100;
	facePuzzleButtonWrap2.appendChild(facePuzzleButton);
	facePuzzleButton.addEventListener("click", function(){faceForward(id);}, false);
}

function randFacePuzzle(){
		gameWindow.removeChild(facePuzzleWrap);
		initFacePuzzle();
		createjs.Sound.play("dice");
}

function faceBack(id){
	
	createPreventOverlay();
	setTimeout(removePreventOverlay, 200);
	createjs.Sound.play("rocks2");

	if(facePartPos[id] > 0){
		facePartPos[id] -= 250;
		var faceSwitch = document.getElementById("facePuzzleCounter" + id);
		faceSwitch.style.backgroundPosition = facePartPos[id] + "px " + facePartPos[id+3] + "px";
		//alert(id);
	}
	else{
	facePartPos[id] = 2250;
	var faceSwitch = document.getElementById("facePuzzleCounter" + id);
	faceSwitch.style.backgroundPosition = facePartPos[id] + "px " + facePartPos[id+3] + "px";
	}
}

function faceForward(id){
	
	createjs.Sound.play("rocks1");
	createPreventOverlay();
	setTimeout(removePreventOverlay, 200);
	
	var faceSwitch = document.getElementById("facePuzzleCounter" + id);
	
	if(facePartPos[id] < 2200){
	facePartPos[id] += 250;
	faceSwitch.style.backgroundPosition = facePartPos[id] + "px " + facePartPos[id+3] + "px";
	//alert(facePartPos);
	}
	else{
	facePartPos[id] = 0;
	faceSwitch.style.backgroundPosition = facePartPos[id] + "px " + facePartPos[id+3] + "px";
	}
}

function checkFaceAnswer(){
	//alert(facePartPos);
	var a = facePartPos.toString();
	var b = facePartAns.toString();
	
	if (a===b){
		pushNextAction(711);
	}
	else{
		pushNextAction(721);
	}
}


//========================= ~ Music Keypad Puzzle ~ ========================//

function initDoorPuzzle(){
	
	inputAnswer = [0, 0, 0, 0, 0, 0];
	correctAnswer = [1, 6, 5, 3, 3, 7]
	
	//create puzzle
	
	var doorPuzzleWrap = document.createElement("div"); 
	doorPuzzleWrap.id = "doorPuzzleWrap";
	doorPuzzleWrap.style.zIndex = 100;
	gameWindow.appendChild(doorPuzzleWrap);
	
	//create counters
	for(var i=1; i<7; i++){
		addDoorPuzzleCounters(i);
	}
	
	var doorPuzzleAnswer = document.createElement("div"); 
	doorPuzzleAnswer.id = "doorPuzzleAnswer";
	doorPuzzleAnswer.setAttribute("class", "doorPuzzleCounter");
	doorPuzzleAnswer.style.zIndex = 100;
	doorPuzzleWrap.appendChild(doorPuzzleAnswer);
	
	//create counter lights
	
	for(var x = 1; x < 7; x++){
		var currentCounter = document.getElementById("doorPuzzleCounter" + x);

		for(var y = 1; y < 8; y++){		
			var doorPuzzleLight = document.createElement("div"); 
			doorPuzzleLight.id = "doorPuzzleLight"+ x + "." + y;
			doorPuzzleLight.setAttribute("class", "doorPuzzleLight");
			doorPuzzleLight.style.zIndex = 100;
			currentCounter.appendChild(doorPuzzleLight);
		}
	}		
	
	//create answer checker bar
	
	var doorPuzzleButtonWrap = document.createElement("div"); 
	doorPuzzleButtonWrap.id = "doorPuzzleButtonWrap";
	doorPuzzleButtonWrap.style.zIndex = 100;
	doorPuzzleWrap.appendChild(doorPuzzleButtonWrap);

	//create buttons
	for(var i=1; i<7; i++){
		addDoorPuzzleButtons(i);
	}
	
	var doorPuzzleButton7 = document.createElement("div"); 
	doorPuzzleButton7.id = "doorPuzzleButton7";
	doorPuzzleButton7.setAttribute("class", "doorPuzzleButton");
	doorPuzzleButton7.style.zIndex = 100;
	doorPuzzleButtonWrap.appendChild(doorPuzzleButton7);
	doorPuzzleButton7.addEventListener("click", function(){checkDoorAnswer();}, false);
	
	var puzzlecover = document.createElement("div"); 
	puzzlecover.id = "puzzlecover";
	puzzlecover.style.zIndex = 19;
	doorPuzzleWrap.appendChild(puzzlecover);
	
	var backbutton = document.createElement("div"); 
		backbutton.id = "backbutton";
		backbutton.setAttribute("class", "backbutton");
		backbutton.style.width = "150px";
		backbutton.style.height = "150px";
		
		gameWindow.appendChild(backbutton);
		backbutton.addEventListener("click", function(){exitDoorPuzzle();}, false);	 
	
	//create sounds array
	var soundPath = "./sound/";
	var doorPuzzleSounds = [
     {src:"tone0.mp3", id:"tone0"},
     {src:"tone1.mp3", id:"tone1"},
     {src:"tone2.mp3", id:"tone2"},
	 {src:"tone3.mp3", id:"tone3"},
     {src:"tone4.mp3", id:"tone4"},	 
     {src:"tone5.mp3", id:"tone5"},	 
	 {src:"tone6.mp3", id:"tone6"},
	 {src:"tone7.mp3", id:"tone7"},
	 {src:"unlock.mp3", id:"unlock"},
	 {src:"solution.mp3", id:"solution"},
	];
	
	createjs.Sound.registerSounds(doorPuzzleSounds, soundPath);
}

function addDoorPuzzleCounters(id){
	var doorPuzzleCounter = document.createElement("div"); 
	doorPuzzleCounter.id = "doorPuzzleCounter"+ id;
	doorPuzzleCounter.setAttribute("class", "doorPuzzleCounter");
	doorPuzzleCounter.style.zIndex = 100;
	doorPuzzleWrap.appendChild(doorPuzzleCounter);
}

function addDoorPuzzleButtons(id){
	var doorPuzzleButton = document.createElement("div"); 
	doorPuzzleButton.id = "doorPuzzleButton" + id;
	doorPuzzleButton.setAttribute("class", "doorPuzzleButton");
	doorPuzzleButton.style.zIndex = 100;
	doorPuzzleButtonWrap.appendChild(doorPuzzleButton);
	doorPuzzleButton.addEventListener("click", function(){addBeep(id - 1);}, false);
}

function addBeep(count){
	//add one to array counter
	inputAnswer[count]++;

	//because arrays start at 0 but the buttons start at 1
	 counterPointer = count + 1;
	 currentCounter = document.getElementById("doorPuzzleCounter" + counterPointer);
	 currentLight = document.getElementById("doorPuzzleLight" + counterPointer + "." +  (8 - inputAnswer[count]));
	
	if(inputAnswer[count] < 8){
		currentLight.style.backgroundColor = "green";
		createjs.Sound.play("tone" + inputAnswer[count]);
	}
	else{
		//set array entry to 0
		inputAnswer[count] = 0;
		//spawn non-click overlay
		createPreventOverlay();
		//recursively unlight the lights
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + counterPointer + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					createjs.Sound.play("tone" + i);
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg
		setTimeout(removePreventOverlay, 1200);
	}

}

function checkDoorAnswer(){
	answerSpeaker = document.getElementById("doorPuzzleAnswer");
	answerSpeaker.style.backgroundColor= "yellow";
	var solution = createjs.Sound.play("solution");	
	playCounter = 0;
	createPreventOverlay();
	setTimeout(removePreventOverlay, 4200);
	setTimeout(unlockDoor, 3500);
	solution.on("complete", getAnswer);
}

function getAnswer(){
	answerSpeaker.style.backgroundColor= "purple";
	playCode = setInterval(playAnswer, 250);
}

function playAnswer(){
	if (playCounter < 6){
		//play sound
		//alert(playCounter);
		createjs.Sound.play("tone" + inputAnswer[playCounter]);
		// Call the loop again, and pass it the current value of i
	playCounter++;
	highlightCounter(playCounter);
	}
	else{
		clearInterval(playCode);
	}
}

function highlightCounter(n){
	highlight = document.getElementById("doorPuzzleCounter" + n);
	highlight.style.backgroundColor = "yellow";
	setTimeout(unhighlightCounter, 100);
}

function unhighlightCounter(){
	highlight.style.backgroundColor = "DimGrey";
}

function unlockDoor(){
	
	var a = inputAnswer.toString();
	var b = correctAnswer.toString();
console.log();
	if(a===b){
		poweron = true;
		createjs.Sound.play("unlock");
	}
	else{
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 1 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					createjs.Sound.play("tone" + i);
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg
	
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 2 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg		
	
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 3 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg		
	
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 4 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg		
	
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 5 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg		
	
		(function removeLights (i) {
			setTimeout(function () {
				// If i > 0, keep going
				if (--i) {          
					//turn off light
					var turnofflight = document.getElementById("doorPuzzleLight" + 6 + "." + (8-i));
					turnofflight.style.backgroundColor = "red";
					// Call the loop again, and pass it the current value of i
					removeLights(i);       
				}
			}, 100);
		})(8);	//original value of i arg		
	
		inputAnswer = [0, 0, 0, 0, 0, 0];
	}
}

function exitDoorPuzzle(){
	gameWindow.removeChild(doorPuzzleWrap);
	gameWindow.removeChild(backbutton);
	initReceptionRoom();
	lastLoc = 700;
	initInventory();
	
}
//========================= ~ SideScroller Minigame  ~ ========================//

function initParallaxScene (){

	//create parallax background
	spawnParallax();
	parallax();
	animateParallax = setInterval(parallax, 1);
}

function spawnParallax(){
	
	//create loop 1

	var bg1p1 = document.createElement("img"); 
	bg1p1.id = "bg1p1";
	bg1p1.style.zIndex = 10;
	bg1p1.setAttribute("class", "parabg");
	bg1p1.setAttribute("src", "assets/bg1p1.png");
	gameWindow.appendChild(bg1p1);
	
	var bg1p2 = document.createElement("img"); 
	bg1p2.id = "bg1p2";
	bg1p2.style.zIndex = 20;
	bg1p2.setAttribute("class", "parabg");
	bg1p2.setAttribute("src", "assets/bg1p2.png");
	gameWindow.appendChild(bg1p2);
	
	var bg1p3 = document.createElement("img"); 
	bg1p3.id = "bg1p3";
	bg1p3.style.zIndex = 30;
	bg1p3.setAttribute("class", "parabg");
	bg1p3.setAttribute("src", "assets/bg1p3.gif");
	gameWindow.appendChild(bg1p3);
	
	var bg1p4 = document.createElement("img"); 
	bg1p4.id = "bg1p4";
	bg1p4.style.zIndex = 40;
	bg1p4.setAttribute("class", "parabg");
	bg1p4.setAttribute("src", "assets/bg1p4.png");
	gameWindow.appendChild(bg1p4);
	
	//create loop 2

	var bg1p1dos = document.createElement("img"); 
	bg1p1dos.id = "bg1p1dos";
	bg1p1dos.style.zIndex = 10;
	bg1p1dos.setAttribute("class", "parabg");
	bg1p1dos.setAttribute("src", "assets/bg1p1.png");
	gameWindow.appendChild(bg1p1dos);
	document.getElementById("bg1p1dos").style.left = "3072px";

	var bg1p2dos = document.createElement("img"); 
	bg1p2dos.id = "bg1p2dos";
	bg1p2dos.style.zIndex = 20;
	bg1p2dos.setAttribute("class", "parabg");
	bg1p2dos.setAttribute("src", "assets/bg1p2.png");
	gameWindow.appendChild(bg1p2dos);
	document.getElementById("bg1p2dos").style.left = "3072px";

	var bg1p3dos = document.createElement("img"); 
	bg1p3dos.id = "bg1p3dos";
	bg1p3dos.style.zIndex = 30;
	bg1p3dos.setAttribute("class", "parabg");
	bg1p3dos.setAttribute("src", "assets/bg1p3.gif");
	gameWindow.appendChild(bg1p3dos);
	document.getElementById("bg1p3dos").style.left = "3072px";

	bg1p4dos = document.createElement("img"); 
	bg1p4dos.id = "bg1p4dos";
	bg1p4dos.style.zIndex = 40;
	bg1p4dos.setAttribute("class", "parabg");
	bg1p4dos.setAttribute("src", "assets/bg1p4.png");
	gameWindow.appendChild(bg1p4dos);
	document.getElementById("bg1p4dos").style.left = "3072px";
	
	//create player char
	
	var orange = document.createElement("img"); 
	orange.id = "orange";
	orange.style.zIndex = 100;
	orange.setAttribute("src", "assets/walk.gif");
	gameWindow.appendChild(orange);
	
	
}

function parallax (){

	//set up variables
	one = document.getElementById("bg1p1")
	two = document.getElementById("bg1p2");
	three = document.getElementById("bg1p3");
	four = document.getElementById("bg1p4");
	oneloop = document.getElementById("bg1p1dos");
	twoloop = document.getElementById("bg1p2dos");
	threeloop = document.getElementById("bg1p3dos");
	fourloop = document.getElementById("bg1p4dos");
	
	//set location to pointers
	one.style.left = p1 + "px";
	two.style.left = p2 + "px";
	three.style.left = p3 + "px";
	four.style.left = p4 + "px";

	//make loop location pointer + width
	oneloop.style.left = (p1 + 3072) + "px";
	twoloop.style.left = (p2 + 3072) + "px";
	threeloop.style.left = (p3 + 3072) + "px";
	fourloop.style.left = (p4 + 3072) + "px";
	
	//movement speed
	p1 -= .1;
	p2 -= .5;
	p3 -= 1;
	p4 -= 2;

	//reset pointers after loop
	if(p1 < -3072){
		p1 = 0;
	}
	else if(p2 < -3072){
		p2 = 0;
	}
	else if(p3 < -3072){
		p3 = 0;
	}
	else if(p4 < -3072){
		p4 = 0;
	}

	
}

//=========================== ~ SCRIPT ~ =================================//

function setDialogue(d){
 
 //empty array
 lines = new Array();
 speaker = new Array();

 //assign new lineset
	if (d == 1){
		lines[0] = "Dat wont wurk...";
	}
	else if (d == 2){
		lines[0] = "I kan't git over dere...";
	}
	else if (d == 3){
		lines[0] = "It's too skary in dere...";
	}
	else if(d == 101){
		lines[0] = "Hmmmm...";
		lines[1] = "I think...";
		lines[2] = "And there four...";
		lines[3] = "I am?";
	}
	else if(d == 102){
		lines[0] = "Woah...";
	}

	else if(d == 200){
		lines[0] = "I could prolly get over dat sumhow...";
	}
	else if(d == 202){
		lines[0] = "I could prolly get over dat sumhow...";
	}

	else if(d == 300){
		lines[0] = "Wowee, a fruit! I'll put it in the inventory.";
	}
	else if(d == 501){
		lines[0] = "It sez....";
		lines[1] = "1#$%6%^5!$#][*^%&$][&*#^#7";
	}
	else if(d == 610){
		lines[0] = "Ahhhh, that's better. You did it!!";
		lines[1] = "Thank you Bardo, for restoring my power.";
		lines[2] = "This is the part where I would let you through the door...";
		lines[3] = "But....";
		lines[4] = "I just can't.";
		lines[5] = "You see Bardo, the reality you inhabit is comprised of javascript programming...";
		lines[6] = "And this faction of reality is simply a tech demo....";
		lines[7] = "Pro-gra-meeng?? Tek dem-oh?";
		lines[8] = "Yes, Bardo. This faction of reality took the all-powerful creator immense amounts of time and energy to create.";
		lines[9] = "Bardo... It was just an experiment.";
		lines[10] = "I can see past this door to your left, and your adventure continues...";
		lines[11] = "But for that, the creator requires a monetary profit.";
		lines[12] = "For now, send your fan mail to hunter.m.wells@gmail.com";
		lines[13] = "Wut duz dat meen?";
		lines[14] = "Worry not, Bardo. Thank you for playing!";
	}
	else if(d == 620){
		lines[0] = "Hello, Bardo. And welcome back to existence.";
		lines[1] = "Hooo arr yew?";
		lines[2] = "I am Olmec. I have awakened you again, for I require assistance.";
		lines[3] = "....Ay-sis-anz?";
		lines[4] = "That's right, Bardo. You are the savior of this realm. When there is a a dire problem, I awaken you and send you across the tides of reality to solve it.";
		lines[5] = "This realm exists outside of time and space. In this land of wonder and amazement, there exists only a lattice of peace.";
		lines[6] = "Until.... ";
		lines[7] = "the forces of chaos disrupt the balance of essential good.";
		lines[8] = "This is why I have awakened you again, Bardo.";
		lines[9] = "You must save the day again!!";
		lines[10] = "Through this door to your left, lies a path to the entirety of existence.";
		lines[11] = "You must go forth, and restore the lattice of peace....";
		lines[12] = "Or else all of reality will desintigrate into chaos.";
		lines[13] = "But before the door can open, you must restore power to my facility.";
		lines[14] = "Go and restore my power. Then, return to me, for your adventure awaits.....";
	}
	else if(d == 630){
		lines[0] = "Hello again, Bardo.";
		lines[1] = "It seems that my power has not been restored.";
		lines[2] = "Restore my power and return to me, for your adventure awaits.....";
	}
	
	else if(d == 701){
		lines[0] = "To pass, you must show that you are worthy.";
		lines[1] = "Show us face of the worshipped and you may pass.";
	}
	else if(d == 711){
		lines[0] = "Come back later. You must first recieve your mission.";
		lines[1] = "Be gone.";
	}
	else if(d == 721){
		lines[0] = "Praise be to the almighty. You truly must be Bardo the Savior.";
		lines[1] = "You may pass.";
	}
	//assign new speaker
	
	if (d == 1){
		speaker[0] = "Bardo"
	}
	else if (d == 2){
		speaker[0] = "Bardo"
	}
	else if (d == 3){
		speaker[0] = "Bardo"
	}
	else if(d == 101){
		speaker[0] = "Bardo";
		speaker[1] = "Bardo";
		speaker[2] = "Bardo";
		speaker[3] = "Bardo";
	}
	else if(d == 102){
		speaker[0] = "Bardo";
		speaker[1] = "Bardo";
		speaker[2] = "Bardo";
		speaker[3] = "Bardo";
	}

	else if(d == 200){
		speaker[0] = "Bardo";
		speaker[1] = "Bardo";
		speaker[2] = "Bardo";
	}
	else if(d == 202){
		speaker[0] = "Bardo";
	}

	else if(d == 300){
		speaker[0] = "Bardo";
	}
	else if(d == 501){
		speaker[0] = "Bardo";
		speaker[1] = "Bardo";
	}
	else if(d == 610){
		speaker[0] = "Olmec";
		speaker[1] = "Olmec";
		speaker[2] = "Olmec";
		speaker[3] = "Olmec";
		speaker[4] = "Olmec";
		speaker[5] = "Olmec";
		speaker[6] = "Olmec";
		speaker[7] = "Bardo";
		speaker[8] = "Olmec";
		speaker[9] = "Olmec";
		speaker[10] = "Olmec";
		speaker[11] = "Olmec";
		speaker[12] = "Olmec";
		speaker[13] = "Bardo";
		speaker[14] = "Olmec";
	}
	else if(d == 620){
		speaker[0] = "Olmec";
		speaker[1] = "Bardo";
		speaker[2] = "Olmec";
		speaker[3] = "Bardo";
		speaker[4] = "Olmec";
		speaker[5] = "Olmec";
		speaker[6] = "Olmec";
		speaker[7] = "Olmec";
		speaker[8] = "Olmec";
		speaker[9] = "Olmec";
		speaker[10] = "Olmec";
		speaker[11] = "Olmec";
		speaker[12] = "Olmec";
		speaker[13] ="Olmec";
		speaker[14] = "Olmec";
	}
	else if(d == 630){
		speaker[0] = "Olmec";
		speaker[1] = "Olmec";
		speaker[2] = "Olmec";
	}
	else if(d == 701){
		speaker[0] = "Sentinel One";
		speaker[1] = "Sentinel Two";
	}
	else if(d == 711){
		speaker[0] = "Sentinel One";
		speaker[1] = "Sentinel  Two";
	}
	else if(d == 721){
		speaker[0] = "Sentinel One";
		speaker[1] = "Sentinel  Two";
	}
}


//=========================== ~ DIALOGUE SYSTEM ~ =================================//
	
function spawnDialogueBox(){

	//Make textbox
	var textbox = document.createElement("div"); 
	textbox.id = "textbox";
	textbox.style.zIndex = 5000;
	gameWindow.appendChild(textbox);


	//Put wrapper inside of it	
	var textwrap = document.createElement("div");
	textwrap.id = "textwrap";
	textbox.style.zIndex = 5100;
	document.getElementById("textbox").appendChild(textwrap);
	$('#textwrap').addClass("normal");
	
	//call it wrap	
	wrap = document.getElementById("textwrap");

	createPreventOverlay();
	spawnDialogueboxElements();
}
	
function spawnDialogueboxElements(){
	
	//make div for name
	var name = document.createElement("div");
	name.id = "name";
	wrap.appendChild(name);
	
	//append namediv with text	
	name.appendChild(document.createTextNode(speaker[speakerid] + ":"));
	
	//append break after name
	var br = document.createElement("br");
	wrap.appendChild(br);
	//indent
	for (i = 0; i < 4; i++) {
	wrap.appendChild(document.createTextNode("\u00A0"));
	}
	//setup currline variable --- "lines" is the name of the array holding the current conversation.
	currline = lines[lineid];

	//make next button and listen
	var next = document.createElement("div");
	next.id = "next";
	wrap.appendChild(next);
	next.appendChild(document.createTextNode("Next >>"));
	next.style.visibility = "visible";
	next.addEventListener("click", completeLine);

	//make next button blink
	blinker();
	
	//call sayline at this speed
	read = setInterval(sayline, readSpeed);
}

function blinker() {
        if(document.getElementById("next"))
        {
            var d = document.getElementById("next") ;
            d.style.color = (d.style.color == 'black'?'white':'black');
            blinkLoop = setTimeout(blinker, 500);
        }
    }
	
function sayline(){



	if(c < currline.length){
		
		//append text node for each char of currline string
		wrap.appendChild(document.createTextNode(currline[c]));
		c++;
	} 
	
	else {
		
		//change completeLine button to nextDia button
		next.removeEventListener("click", completeLine);
		next.addEventListener("click", nextDia);
		//reset c
		c = 0;
		//stop
		clearInterval(read);
		//reset readSpeed
		readSpeed = 60;
	}			
}

function completeLine(){
	
	if(c < currline.length){
		//stop current sayline
		clearInterval(read);
		//start it again faster
		readSpeed -= 60;
		read = setInterval(sayline, readSpeed);
	} 
	else {
		//then reset it after the line is done
		readSpeed += 60;
		}			
}

function nextDia(){
	
	if (lineid < lines.length - 1){
			
		//clear current line
		wrap.innerHTML = "";
		//select next line
		lineid++;
		//select next speaker
		speakerid++;
		//stop the blink
		clearInterval(blinkLoop);
		//spawn the next line and elements
		spawnDialogueboxElements();
	}
	else{
		removePreventOverlay();
		gameWindow.removeChild(textbox);	
		
		//reset line array pointer
		lineid = 0;

		//reset speaker array pointer
		speakerid = 0;
		
		//advance the plot
		plotId++;
		nextAction();
	}
	
}


//=========================== ~ SOUND ~ =================================//

var soundID = "thunder";

function loadSound () {
  createjs.Sound.registerSound("sound/thunder.mp3", soundID);
}

function playSound () {
  createjs.Sound.play("tone0");
}