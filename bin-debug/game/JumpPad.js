// Liberapp 2019 - Tahiti Katagai
// ジャンプ足場
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
var PAD_SY = 0.375;
var PadType;
(function (PadType) {
    PadType[PadType["Fixed"] = 0] = "Fixed";
    PadType[PadType["SlideR"] = 1] = "SlideR";
    PadType[PadType["SlideL"] = 2] = "SlideL";
    PadType[PadType["ZoomIn"] = 3] = "ZoomIn";
    PadType[PadType["ZoomOut"] = 4] = "ZoomOut";
    PadType[PadType["Rise"] = 5] = "Rise";
    PadType[PadType["Fall"] = 6] = "Fall";
    PadType[PadType["Total"] = 7] = "Total";
})(PadType || (PadType = {}));
var JumpPad = (function (_super) {
    __extends(JumpPad, _super);
    function JumpPad(type, x, y, z) {
        var _this = _super.call(this) || this;
        _this.step = 0;
        _this.type = type;
        _this.x = x;
        _this.y = y;
        _this.z = z;
        _this.radius = Util.w(PAD_RADIUS_PER_W);
        _this.setDisplay(x, y, _this.radius, PAD_COLOR);
        _this.display.alpha = 0;
        _this.perspective(_this.x, _this.y, _this.z);
        return _this;
    }
    JumpPad.prototype.setDisplay = function (x, y, radius, color) {
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(shape, 0);
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, radius);
        shape.graphics.endFill();
    };
    JumpPad.prototype.perspective = function (x, y, z) {
        z = z + Util.w(0.25);
        z = z / Util.w(0.25);
        var rpcZ = 1 / z;
        x += Ball3D.centerX;
        y += Ball3D.centerY;
        x = x * rpcZ;
        y = y * rpcZ;
        this.display.x = x - Ball3D.centerX;
        this.display.y = y - Ball3D.centerY;
        this.display.scaleX = rpcZ;
        this.display.scaleY = rpcZ * PAD_SY;
    };
    JumpPad.prototype.update = function () {
        // alpha fade in
        if (this.display.alpha < 1) {
            this.display.alpha += (1 / 64);
        }
        // move
        var x = this.x;
        var y = this.y;
        var z = this.z - Player.I.z;
        var rate = this.getSlideRate(z);
        switch (this.type) {
            case PadType.Fixed:
                this.perspective(x, y, z);
                break;
            case PadType.SlideR:
                x = x + Util.lerp(-Util.w(LANE_WIDTH_PER_W * 2), 0, rate);
                this.perspective(x, y, z);
                break;
            case PadType.SlideL:
                x = x + Util.lerp(+Util.w(LANE_WIDTH_PER_W * 2), 0, rate);
                this.perspective(x, y, z);
                break;
            case PadType.ZoomIn:
                this.perspective(x, y, z);
                this.display.scaleX *= rate;
                this.display.scaleY *= rate;
                break;
            case PadType.ZoomOut:
                this.perspective(x, y, z);
                rate = 1 - rate;
                this.display.scaleX *= rate;
                this.display.scaleY *= rate;
                if (rate >= 1)
                    this.destroy();
                break;
            case PadType.Rise:
                y = y + Util.lerp(Util.w(0.5), 0, rate);
                this.perspective(x, y, z);
                this.display.alpha = rate;
                break;
            case PadType.Fall:
                y = y + Util.lerp(0, +Util.w(0.5), rate);
                this.perspective(x, y, z);
                this.display.alpha = Util.clamp(this.display.alpha, 0, 1 - rate);
                if (rate >= 1)
                    this.destroy();
                break;
        }
        // pass away
        if (z <= -Util.w(0.25)) {
            this.destroy();
        }
    };
    JumpPad.prototype.getSlideRate = function (z) {
        return Util.clamp(-(z - Util.w(1.5)) / Util.w(0.5), 0, 1); // z1.5~1.0 to rate0~1
    };
    return JumpPad;
}(GameObject));
__reflect(JumpPad.prototype, "JumpPad");
//# sourceMappingURL=JumpPad.js.map