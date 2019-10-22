// Liberapp 2019 - Tahiti Katagai
// 地形生成
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
var Wave = (function (_super) {
    __extends(Wave, _super);
    function Wave() {
        var _this = _super.call(this) || this;
        _this.milestone = 0;
        return _this;
    }
    Wave.prototype.update = function () {
        if (GameOver.I || StartMessage.I) {
            Game.speed = 0;
            return;
        }
        Game.hard = Util.clamp(Player.I.z / Util.w(100), 0, 1);
        Game.speed = Util.lerp(PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard) * Util.width;
        if (this.milestone <= Player.I.z) {
            this.milestone += Util.lerp(1.0, 0.5, Game.hard) * Util.width;
            Score.I.addPoint();
            // if( randBool( Util.lerp( 1.0, 0.4, Game.hard ) ) ){
            // fixed obstacle
            var maxLane = Math.floor(LANES / 2);
            var minLane = -maxLane;
            var lane = randI(minLane, maxLane + 1);
            new Obstacle(ObsType.JumpUp, lane * Util.w(LANE_WIDTH_PER_W), 0, Player.I.z + Util.w(4));
            // }
            // else{
            //     if( randBool(0.9) ){
            //         // trick
            //         let maxLane = Math.floor( LANES/2 );
            //         let minLane = -maxLane;
            //         const type = randI( 0, ObsType.Total );
            //         if( type == ObsType.SlideL ) maxLane--;
            //         if( type == ObsType.SlideR ) minLane++;
            //         const lane = randI( minLane, maxLane+1 );
            //         new Obstacle( type, Util.w(0.5) + lane*Util.w(LANE_WIDTH_PER_W), Util.h(0.5) + Util.w(0.3), Player.I.z + Util.w(4) );
            //     }
            //     else{
            //         // wall line
            //         let lane = -Math.floor( LANES/2 );
            //         const xc = Util.w(0.5);
            //         const xw = Util.w(LANE_WIDTH_PER_W);
            //         const y = Util.h(0.5) + Util.w(0.3);
            //         const z = Player.I.z + Util.w(4);
            //         switch( randI(0,11+1) ){
            //             case 0:
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 1:
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 2:
            //             lane++;
            //             lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 3:
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             lane++;
            //             break;
            //             case 4:
            //             lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.Fixed, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             break;
            //             case 5:
            //             lane++;
            //             lane++;
            //             new Obstacle( ObsType.SlideR, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.SlideR, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             break;
            //             case 6:
            //             lane++;
            //             new Obstacle( ObsType.SlideL, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.SlideL, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             lane++;
            //             break;
            //             case 7:
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             lane++;
            //             lane++;
            //             break;
            //             case 8:
            //             lane++;
            //             lane++;
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 9:
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 10:
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             break;
            //             case 11:
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpOn, xc + lane * xw, y, z ); lane++;
            //             new Obstacle( ObsType.JumpUp, xc + lane * xw, y, z ); lane++;
            //             break;
            //         }
            //     }
            // }
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map