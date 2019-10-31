// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    constructor() {
        super();

        while( this.milestone - Util.w(FAR_LIMIT_PER_W/2) <= Player.I.z ){
            let lane = 0;
            let type = PadType.Fixed;
            new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
            this.milestone += Util.w( PAD_STEP_Z_PER_W );
        }
    }

    update() {
        // if( GameOver.I || StartMessage.I ){
        //     Game.speed = 0;
        //     return;
        // }

        const speedRate = Util.clamp( Player.I.z / Util.w( 100 ), 0, 1 );
        Game.speed = Util.lerp( PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, speedRate ) * Util.width;
        Game.hard = Util.clamp( Player.I.z / Util.w( 50 ), 0, 1 );

        if( this.milestone - Util.w(FAR_LIMIT_PER_W) <= Player.I.z ){
            const maxLane = Math.floor( LANES/2 );
            const minLane = -maxLane;
            let lane = randI( minLane, maxLane+1 );
            let type = randI( 0, Util.lerp( PadType.SlideL+1, PadType.Total, Util.clamp01(Game.hard*2) ) );
            new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );

            let rate = 0.5;
            switch( type ){
                case PadType.Fixed:
                case PadType.ZoomIn:
                case PadType.Rise:
                    lane = lane + randI( 2, LANES-1 );
                    type = randI( 0, Util.lerp( PadType.SlideL+1, PadType.Total, Game.hard ) );
                    break;
                    
                case PadType.SlideR:
                case PadType.SlideL:
                    lane = lane + Math.floor( LANES/2 + 0.5 );
                    type = randI( 0, Util.lerp( PadType.ZoomOut+1, PadType.Total, Game.hard ) );
                    if( type == PadType.SlideR || type == PadType.SlideL )
                        type = PadType.Fixed;
                    break;

                case PadType.ZoomOut:
                case PadType.Fall:
                rate = 1;
                lane = lane + randI( 2, LANES-1 );
                type = randI( 0, Util.lerp( PadType.SlideL+1, PadType.Total, Game.hard ) );
                if( type == PadType.Fall || type == PadType.ZoomOut )
                    type = PadType.Fixed;
                break;
            }
            if( randBool(rate) ){
                if( lane > maxLane )
                    lane -= LANES;
                new JumpPad( type, lane*Util.w(LANE_WIDTH_PER_W), Util.w(PLAYER_RADIUS_PER_W), this.milestone );
            }
            this.milestone += Util.w( PAD_STEP_Z_PER_W );
        }
    }
}

