// Liberapp 2019 - Tahiti Katagai
// 地形生成
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
var Wave = (function (_super) {
    __extends(Wave, _super);
    function Wave() {
        var _this = _super.call(this) || this;
        _this.milestone = 0;
        return _this;
    }
    Wave.prototype.update = function () {
        if (GameOver.I || StartMessage.I) {
            Game.speed = 0;
            return;
        }
        Game.hard = Util.clamp(Player.I.z / Util.w(100), 0, 1);
        Game.speed = Util.lerp(PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard) * Util.width;
        if (this.milestone <= Player.I.z) {
            this.milestone += Util.w(PAD_INTER_Z_PER_W);
            Score.I.addPoint();
            var maxLane = Math.floor(LANES / 2);
            var minLane = -maxLane;
            var lane = randI(minLane, maxLane + 1);
            var type = randI(0, PadType.Total);
            new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), 0, Player.I.z + Util.w(4));
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map