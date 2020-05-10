class Form{
    constructor(){
        this.title = createElement("h1","Realtime Horizontal Hurdles Game")
        this.nameBar = createInput("Name");
        this.playButton = createButton("Play");
        this.greeting = createElement("h2");
        this.resetButton = createButton("Restart");
    }

    hide(){
        this.title.hide();
        this.nameBar.hide();
        this.playButton.hide();
        this.greeting.hide();
    }

    display(){
        this.title.position(275,100);
        this.nameBar.position(width/2-100,height/2);
        this.playButton.position(width/2-30,height/2+50);
        this.resetButton.position(displayWidth-100,20);

        this.playButton.mousePressed(()=>{
            this.nameBar.hide();
            this.playButton.hide();
            runner.name = this.nameBar.value();
            runnerCount+=1;
            runner.index = runnerCount;
            runner.update();
            runner.updateCount(runnerCount);
            this.greeting.html("Hello  " + runner.name);
            this.greeting.position(width/2-100,300);
        });

        this.resetButton.mousePressed(()=>{
            runner.updateCount(0);
            game.update(0);
        });
    }

}