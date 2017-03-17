ig.module(
	'game.entities.ice'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityIce = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),
    size: {x: 110, y:14},
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
    	other.receiveDamage(10, this );
    },
    kill: function(){
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
});
});
