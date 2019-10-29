// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SAVE_KEY_BESTSCORE = "bounce3d-bestScore";
var ROAD_WIDTH_PER_W = 1;
var LANES = 5;
var LANE_WIDTH_PER_W = 1.75 / LANES;
var PLAYER_RADIUS_PER_W = 0.1;
var PLAYER_SPEED_Z_PER_W = 1 / 75;
var PLAYER_MAX_SPEED_Z_PER_W = 1 / 60;
var PLAYER_JUMP_Y_PER_W = -0.3;
var CAMERA_Y_PER_W = -0.4;
var CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
var CAMERA_Z_OFFSET_PER_W = 0.25;
var FAR_LIMIT_PER_W = 4;
var PAD_RADIUS_PER_W = PLAYER_RADIUS_PER_W * 3;
var PAD_STEP_Z_PER_W = 0.5;
var BACK_COLOR = 0x000000; // index.htmlで設定
var FONT_COLOR = 0xc0c4d0;
var PLAYER_COLOR = 0xff00b0;
var PAD_COLOR = 0x0090f0;
var SHADOW_COLOR = 0xf0f0ff;
var LANE_COLOR = 0xe0e0e0;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.speed = 0;
        Game.hard = 0;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5) + Util.w(CAMERA_Y_PER_W);
        Ball3D.initial();
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