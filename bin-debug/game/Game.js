// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SAVE_KEY_BESTSCORE = "bounce3d-bestScore";
var ROAD_WIDTH_PER_W = 1;
var LANES = 7;
var LANE_WIDTH_PER_W = 2 / LANES;
var PLAYER_RADIUS_PER_W = 0.1;
var PLAYER_SPEED_Z_PER_W = 1 / 200;
var PLAYER_MAX_SPEED_Z_PER_W = 1 / 70;
var PLAYER_JUMP_Y_PER_W = -0.3;
var CAMERA_Y_PER_W = -0.4;
var CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
var CAMERA_Z_OFFSET_PER_W = 0.25;
var FAR_LIMIT_PER_W = 3;
var PAD_RADIUS_PER_W = LANE_WIDTH_PER_W; //PLAYER_RADIUS_PER_W * 3;
var PAD_STEP_Z_PER_W = 0.25;
var BACK_COLOR = 0xf0f0ff; // index.htmlで設定
var FONT_COLOR = 0xb0b4c0;
var PLAYER_COLOR = 0xff8000;
var PAD_COLOR1 = 0x30e090;
var PAD_COLOR2 = 0x30d0c0;
var SHADOW_COLOR = BACK_COLOR;
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