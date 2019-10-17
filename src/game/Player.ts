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
        
        this.x = Util.w(0.5);
        this.y = Util.h(0.5) + Util.w(0.3);
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
    }
    stateRun() {
        // controll x
        if( this.button.press ){
            this.buttonOffsetX = this.x - this.button.x;
        }
        else{
            const rate = 1.25;
            let vx = this.button.x + this.buttonOffsetX - this.x;
            this.x = Util.clamp( this.x + vx * rate, this.radius, Util.width  - this.radius );
            this.buttonOffsetX = this.x - this.button.x;
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