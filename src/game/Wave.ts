// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    constructor() {
        super();

        while( this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z ){
            const lane = 0;
            const type = PadType.Fixed;
            new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
            this.milestone += Util.w( PAD_STEP_Z_PER_W );
        }
    }

    update() {
        if( GameOver.I || StartMessage.I ){
            Game.speed = 0;
            return;
        }

        Game.hard = Util.clamp( Player.I.z / Util.w( 100 ), 0, 1 );
        Game.speed = Util.lerp( PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard ) * Util.width;

        if( this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z ){
            const maxLane = Math.floor( LANES/2 );
            const minLane = -maxLane;
            let lane = randI( minLane, maxLane+1 );
            let type = randI( 0, PadType.Total );
            new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );

            switch( type ){
                case PadType.Fixed:
                case PadType.ZoomIn:
                case PadType.Rise:
                if( randBool( 0.2 ) ){
                    lane = lane + randI( 1, LANES );
                    if( lane > maxLane )
                        lane -= LANES;
                    type = PadType.Fixed;
                    new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
                }
                
                case PadType.SlideR:
                case PadType.SlideL:
                if( randBool( 0.2 ) ){
                    lane = lane + randI( 2, LANES-1 );
                    if( lane > maxLane )
                        lane -= LANES;
                    type = PadType.Fixed;
                    new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
                }
                break;

                case PadType.ZoomOut:
                case PadType.Fall:
                lane = lane + randI( 1, LANES );
                if( lane > maxLane )
                    lane -= LANES;
                type = PadType.Fixed;
                new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
                break;
            }

            this.milestone += Util.w( PAD_STEP_Z_PER_W );
        }
    }
}

