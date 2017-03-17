ig.module(
	'game.entities.water'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWater = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),
    size: {x: 8, y:14},
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
    	this.parent();
    }
    // check: function( other ) {
    // 	other.disableKey(0);
    // }
});
});
