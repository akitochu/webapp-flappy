// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game;// = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score1 = -5;
var score2 = -5;
var labelScore;
var labelScore2;
var player1Name;
var player2Name;
var player;
var player2;
var pipes = [];
var bullet = [];
var isPlayer1Dead = false;
var isPlayer2Dead = false;
var randomNumber;
var stars = [];
var gusto = [];
var background;
var backgroundback;
var scoreIsFourty = false;
var scoreIsEighty = false;
var Iwantgusto = true;
var Iwantgusto2 = true;

/*
 * Loads all resources for the game and gives them names.
 */



jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#fullName1").val() + (" and ") + jQuery("#fullName2").val() ;
    var greeting_message = greeting + name;
    jQuery("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + "</p>" );

});


jQuery("#start").click(function() {
    game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
    jQuery("#start").remove();
});

function preload() {
game.load.image("playerImg", "../assets/gghost.png");
    game.load.image("castle", "../assets/Bowser's_castle.png");
    game.load.image("ghost", "../assets/ghost.gif");
game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe","../assets/pipe.png");
    game.load.image("bullet","../assets/bulletbill.png");
    game.load.image("stars", "../assets/star.png");
    game.load.image("gusto", "../assets/gusto.gif");
    game.load.image("bgnew", "../assets/Desert Scene.jpg")
    game.load.image("bgnewnew", "../assets/starsky.jpg")


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    var backgroundbackback = game.add.image(0,0, "bgnewnew");
    backgroundbackback.width = 790;
    backgroundbackback.height = 400;

    var backgroundback = game.add.image(0,0, "bgnew");
    backgroundback.width = 790;
    backgroundback.height = 400;

    background = game.add.image(0,0, "castle");
    background.width = 790;
    background.height = 400;


    game.physics.startSystem(Phaser.Physics.ARCADE);
    player2 = game.add.sprite(100, 0, "ghost");
    player = game.add.sprite(300, 0, "playerImg");
    player2.scale.x = 0.43;
    player2.scale.y = 0.43;

    game.physics.arcade.enable(player2);
    player2.body.gravity.y = 1000;
    game.physics.arcade.enable(player);
  // player.body.velocity.x = 100;
    player.scale.x = 0.43;
    player.scale.y = 0.43;
    player.body.gravity.y = 1000;
    //game.input
     //   .onDown
       // .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
   // alert(score);
    labelScore = game.add.text(700, 10, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
    labelScore2 = game.add.text(150, 10, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
    player2Name = game.add.text(90, 10, "Boo",
        {font: "16px Arial", fill: "#FFFFFF"});
    player1Name = game.add.text (640, 10, "Slimer",
        {font: "16px Arial", fill: "#FFFFFF"});


    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.D)
        .onDown.add(moveRight2);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.A)
        .onDown.add(moveLeft2);
    game.input.keyboard.addKey(Phaser.Keyboard.W)
        .onDown.add(moveUp2);
    game.input.keyboard.addKey(Phaser.Keyboard.S)
        .onDown.add(moveDown2);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);





    generatePipe();
    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);

    //generateBullets();
    Interval = 3;
    game.time.events
        .loop(Interval * Phaser.Timer.SECOND,
        generateRandomBullets);

    //bulletInterval = randomNumber;
  //  game.time.events
    //    .loop(bulletInterval * Phaser.Timer.SECOND,
      //  ) ;

}

function generateRandomBullets(){
    randomNumber = game.rnd.integerInRange(1,10);
    console.log(randomNumber);
    if(randomNumber >3){
        generateBullets();
    }
}


function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count=0; count<8; count=count+1) {
            if(count != gapStart && count != gapStart + 1 && count != gapStart +2) {
            addPipeBlock(800, count * 50);

        }
    }
    addStar(752, gapStart * 50 );
    console.log("GapStart"+ gapStart);

}

function generateGusto(){
    var posx = 800;//game.rnd.integerInRange(500, 790);
    var posy = 200;game.rnd.integerInRange(1, 400);

    var bonus = game.add.sprite(posx, 100, "gusto");
    gusto.push(bonus);
    bonus.scale.x = 0.05;
    bonus.scale.y = 0.05;
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -200;//game.rnd.integerInRange(6,10);
   // bonus.body.velocity.y = -game.rnd.integerInRange(6,10);
}

