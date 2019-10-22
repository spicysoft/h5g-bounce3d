// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const ROAD_WIDTH_PER_W = 1;
const LANES = 5;
const LANE_WIDTH_PER_W = 1/LANES;
const PLAYER_RADIUS_PER_W = LANE_WIDTH_PER_W/2 * 0.9;
const PLAYER_SPEED_Z_PER_W = 1/30;
const PLAYER_MAX_SPEED_Z_PER_W = 1/20;
const CAMERA_Y_PER_W = -0.4;
const CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
const CAMERA_Z_OFFSET_PER_W = 0.25;
const SAVE_KEY_BESTSCORE = "speedball-bestScore";

const PAD_RADIUS_PER_W = PLAYER_RADIUS_PER_W * 2;

const BACK_COLOR = 0x000000;    // index.htmlで設定
const FONT_COLOR = 0xc0c4d0;
const PLAYER_COLOR = 0xff00b0;
const PAD_COLOR = 0x0090f0;
const SHADOW_COLOR = 0xf0f0ff;
const LANE_COLOR = 0xe0e0e0;

class Game {

    static loadSceneGamePlay() {

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
    }

    static speed:number;
    static hard:number;
}
