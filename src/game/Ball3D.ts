// Liberapp 2019 - Tahiti Katagai
// 3Dボール表示クラス

const SHADOW_SY = 0.5;
const SHADOW_1_SY = 1/SHADOW_SY;

class Ball3D {

    static centerX:number;
    static centerY:number;

    sphere:egret.Shape = null;
    shadow:egret.Shape = null;

    static initial(){
        Ball3D.centerX = 0;
        Ball3D.centerY = Util.w(CAM_PERS_Y_PER_W);
    }

    constructor( x:number, y:number, z:number, radius:number, color:number ) {

        this.setDisplay( x, y, radius, color );
    }

    destroy(){
        if( this.sphere ){
            this.sphere.parent.removeChild(this.sphere);
            this.sphere = null;
            this.shadow.parent.removeChild(this.shadow);
            this.shadow = null;
        }
    }

    setDisplay( x:number, y:number, radius:number, color:number ){
        this.sphere = new egret.Shape();
        this.shadow = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.sphere, 0 );
        GameObject.gameDisplay.addChildAt(this.shadow, 0 );

        this.sphere.graphics.beginFill( color );
        this.sphere.graphics.drawCircle( 0, 0, radius );
        this.sphere.graphics.endFill();

        this.shadow.graphics.beginFill( SHADOW_COLOR );
        this.shadow.graphics.drawCircle( 0, radius*SHADOW_1_SY, radius );
        this.shadow.graphics.endFill();
    }

    setAlpha( alpha:number ){
        this.sphere.alpha =
        this.shadow.alpha = alpha;
    }

    setShapeFront(){
        this.sphere.parent.removeChild(this.sphere);
        GameObject.gameDisplay.addChild(this.sphere);
    }

    perspective( x:number, y:number, z:number ){

        const shadowRangeY = Ball3D.centerY * 0.25;
        const shadowScale = Util.clamp( (y + shadowRangeY) / shadowRangeY, 0, 1 );
        
        x += Ball3D.centerX;
        y += Ball3D.centerY;
        z = z + Util.w(0.25);
        z = z / Util.w(0.25);
        let rpcZ = 1/z;
        x = x * rpcZ;
        y = y * rpcZ;
        this.sphere.x = x - Ball3D.centerX;
        this.sphere.y = y - Ball3D.centerY;
        this.sphere.scaleX =
        this.sphere.scaleY = rpcZ;

        // shadow on the floor
        y = Ball3D.centerY;
        y = y * rpcZ;
        this.shadow.x = this.sphere.x;
        this.shadow.y = y - Ball3D.centerY;
        rpcZ = rpcZ * shadowScale;
        this.shadow.scaleX = rpcZ;
        this.shadow.scaleY = rpcZ * SHADOW_SY;
    }
}
