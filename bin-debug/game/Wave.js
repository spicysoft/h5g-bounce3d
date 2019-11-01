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
        while (_this.milestone - Util.w(FAR_LIMIT_PER_W / 2) <= Player.I.z) {
            var lane = 0;
            var type = PadType.Fixed;
            new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), _this.milestone);
            _this.milestone += Util.w(PAD_STEP_Z_PER_W);
        }
        return _this;
    }
    Wave.prototype.update = function () {
        // if( GameOver.I || StartMessage.I ){
        //     Game.speed = 0;
        //     return;
        // }
        var speedRate = Util.clamp(Player.I.z / Util.w(60), 0, 1);
        Game.speed = Util.lerp(PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, speedRate) * Util.width;
        Game.hard = Util.clamp(Player.I.z / Util.w(30), 0, 1);
        if (this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z) {
            var maxLane = Math.floor(LANES / 2);
            var minLane = -maxLane;
            var lane = randI(minLane, maxLane + 1);
            var type = randI(0, Util.lerp(PadType.SlideL + 1, PadType.Total, Util.clamp01(Game.hard * 2)));
            new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
            var rate = Util.lerp(0.4, 0.2, Game.hard);
            switch (type) {
                case PadType.Fixed:
                case PadType.ZoomIn:
                case PadType.Rise:
                    lane = lane + randI(2, LANES - 1);
                    type = randI(0, Util.lerp(PadType.SlideL + 1, PadType.Total, Game.hard));
                    break;
                case PadType.SlideR:
                case PadType.SlideL:
                    lane = lane + Math.floor(LANES / 2 + 0.5);
                    type = randI(0, Util.lerp(PadType.ZoomOut + 1, PadType.Total, Game.hard));
                    if (type == PadType.SlideR || type == PadType.SlideL)
                        type = PadType.Fixed;
                    break;
                case PadType.ZoomOut:
                case PadType.Fall:
                    rate = 1;
                    lane = lane + randI(2, LANES - 1);
                    type = randI(0, Util.lerp(PadType.SlideL + 1, PadType.Total, Game.hard));
                    if (type == PadType.Fall || type == PadType.ZoomOut)
                        type = PadType.Fixed;
                    break;
            }
            if (randBool(rate)) {
                if (lane > maxLane)
                    lane -= LANES;
                new JumpPad(type, lane * Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone);
            }
            this.milestone += Util.w(PAD_STEP_Z_PER_W);
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map