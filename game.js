class Game{
    constructor(){}

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

        runner1 = createSprite(100,150);
        runner2 = createSprite(100,300);
        runner3 = createSprite(100,450);
        runner4 = createSprite(100,600);
        runners = [runner1,runner2,runner3,runner4];
    }

    play(){
        form.hide();
        Runner.getRunnerInfo();

        if(allRunners !== undefined){
            background(rgb(5,219,116));

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

        if(keyIsDown(UP_ARROW) && runner.index !== null){
            runner.distance += 10;
            runner.update();
        };


        if(runner.distance > 500){
            gameState = 2;
        };

        drawSprites();

    }

    end(){
        console.log("GAME ENDED");
    }

}