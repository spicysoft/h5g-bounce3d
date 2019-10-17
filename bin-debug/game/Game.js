// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ROAD_WIDTH_PER_W = 1;
var LANES = 5;
var LANE_WIDTH_PER_W = 1 / LANES;
var PLAYER_RADIUS_PER_W = LANE_WIDTH_PER_W / 2 * 0.9;
var OBSTACLE_RADIUS_PER_W = PLAYER_RADIUS_PER_W;
var PLAYER_SPEED_Z_PER_W = 1 / 30;
var PLAYER_MAX_SPEED_Z_PER_W = 1 / 20;
var CAMERA_Z_OFFSET_PER_W = 0.25;
var SAVE_KEY_BESTSCORE = "speedball-bestScore";
var BACK_COLOR = 0x000000; // index.htmlで設定
var FONT_COLOR = 0xc0c4d0;
var PLAYER_COLOR = 0xff00b0;
var OBSTACLE_COLOR = 0x0090f0;
var SHADOW_COLOR = 0xf0f0ff;
var LANE_COLOR = 0xe0e0e0;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.speed = 0;
        Game.hard = 0;
        new DrawGround();
        new Player();
        new Wave();
        new StartMessage();
        new Score();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map