// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const SAVE_KEY_BESTSCORE = "bounce3d-bestScore";

 const ROAD_WIDTH_PER_W = 1;
 const LANES = 7;
 const LANE_WIDTH_PER_W = 2/LANES;

const PLAYER_RADIUS_PER_W = 0.1;
const PLAYER_SPEED_Z_PER_W = 1/170;
const PLAYER_MAX_SPEED_Z_PER_W = 1/70;
const PLAYER_JUMP_Y_PER_W = -0.3;

const CAMERA_Y_PER_W = -0.4;
const CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
const CAMERA_Z_OFFSET_PER_W = 0.25;
const FAR_LIMIT_PER_W = 3;

const PAD_RADIUS_PER_W = LANE_WIDTH_PER_W; //PLAYER_RADIUS_PER_W * 3;
const PAD_STEP_Z_PER_W = 0.25;

const BACK_COLOR = 0xf0f0ff;    // index.htmlで設定
const FONT_COLOR = 0x9094a0;
const PLAYER_COLOR = 0xffa020;
const PAD_COLOR1 = 0x30e090;
const PAD_COLOR2 = 0x30d0c0;
const SHADOW_COLOR = BACK_COLOR;

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
