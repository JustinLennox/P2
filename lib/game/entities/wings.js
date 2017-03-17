ig.module(
	'game.entities.wings'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWings = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/wings.png', 32, 32),
    size: {x: 32, y: 32},
    offset: {x: 0, y: 0},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0]);
    },
    update: function() {
    	// near an edge? return!
    },
    check: function( other ) {
			other.wingsFunction();
			this.kill();
    }
});
});