function generateBullets(){
    var randomY = game.rnd.integerInRange(10,350);
    var bonus = game.add.sprite(1500, randomY, "bullet");
    bonus.scale.x = 0.2;
    bonus.scale.y = 0.2;
    bullet.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 400;
   // bonus.body.velocity.y = - game.rnd.integerInRange(60,100);
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -250;

}

function addStar(x, y){
    var star = game.add.sprite(x, y, "stars");
    star.scale.x = .0000000000000000000000000000000000000000000000000000000000000000000000001
    star.scale.y = 3
    console.log("star");
    stars.push(star);
    game.physics.arcade.enable(star);
    star.body.velocity.x = -250;
}

//function addBullet() {
    //var bulletBill = game.add.sprite(700,randomy, "bullet");
  //  bullet.push(bulletBill);
   // game.physics.arcade.enable(bulletBill);
   // bulletBill.body.velocity.x = -400;
//}


function ChangeBackground(){
    //gusto.kill();
    background.destroy();



}
function ChangeChangeBackground(){
    background.destroy();
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    if (scoreIsFourty && Iwantgusto == true){
        generateGusto();
        Iwantgusto = false;
    }
    if (scoreIsEighty && Iwantgusto2 == true){
        generateGusto();
        Iwantgusto2 = false;
    }

    for (var index = 0; index < pipes.length; index++) {
        game.physics.arcade
            .overlap(player,
            pipes[index],
            gameOver1);
    }


    for (var index = 0; index < pipes.length; index++) {
        game.physics.arcade
            .overlap(player2,
            pipes[index],
            gameOver2);
    }

    game.physics.arcade
        .overlap(player,
        gusto,
        ChangeBackground);
        if(Iwantgusto2){
            ChangeChangeBackground
        }

    game.physics.arcade
        .overlap(player2,
        gusto,
        ChangeBackground);
        if(Iwantgusto2){
            ChangeChangeBackground
        }

    if (player.y > 430)
        gameOver1();

    if (player.y < -30)
        gameOver1();


    if (player2.y > 430)
        gameOver2();

    if (player2.y < -30)
        gameOver2();

    for (var index = 0; index < bullet.length; index++) {
        game.physics.arcade
            .overlap(player,
            bullet[index],
            gameOver1);
    }

    for (var index = 0; index < bullet.length; index++) {
        game.physics.arcade
            .overlap(player2,
            bullet[index],
            gameOver2);
    }
    for (var index = 0; index < stars.length; index++) {
        game.physics.arcade
            .overlap(player,
            stars[index],
            changeScore1);
    }
    for (var index = 0; index < stars.length; index++) {
        game.physics.arcade
            .overlap(player2,
            stars[index],
            changeScore2);
    }


}
function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore1() {
    score1 = stars.length * 5 -5;
    labelScore.setText(score1.toString());
    game.sound.play("score");
    if(score1 == 30){
        scoreIsFourty = true

        }
    if(score1 == 60){
        scoreIsEighty = true;

    }


}
function changeScore2() {
    score2 = stars.length * 5 - 5;
    labelScore2.setText(score2.toString());
    game.sound.play("score");
    if (score2 == 30) {
        scoreIsFourty = true

    }
    if (score2 == 60) {
        scoreIsEighty = true;

    }
}



function moveRight() {
    player.x = player.x + 15;
}

function moveLeft() {
    player.x = player.x - 15;
}


function moveRight2() {
    player2.x = player2.x + 15
}

function moveLeft2() {
    player2.x = player2.x - 15
}

function moveUp2() {
    player2.body.velocity.y = - 350;
}

function moveDown() {
    player.y = player.y + 20;
}

function moveDown2() {
    player2.y = player2.y + 20
}

function moveUp() {
    player.body.velocity.y = - 350;
}


function gameOver1() {

    isPlayer1Dead = true;
    player.kill();
    $("#score").val(score1);
    console.log("Data: ",score1);

    if(isPlayer1Dead && isPlayer2Dead) {
        game.destroy();
        stars = [];


        $("#greeting").show();
        $("#greeting2").show();

    }


}

function gameOver2() {

    isPlayer2Dead = true;
    player2.kill();
    $("#score2").val(score2);
    console.log("Data: ",score2);
    if(isPlayer1Dead && isPlayer2Dead) {

        stars = [];
        game.destroy();


        $("#greeting").show();
        $("#greeting2").show();


    }

}

$.get("/score", function(score){
    score.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < score.length; i++) {
        $("#scoreBoard").append(
            "<li>" +
            score[i].name + ": " + score[i].score +
            "</li>");
    }
});
