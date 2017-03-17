ig.module(
	'game.entities.heart'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHeart = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/heartGood.png', 10, 10 ),
    size: {x: 10, y:10},
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
			this.kill();
			other.increaseScore();
    }
});
});
