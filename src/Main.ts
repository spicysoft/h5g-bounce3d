// Bounce 3d
// Liberapp 2019 - Tahiti Katagai

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        Util.initial( this );
        GameObject.initial( this.stage );
        // PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();
        Game.loadSceneGamePlay();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        // PhysicsObject.progress();
        GameObject.process();
        Camera2D.process();
        return false;
    }
}

