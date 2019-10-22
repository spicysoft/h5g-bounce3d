// Liberapp 2019 - Tahiti Katagai
// 地面描画

class DrawGround extends GameObject{

    constructor() {
        super();

        let shape = new egret.Shape();
        this.display = shape;
        GameObject.baseDisplay.addChildAt( this.display, 1 );

        const centerX = Util.w(0.5);
        const centerY = Util.h(0.5) + Util.w(CAMERA_Y_PER_W);
        const floorY = centerY + Util.w(CAM_PERS_Y_PER_W);
        const roofY = centerY + (centerY - floorY);

        shape.graphics.lineStyle(2, 0x606080);
        shape.graphics.moveTo( 0, centerY );
        shape.graphics.lineTo( Util.width, centerY );

        // shape.graphics.moveTo( centerX, centerY );
        // shape.graphics.lineTo(0,floorY);
        // shape.graphics.moveTo( centerX, centerY );
        // shape.graphics.lineTo(Util.width,floorY);
        // shape.graphics.moveTo( centerX, centerY );
        // shape.graphics.lineTo(0,roofY);
        // shape.graphics.moveTo( centerX, centerY );
        // shape.graphics.lineTo(Util.width,roofY);
    }

    update() {
    }
}

