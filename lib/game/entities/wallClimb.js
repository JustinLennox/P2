ig.module(
	'game.entities.wallClimb'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWallClimb = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),
    size: {x: 20, y:50},
    offset: {x: 4, y: 2},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 14,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    },
    update: function() {
    	// near an edge? return!

    },
    check: function( other ) {
    	other.standing = true;
      other.jump = 200;
    }
});
});
