class Game{
    constructor(){
        this.resetButton; 

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gameState:state
        });
    }

    async start(){
        if(gameState === 0){
            runner = new Runner();
            var runnerCountRef = await database.ref('runnerCount').once("value");
            if(runnerCountRef.exists()){
                runnerCount = runnerCountRef.val();
                runner.getCount();
            };
            form = new Form()
            form.display();
        };

        runner1 = createSprite(100,150,30,60);
        runner2 = createSprite(100,300,30,60);
        runner3 = createSprite(100,450,30,60);
        runner4 = createSprite(100,600,30,60);
        runners = [runner1,runner2,runner3,runner4];

        ground1 = createSprite(1000,310,9999,1);
        ground1.shapeColor = "white";
        ground2 = createSprite(1000,460,9999,1);
        ground2.shapeColor = "white";
        ground3 = createSprite(1000,610,9999,1);
        ground3.shapeColor = "white";
        ground4 = createSprite(1000,760,9999,1);
        ground4.shapeColor = "white";

        runner1.collide(ground1);
    }

    play(){
        form.hide();
        Runner.getRunnerInfo();
        this.resetButton = createButton("Restart");
        this.resetButton.position(displayWidth-100,50);

        if(allRunners !== undefined){
            background(rgb(186,87,74));

            var index = 0;

            var x;
            var y = 125;

            for(var rnr in allRunners){
                index += 1;
                y += 150;

                x = displayWidth + allRunners[rnr].distance;
                runners[index-1].x = x;
                runners[index-1].y = y;

                if(index === runner.index){
                    runners[index-1].shapeColor = "red";
                    camera.position.x = runners[index-1].x;
                    camera.position.y = displayHeight/2+100;
                };

            };

        };

        if(keyIsDown(RIGHT_ARROW) && runner.index !== null){
            runner.distance += 10;
            runner.update();
        };

        if(keyIsDown("space") && runner.index !== null){
            runner.velocityY = -1;
            runner.update();
        };

        if(runner.distance > 500){
            gameState = 2;
        };

        drawSprites();

    }

    end(){
        console.log("GAME ENDED");

        this.resetButton.mousePressed(()=>{
            runner.updateCount(0);
            game.update(0);
        });
    }

}