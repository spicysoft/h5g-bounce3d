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
        while (_this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z) {
            var lane = 0;
            var type = PadType.Fixed;
            new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), _this.milestone);
            _this.milestone += Util.w(PAD_STEP_Z_PER_W);
        }
        return _this;
    }
    Wave.prototype.update = function () {
        if (GameOver.I || StartMessage.I) {
            Game.speed = 0;
            return;
        }
        Game.hard = Util.clamp(Player.I.z / Util.w(100), 0, 1);
        Game.speed = Util.lerp(PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard) * Util.width;
        if (this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z) {
            var maxLane = Math.floor(LANES / 2);
            var minLane = -maxLane;
            var lane = randI(minLane, maxLane + 1);
            var type = randI(0, PadType.Total);
            new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
            switch (type) {
                case PadType.Fixed:
                case PadType.ZoomIn:
                case PadType.Rise:
                    if (randBool(0.2)) {
                        lane = lane + randI(1, LANES);
                        if (lane > maxLane)
                            lane -= LANES;
                        type = PadType.Fixed;
                        new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
                    }
                case PadType.SlideR:
                case PadType.SlideL:
                    if (randBool(0.2)) {
                        lane = lane + randI(2, LANES - 1);
                        if (lane > maxLane)
                            lane -= LANES;
                        type = PadType.Fixed;
                        new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
                    }
                    break;
                case PadType.ZoomOut:
                case PadType.Fall:
                    lane = lane + randI(1, LANES);
                    if (lane > maxLane)
                        lane -= LANES;
                    type = PadType.Fixed;
                    new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
                    break;
            }
            this.milestone += Util.w(PAD_STEP_Z_PER_W);
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map