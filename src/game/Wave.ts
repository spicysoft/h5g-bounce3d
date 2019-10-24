// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    constructor() {
        super();
    }

    update() {
        if( GameOver.I || StartMessage.I ){
            Game.speed = 0;
            return;
        }

        Game.hard = Util.clamp( Player.I.z / Util.w( 100 ), 0, 1 );
        Game.speed = Util.lerp( PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard ) * Util.width;

        if( this.milestone <= Player.I.z ){
            this.milestone += Util.w( PAD_INTER_Z_PER_W );
            Score.I.addPoint();
            
            const maxLane = Math.floor( LANES/2 );
            const minLane = -maxLane;
            const lane = randI( minLane, maxLane+1 );
            const type = randI( 0, PadType.Total );
            new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), 0, Player.I.z + Util.w(4) );
        }
    }
}

