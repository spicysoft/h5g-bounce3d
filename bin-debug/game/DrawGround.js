// Liberapp 2019 - Tahiti Katagai
// 地面描画
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DrawGround = (function (_super) {
    __extends(DrawGround, _super);
    function DrawGround() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        _this.display = shape;
        GameObject.baseDisplay.addChildAt(_this.display, 1);
        var centerX = Util.w(0.5);
        var centerY = Util.h(0.3);
        var playerY = Util.h(0.5) + Util.w(0.3);
        var roofY = centerY + (centerY - playerY);
        shape.graphics.lineStyle(2, 0x606080);
        shape.graphics.moveTo(centerX, centerY);
        shape.graphics.lineTo(0, playerY);
        shape.graphics.moveTo(centerX, centerY);
        shape.graphics.lineTo(Util.width, playerY);
        shape.graphics.moveTo(centerX, centerY);
        shape.graphics.lineTo(0, roofY);
        shape.graphics.moveTo(centerX, centerY);
        shape.graphics.lineTo(Util.width, roofY);
        return _this;
    }
    DrawGround.prototype.update = function () {
    };
    return DrawGround;
}(GameObject));
__reflect(DrawGround.prototype, "DrawGround");
//# sourceMappingURL=DrawGround.js.map