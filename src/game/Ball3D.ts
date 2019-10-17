// Liberapp 2019 - Tahiti Katagai
// 3Dボール表示クラス

const SHADOW_SY = 0.5;
const SHADOW_1_SY = 1/SHADOW_SY;

class Ball3D {

    sphere:egret.Shape = null;
    shadow:egret.Shape = null;

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
        const floorY = Util.h(0.5 - 0.3) + Util.w(0.3);
        const hover = y - floorY;
        const shadowScale = Util.clamp( hover / Util.w(0.5), 0, 1 );

        z = z + Util.w(0.25);
        z = z / Util.w(0.25);
        let rpcZ = 1/z;
        x = x - Util.w(0.5);
        y = y - Util.h(0.3);
        x = Util.w(0.5) + x * rpcZ;
        y = Util.h(0.3) + y * rpcZ;
        this.sphere.x = x;
        this.sphere.y = y;
        this.sphere.scaleX =
        this.sphere.scaleY = rpcZ;

        // shadow on the floor
        y = Util.h(0.5 - 0.3) + Util.w(0.3);
        y = Util.h(0.3) + y * rpcZ;
        this.shadow.x = x;
        this.shadow.y = y;
        rpcZ = rpcZ * shadowScale;
        this.shadow.scaleX = rpcZ;
        this.shadow.scaleY = rpcZ * SHADOW_SY;
    }
}
