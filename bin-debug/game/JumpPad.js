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
var PadType;
(function (PadType) {
    PadType[PadType["Fixed"] = 0] = "Fixed";
    PadType[PadType["SlideR"] = 1] = "SlideR";
    PadType[PadType["SlideL"] = 2] = "SlideL";
    PadType[PadType["ZoomIn"] = 3] = "ZoomIn";
    PadType[PadType["ZoomOut"] = 4] = "ZoomOut";
    PadType[PadType["RiseIn"] = 5] = "RiseIn";
    PadType[PadType["FallOut"] = 6] = "FallOut";
    PadType[PadType["Total"] = 7] = "Total";
})(PadType || (PadType = {}));
var JumpPad = (function (_super) {
    __extends(JumpPad, _super);
    function JumpPad(type, x, y, z) {
        var _this = _super.call(this) || this;
        _this.step = 0;
        _this.ball3d = null;
        _this.type = type;
        _this.x = x;
        _this.y = y;
        _this.z = z;
        _this.radius = Util.w(PAD_RADIUS_PER_W);
        _this.ball3d = new Ball3D(x, y, z, _this.radius, PAD_COLOR);
        _this.ball3d.setAlpha(1 / 64);
        return _this;
    }
    JumpPad.prototype.onDestroy = function () {
        this.ball3d.destroy();
        this.ball3d = null;
    };
    JumpPad.prototype.update = function () {
        // alpha fade in
        if (this.ball3d.sphere.alpha < 1) {
            this.ball3d.setAlpha(this.ball3d.sphere.alpha + 1 / 64);
        }
        // move
        var x = this.x;
        var y = this.y;
        var z = this.z - Player.I.z;
        switch (this.type) {
            case ObsType.Fixed: {
                break;
            }
            case ObsType.SlideR: {
                var rate = this.getSlideRate(z);
                x = x + Util.lerp(-Util.w(LANE_WIDTH_PER_W), 0, rate);
                break;
            }
            case ObsType.SlideL: {
                var rate = this.getSlideRate(z);
                x = x + Util.lerp(+Util.w(LANE_WIDTH_PER_W), 0, rate);
                break;
            }
            case ObsType.JumpUp: {
                var rate = Math.abs(Math.sin((z / Util.w(2) + 0.5) * Math.PI));
                y = y - rate * Util.w(0.35);
                break;
            }
            case ObsType.JumpOn: {
                var rate = Math.abs(Math.sin((z / Util.w(2)) * Math.PI));
                y = y - rate * Util.w(0.35);
                break;
            }
        }
        this.ball3d.perspective(x, y, z);
        // pass the player
        if (this.step == 0) {
            if (z <= 0) {
                this.step = 1;
                this.ball3d.setShapeFront();
                // check hit
                var dx = Player.I.x - x;
                var dy = Player.I.y - y;
                if (Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(this.radius, 2) + Math.pow(Player.I.radius, 2)) {
                    Player.I.setStateMiss();
                }
            }
        }
        else {
            if (z <= -Util.w(0.25)) {
                this.destroy();
            }
        }
    };
    JumpPad.prototype.getSlideRate = function (z) {
        return Util.clamp(-(z - Util.w(1.5)) / Util.w(0.5), 0, 1); // z1.5~1.0 to rate0~1
    };
    return JumpPad;
}(GameObject));
__reflect(JumpPad.prototype, "JumpPad");
//# sourceMappingURL=JumpPad.js.map