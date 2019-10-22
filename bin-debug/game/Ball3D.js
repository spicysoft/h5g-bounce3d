// Liberapp 2019 - Tahiti Katagai
// 3Dボール表示クラス
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SHADOW_SY = 0.5;
var SHADOW_1_SY = 1 / SHADOW_SY;
var Ball3D = (function () {
    function Ball3D(x, y, z, radius, color) {
        this.sphere = null;
        this.shadow = null;
        this.setDisplay(x, y, radius, color);
    }
    Ball3D.initial = function () {
        Ball3D.centerX = 0;
        Ball3D.centerY = Util.w(CAM_PERS_Y_PER_W);
    };
    Ball3D.prototype.destroy = function () {
        if (this.sphere) {
            this.sphere.parent.removeChild(this.sphere);
            this.sphere = null;
            this.shadow.parent.removeChild(this.shadow);
            this.shadow = null;
        }
    };
    Ball3D.prototype.setDisplay = function (x, y, radius, color) {
        this.sphere = new egret.Shape();
        this.shadow = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.sphere, 0);
        GameObject.gameDisplay.addChildAt(this.shadow, 0);
        this.sphere.graphics.beginFill(color);
        this.sphere.graphics.drawCircle(0, 0, radius);
        this.sphere.graphics.endFill();
        this.shadow.graphics.beginFill(SHADOW_COLOR);
        this.shadow.graphics.drawCircle(0, radius * SHADOW_1_SY, radius);
        this.shadow.graphics.endFill();
    };
    Ball3D.prototype.setAlpha = function (alpha) {
        this.sphere.alpha =
            this.shadow.alpha = alpha;
    };
    Ball3D.prototype.setShapeFront = function () {
        this.sphere.parent.removeChild(this.sphere);
        GameObject.gameDisplay.addChild(this.sphere);
    };
    Ball3D.prototype.perspective = function (x, y, z) {
        var shadowRangeY = Ball3D.centerY * 0.25;
        var shadowScale = Util.clamp((y + shadowRangeY) / shadowRangeY, 0, 1);
        x += Ball3D.centerX;
        y += Ball3D.centerY;
        z = z + Util.w(0.25);
        z = z / Util.w(0.25);
        var rpcZ = 1 / z;
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
    };
    return Ball3D;
}());
__reflect(Ball3D.prototype, "Ball3D");
//# sourceMappingURL=Ball3D.js.map