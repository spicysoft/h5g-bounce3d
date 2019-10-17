// Liberapp 2019 - Tahiti Katagai
// プレイヤー ボール
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.vz = 0;
        _this.ball3d = null;
        _this.buttonOffsetX = 0;
        _this.button = null;
        _this.state = _this.stateNone;
        Player.I = _this;
        _this.x = Util.w(0.5);
        _this.y = Util.h(0.5) + Util.w(0.3);
        _this.z = 0;
        _this.vz = Util.w(PLAYER_SPEED_Z_PER_W);
        _this.radius = Util.w(PLAYER_RADIUS_PER_W);
        _this.ball3d = new Ball3D(_this.x, _this.y, _this.z, _this.radius, PLAYER_COLOR);
        _this.button = new Button(null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null); // 透明な全画面ボタン
        return _this;
    }
    Player.prototype.onDestroy = function () {
        this.ball3d.destroy();
        this.button.destroy();
        Player.I = null;
    };
    Player.prototype.update = function () {
        this.state();
        this.ball3d.perspective(this.x, this.y, 0);
    };
    Player.prototype.setStateNone = function () {
        this.state = this.stateNone;
    };
    Player.prototype.stateNone = function () {
    };
    Player.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    Player.prototype.stateRun = function () {
        // controll x
        if (this.button.press) {
            this.buttonOffsetX = this.x - this.button.x;
        }
        else {
            var rate = 1.25;
            var vx = this.button.x + this.buttonOffsetX - this.x;
            this.x = Util.clamp(this.x + vx * rate, this.radius, Util.width - this.radius);
            this.buttonOffsetX = this.x - this.button.x;
        }
        // progress z
        this.z += this.vz;
    };
    Player.prototype.setStateMiss = function () {
        if (this.state == this.stateMiss)
            return;
        new GameOver();
        this.state = this.stateMiss;
        new EffectCircle(this.x, this.y, this.radius, PLAYER_COLOR);
        EffectLine.create(this.x, this.y, this.radius, PLAYER_COLOR, 8);
    };
    Player.prototype.stateMiss = function () {
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map