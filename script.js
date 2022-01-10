/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const STARTSCHERM = 0;
const EINDSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;

var spelStatus = STARTSCHERM;

var imgadventurine;
var kristalImages = [];

var xbeginK = 460;
var ybeginK = 320;

var spelerX = 0; // x-positie van speler
var spelerY = 800; // y-positie van speler

var vijandX = 0;
var vijandY = 0;
var kristalX = 0;
var kristalY = 0;
var valSnelheid = 5;
var speed = 10;

var A_KEY = 65;
var D_KEY = 68;

var score = 0;

var bomGeraakt = false;

var valObjecten = [];


function preload() {
  kristalImages.push(loadImage('images.kristallen/adventurine.png'));
  kristalImages.push(loadImage('images.kristallen/amethyst.png'));
  kristalImages.push(loadImage('images.kristallen/fluorite.png'));
  kristalImages.push(loadImage('images.kristallen/gemstone.png'));
  kristalImages.push(loadImage('images.kristallen/lapislazuli.png'));
  kristalImages.push(loadImage('images.kristallen/rosequartz.png'));

  imgStartscherm = loadImage('images.kristallen/startscherm.png');
  imgEindscherm = loadImage('images.kristallen/eindscherm.png');

  imgbom = loadImage('images.kristallen/bomb.png');
}




/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

var tekenStartscherm = function() {
  background(41, 1, 5);

  //vakje tekst
  fill(77, 58, 57);
  rect(xbeginK, ybeginK + 160, 400, 140);

  
  // tekst voor de knop
  fill("white");
  textSize(28);
  textFont("Helvetica");
  text("Klik op spatie om te beginnen", xbeginK + 15, ybeginK + 240);

  
   //tekst game (crystal catcher)
   fill("white");
   textSize(45);
   textFont('courier');
   text('Crystal Catcher', 450, 60);

   image(imgStartscherm, 500, 140, 300, 300);
}


var tekenEindscherm = function() {
    background(41, 1, 5);

    fill(77, 58, 57);
    rect(460, 150, 400, 200);

    fill(255,255,255);
    textSize(45);
    text( "GAME OVER", 480, 220);
    text("Your points:" +score, 480, 300);
    

    // vakje tekst
    fill(77, 58, 57);
    rect(xbeginK, ybeginK + 160, 400, 140);
    
    // tekst voor de knop
    fill("white");
    textSize(23);
    textFont("Helvetica");
    text("Klik op enter om opnieuw beginnen", xbeginK + 15, ybeginK + 240);


   //tekst game (crystal catcher)
    fill("white");
    textSize(45);
    textFont('courier');
    text('Crystal Catcher', 450, 60);

    image(imgEindscherm, 200, 320, 80, 80);
    image(imgEindscherm, 1080, 320, 80, 80);
}

 
  




