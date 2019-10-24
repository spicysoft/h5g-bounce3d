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
        _this.x = 0;
        _this.y = 0;
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
        this.buttonOffsetX = this.x - this.button.x;
    };
    Player.prototype.stateRun = function () {
        // controll x
        if (this.button.press) {
            this.buttonOffsetX = this.x - this.button.x;
        }
        else {
            var sensitivity = 2.5;
            var vx = this.button.x + this.buttonOffsetX - this.x;
            var rangeW = Util.w(1) - this.radius;
            this.x = Util.clamp(this.x + vx * sensitivity, -rangeW, +rangeW);
            this.buttonOffsetX = this.x - this.button.x;
            Ball3D.centerX = -this.x * 0.5;
            Camera2D.x = Util.w(-0.5) + this.x * 0.5;
        }
        // jump y
        var rate = Math.abs(Math.sin((this.z / Util.w(PAD_INTER_Z_PER_W)) * Math.PI));
        this.y = 0 + rate * Util.w(PLAYER_JUMP_Y_PER_W);
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