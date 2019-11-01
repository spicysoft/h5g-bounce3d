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
        var centerY = Util.h(0.5) + Util.w(CAMERA_Y_PER_W);
        var floorY = centerY + Util.w(CAM_PERS_Y_PER_W);
        var roofY = centerY + (centerY - floorY);
        shape.graphics.lineStyle(5, FONT_COLOR);
        shape.graphics.moveTo(0, centerY);
        shape.graphics.lineTo(Util.width, centerY);
        return _this;
    }
    DrawGround.prototype.update = function () {
    };
    return DrawGround;
}(GameObject));
__reflect(DrawGround.prototype, "DrawGround");
//# sourceMappingURL=DrawGround.js.map