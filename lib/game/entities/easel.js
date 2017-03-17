ig.module(
	'game.entities.easel'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEasel = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/easel.png', 32, 32),
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
			other.easelFunction();
			this.kill();
    }
});
});
