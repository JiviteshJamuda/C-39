class Runner{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
    }

    updateCount(count){
        database.ref('/').update({
            runnerCount:count
        });
    }

    update(){
        var playerIndex = "runners/runner" + this.index;
        database.ref(playerIndex).set({
          name:this.name,
          distance:this.distance
        });
      }

    getCount(){
        var runnerCountRef = database.ref('runnerCount');
        runnerCountRef.on("value",(data)=>{
            runnerCount = data.val();
        });
    }
        
    static getRunnerInfo(){
        var runnerInfoRef = database.ref('runners');
        runnerInfoRef.on("value",(data)=>{
            allRunners = data.val();
        });
    }
}