var database;
var form,game,runner;
var runnerCount = 0, gameState = 0;
var allRunners;
var runners,runner1,runner2,runner3,runner4;

function setup(){
  database = firebase.database();
  canvas = createCanvas(displayWidth,655);
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  background(200);

  if(runnerCount === 4){
    game.update(1);
  };

  if(gameState === 1){
    clear();
    game.play();
  };

  if(gameState === 2){
    game.end();
  }

  console.log(allRunners);
}