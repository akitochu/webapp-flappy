// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score1 = -5;
var score2 = -5;
var labelScore;
var labelScore2;
var player;
var player2;
var pipes = [];
var isPlayer1Dead = false;
var isPlayer2Dead = false;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/gusto.png");
    game.load.image("castle", "../assets/Bowser's_castle.png");
    game.load.image("ghost", "../assets/ghost.gif");
game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe","../assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    var background = game.add.image(0,0, "castle");
    background.width = 790;
    background.height = 400;
    game.add.text(10, 10, "Que Pasa!",
        {font: "30px Arial", fill: "#CCCCFF"});
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player2 = game.add.sprite(100, 40, "ghost");
    player2.scale.x = 0.4;
    player2.scale.y = 0.4;
    game.physics.arcade.enable(player2);
    player2.body.gravity.y = 1000;
    player = game.add.sprite(300, 210, "playerImg");
    game.physics.arcade.enable(player);
  // player.body.velocity.x = 100;
    player.scale.x = 0.035;
    player.scale.y = 0.035;
    player.body.gravity.y = 1000;
    //game.input
     //   .onDown
       // .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    //alert(score);
    labelScore = game.add.text(700, 10, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
    labelScore2 = game.add.text(600, 10, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
   // changeScore();
    //alert(score);
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
    generatePipe();
    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);

}

function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count=0; count<8; count=count+1) {
        if(count != gapStart && count != gapStart + 1 && count != gapStart +2) {
            addPipeBlock(700, count * 50);
        }
    }
    changeScore()
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade
        .overlap(player,
    pipes,
    gameOver1);
    if (player.y > 400)
        gameOver1()
    game.physics.arcade
        .overlap(player2,
        pipes,
        gameOver2);
    if (player2.y > 400)
        gameOver2()


}


function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
    if (isPlayer1Dead == false)
        score1 = score1 + 5;


    if (isPlayer2Dead == false)
        score2 = score2 + 5;

    labelScore.setText(score1.toString());
    labelScore2.setText(score2.toString());
}

function moveRight() {
    player.x = player.x + 5;
}

function moveLeft() {
    player.x = player.x - 2;
}

function moveRight2() {
    player2.x = player2.x + 10
}

function moveLeft2() {
    player2.x = player2.x - 10
}

function moveUp2() {
    player2.body.velocity.y = - 350;
}

function moveDown2() {
    player2.y = player2.y + 10
}

function moveUp() {
    player.body.velocity.y = - 350;
}


function gameOver1() {

    isPlayer1Dead = true;
    player.kill();

    if(isPlayer1Dead && isPlayer2Dead) {
        game.destroy();
    }

}

function gameOver2() {

    isPlayer2Dead = true;
    player2.kill();

    if(isPlayer1Dead && isPlayer2Dead) {
        game.destroy();
    }

}
//
//function gameOver() {
//
//    if(player1Dead && player)
//
//    game.destroy();
//    alert("Game Over");
// //   location.reload();
//}


