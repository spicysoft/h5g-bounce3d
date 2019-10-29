// Liberapp 2019 - Tahiti Katagai
// ジャンプ足場

const PAD_SY = 0.375;

enum PadType{
    Fixed,
    SlideR,
    SlideL,
    ZoomIn,
    ZoomOut,
    Rise,
    Fall,
    Total
}

class JumpPad extends GameObject{

    private static pads: JumpPad[] = [];

    type:PadType;
    x:number;
    y:number;
    z:number;
    radius:number;
    step:number = 0;

    constructor( type:PadType, x:number, y:number, z:number ) {
        super();

        JumpPad.pads.push(this);

        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = Util.w( PAD_RADIUS_PER_W );
        this.setDisplay( x, y, this.radius, PAD_COLOR );
        this.display.alpha = 0;
        this.perspective( this.x, this.y, this.z );
    }

    onDestroy(){
        JumpPad.pads = JumpPad.pads.filter( obj => obj != this );
    }

    setDisplay( x:number, y:number, radius:number, color:number ){
        const shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(shape, 0 );

        shape.graphics.beginFill( color );
        shape.graphics.drawCircle( 0, 0, radius );
        shape.graphics.endFill();
    }

    perspective( x:number, y:number, z:number ){

        z = z + Util.w(0.25);
        z = z / Util.w(0.25);
        let rpcZ = 1/z;
        
        x += Ball3D.centerX;
        y += Ball3D.centerY;
        x = x * rpcZ;
        y = y * rpcZ;
        this.display.x = x - Ball3D.centerX;
        this.display.y = y - Ball3D.centerY;
        this.display.scaleX = rpcZ;
        this.display.scaleY = rpcZ * PAD_SY;
    }

    update() {
        let x = this.x;
        let y = this.y;
        let z = this.z - Player.I.z;

        // alpha fade in
        const far = Util.w( FAR_LIMIT_PER_W );
        this.display.alpha = Util.clamp( -(z - far) / (far * 0.2), 0, 1 );

        // move
        let rate = this.getSlideRate( z );
        switch( this.type ){
            case PadType.Fixed:
            this.perspective( x, y, z );
            break;
            case PadType.SlideR:
            x = x + Util.lerp( -Util.w(LANE_WIDTH_PER_W*2), 0, rate );
            this.perspective( x, y, z );
            break;
            case PadType.SlideL:
            x = x + Util.lerp( +Util.w(LANE_WIDTH_PER_W*2), 0, rate );
            this.perspective( x, y, z );
            break;
            case PadType.ZoomIn:
            this.perspective( x, y, z );
            this.display.scaleX *= rate;
            this.display.scaleY *= rate;
            break;
            case PadType.ZoomOut:
            this.perspective( x, y, z );
            rate = 1 - rate;
            this.display.scaleX *= rate;
            this.display.scaleY *= rate;
            if( rate >= 1 ) this.destroy();
            break;
            case PadType.Rise:
            y = y + Util.lerp( Util.w(0.5), 0, rate );
            this.perspective( x, y, z );
            this.display.alpha = rate;
            break;
            case PadType.Fall:
            y = y + Util.lerp( 0, +Util.w(0.5), rate );
            this.perspective( x, y, z );
            this.display.alpha = Util.clamp( this.display.alpha, 0, 1-rate );
            if( rate >= 1 ) this.destroy();
            break;
        }

        // pass away
        if( z <= -Util.w(0.25) ){
            this.destroy();
        }
    }

    getSlideRate( z:number ):number{
        return Util.clamp( -(z - Util.w(1.2)) / Util.w(0.5), 0, 1 );   // z1.2~1.0 to rate0~1
    }

    static detectPad( x:number, z:number ):boolean {        
        let flag = false;
        const r = Util.w(PAD_RADIUS_PER_W);
        const rr = r ** 2;
        JumpPad.pads.forEach( p => {
            let dx = p.x - x;
            let dz = p.z - z;
            if( dz <= r ){
                if( dx**2 <= rr && dz**2 <= rr ){
                    flag = true;
                }
            }
        });
        return flag;
    }
}