var beweegAlles = function () {
  // vijand
  
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background(61, 58, 57);
  
  // halvce cirkel mijn
  fill(107, 99, 96);
  ellipse(640, 700, 1200, 1200);

  //brokstukken in mijn
  fill(36, 34, 33)
  rect(50, 50, 20, 20);
  rect(70, 90, 20, 20);
  rect(100, 40, 20, 20);
  rect(150, 300, 20, 20);
  rect(130, 250, 20, 20);
  rect(800, 20, 20, 20);
  rect(900, 70, 20, 20);
  rect(600, 40, 20, 20);
  rect(1000, 110, 20, 20);
  rect(400, 10, 20, 20);
  rect(300, 120, 20, 20);
  rect(1180, 400, 20, 20);
  rect(1200, 280, 20, 20);

  //ondergrond
  fill(43, 22, 7);
  rect(0, 700, 1400, 30)

  //afbeeldingen
  image(kristalImages[0], 600, 100, 80, 80);
  image(kristalImages[1], 600, 150, 60, 60);
  image(kristalImages[2], 650, 100, 80, 80);
  image(kristalImages[3], 650, 150, 70, 70);
  image(kristalImages[4], 550, 100, 80, 80);
  image(kristalImages[5], 550, 150, 80, 80);
  image(imgbom, 500, 100, 80, 80);

  //hokje voor teller
  fill('grey');
  rect(1180, 30, 70, 70);

  //tekst game (crystal catcher)
  fill(225, 230, 96);
  textSize(40);
  textFont('courier');
  text('Crystal Catcher', 470, 40);
  
  vijandY = vijandY + 5;

  if (vijandY > 800 ) {
    vijandY = 0;
    vijandX = random (100,1200);
    
    }

  
  
  
  if (score > 10){
    vijandY = vijandY + 10;
  }

  //kristal

  kristalY = kristalY + 5;

  if (kristalY > 800 ) {
    kristalY = 0;
    kristalX = random (100,1200);
    
    }

  if (kristalX >= spelerX - 50 &&
    kristalX <= spelerX + 50 &&
    kristalY >= spelerY -50 &&
    kristalY <= spelerY - 49){
      score = score + 1;
    }
  
  
  if (score > 10){
    kristalY = kristalY + 10;
  }


  // speler
  if (keyIsDown(A_KEY)){
    spelerX = spelerX - speed; 
    }
    if (keyIsDown(D_KEY)){
    spelerX = spelerX + speed; 
    }

    // zorg dat speler op scherm blijft
    if (spelerX > 1250) {
      spelerX = 1250;
  }
  if(spelerX < 23 ){
      spelerX = 23;
  }

  if(spelerY < 16 ){
      spelerY = 16;
  }
  if (spelerY > 670){
      spelerY = 670;
  } 

  


  textSize(50);
  text( "0" + score, 1200, 70);
  fill(255,255,255);

  

  

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten vijanden
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond

  // vijand
  image( imgbom, vijandX, vijandY, 50, 50);
  

  // kristal
  image (kristalImages[0], kristalX, kristalY, 50, 50);
 

  // speler
  fill("silver");
  rect(spelerX -25, spelerY - 25, 100, 50);
  ellipse(spelerX -25, spelerY + 25, 10, 10);
  ellipse(spelerX + 75, spelerY + 25, 10, 10);



  


  

  // punten en health

};

//bom geraakt 
var bomGeraakt = function() {
 
}




/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {

  if (vijandX >= spelerX -50 &&
    vijandX <= spelerX +50 &&
    vijandY >= spelerY -50 &&
    vijandY <= spelerY - 49){
      

      


      return true;

      
    }
  return false;
};

function maakNieuwValObject() {
  var valler = undefined;

  // is het een bom?
  if (random(6) > 5) {
    // maak een bom
    valler = new ValObject(random(50, 1230), random(-100, -40), valSnelheid, imgbom, true);
  }
  else {
    // maak een kristal
    valler = new ValObject(random(50, 1230), random(-100, -40), valSnelheid, random(kristalImages));
  }

  valObjecten.push(valler);
}


/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
 function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  maakNieuwValObject();
  maakNieuwValObject();
  maakNieuwValObject();

}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {

  switch(spelStatus) {
    case STARTSCHERM: 
    tekenStartscherm();

    if(keyIsDown(32)) {
      spelStatus = SPELEN;
    } 
    break;
    
    case SPELEN:
    beweegAlles();

    for(var i = 0; i < valObjecten.length; i++) {
      var valler = valObjecten[i];

      valler.show();
      valler.update();

      // haal objecten met een y > 800 weg uit de array
      if (valler.y > 800) {
        valObjecten.splice(i, 1);
      }

      if (collideRectRect(valler.x, valler.y, 80, 80, spelerX-25, spelerY-25, 100, 50)) {
        console.log("botsing!");
      }
    }



    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    tekenEindscherm();
  }
  if (keyIsDown(13)) {
    window.location.reload(true);
  }
}
