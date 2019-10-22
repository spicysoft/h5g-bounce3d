// Liberapp 2019 - Tahiti Katagai
// プレイヤー ボール

class Player extends GameObject{

    static I:Player = null;

    // get x():number { return this.display.x; }
    // get y():number { return this.display.y; }
    // set x( x:number ){ this.display.x = x; }
    // set y( y:number ){ this.display.y = y; }

    x:number;
    y:number;
    z:number;
    vz:number = 0;
    radius:number;
    ball3d:Ball3D = null;
    buttonOffsetX:number = 0;

    button:Button = null;
    state:()=>void = this.stateNone;

    constructor() {
        super();

        Player.I = this;
        
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.vz = Util.w(PLAYER_SPEED_Z_PER_W);
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.ball3d = new Ball3D( this.x, this.y, this.z, this.radius, PLAYER_COLOR );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.ball3d.destroy();
        this.button.destroy();
        Player.I = null;
    }

    update(){
        this.state();
        this.ball3d.perspective( this.x, this.y, 0 );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
        this.buttonOffsetX = this.x - this.button.x;
    }
    stateRun() {
        // controll x
        if( this.button.press ){
            this.buttonOffsetX = this.x - this.button.x;
        }
        else{
            const sensitivity = 2.5;
            let vx = this.button.x + this.buttonOffsetX - this.x;
            const rangeW = Util.w(1) - this.radius;
            this.x = Util.clamp( this.x + vx * sensitivity, -rangeW, +rangeW );
            this.buttonOffsetX = this.x - this.button.x;
            Ball3D.centerX = -this.x * 0.5;
            Camera2D.x = Util.w(-0.5) + this.x * 0.5;
        }

        // progress z
        this.z += this.vz;
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        this.state = this.stateMiss;
        new EffectCircle( this.x, this.y, this.radius, PLAYER_COLOR );
        EffectLine.create( this.x, this.y, this.radius, PLAYER_COLOR, 8 );
    }
    stateMiss(){
    }
}