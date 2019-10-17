// Liberapp 2019 - Tahiti Katagai
// 地面描画

class DrawGround extends GameObject{

    constructor() {
        super();

        let shape = new egret.Shape();
        this.display = shape;
        GameObject.baseDisplay.addChildAt( this.display, 1 );

        const centerX = Util.w(0.5);
        const centerY = Util.h(0.3);
        const playerY = Util.h(0.5) + Util.w(0.3);
        const roofY = centerY + (centerY - playerY);

        shape.graphics.lineStyle(2, 0x606080);
        shape.graphics.moveTo( centerX, centerY );
        shape.graphics.lineTo(0,playerY);
        shape.graphics.moveTo( centerX, centerY );
        shape.graphics.lineTo(Util.width,playerY);
        shape.graphics.moveTo( centerX, centerY );
        shape.graphics.lineTo(0,roofY);
        shape.graphics.moveTo( centerX, centerY );
        shape.graphics.lineTo(Util.width,roofY);
    }

    update() {
    }
}

