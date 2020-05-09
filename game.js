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
    }

    play(){
        form.hide();
        Runner.getRunnerInfo()
    }
}