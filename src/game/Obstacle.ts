// Liberapp 2019 - Tahiti Katagai
// 障害物

enum ObsType{
    Fixed,
    SlideR,
    SlideL,
    JumpUp,
    JumpOn,
    Total
}

class Obstacle extends GameObject{

    type:ObsType;
    x:number;
    y:number;
    z:number;
    radius:number;
    step:number = 0;

    ball3d:Ball3D = null;

    constructor( type:ObsType, x:number, y:number, z:number ) {
        super();

        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = Util.w( OBSTACLE_RADIUS_PER_W );
        this.ball3d = new Ball3D( x, y, z, this.radius, OBSTACLE_COLOR );
        this.ball3d.setAlpha( 1/64 );
    }

    onDestroy(){
        this.ball3d.destroy();
        this.ball3d = null;
    }

    update() {
        // alpha fade in
        if( this.ball3d.sphere.alpha < 1 ){
            this.ball3d.setAlpha( this.ball3d.sphere.alpha + 1/64 );
        }

        // move
        let x = this.x;
        let y = this.y;
        let z = this.z - Player.I.z;
        switch( this.type ){
            case ObsType.Fixed: {
                break;
            }
            case ObsType.SlideR: {
                let rate = this.getSlideRate(z);
                x = x + Util.lerp( -Util.w(LANE_WIDTH_PER_W), 0, rate );
                break;
            }
            case ObsType.SlideL: {
                let rate = this.getSlideRate(z);
                x = x + Util.lerp( +Util.w(LANE_WIDTH_PER_W), 0, rate );
                break;
            }
            case ObsType.JumpUp: {
                let rate = Math.abs( Math.sin( ( z / Util.w(2) + 0.5 ) * Math.PI ) );
                y = y - rate * Util.w(0.35);
                break;
            }
            case ObsType.JumpOn: {
                let rate = Math.abs( Math.sin( (z / Util.w(2) ) * Math.PI ) );
                y = y - rate * Util.w(0.35);
                break;
            }
        }
        this.ball3d.perspective( x, y, z );

        // pass the player
        if( this.step == 0 ){
            if( z <= 0 ){
                this.step = 1;
                this.ball3d.setShapeFront();
                // check hit
                let dx = Player.I.x - x;
                let dy = Player.I.y - y;
                if( dx**2+dy**2 < this.radius**2+Player.I.radius**2 ){
                    Player.I.setStateMiss();
                }
            }
        }
        else{
            if( z <= -Util.w(0.25) ){
                this.destroy();
            }
        }
    }

    getSlideRate( z:number ):number{
        return Util.clamp( -(z - Util.w(1.5)) / Util.w(0.5), 0, 1 );   // z1.5~1.0 to rate0~1
    }
}
