ig.module(
	'game.entities.ladder'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLadder = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/ladder.png', 16, 500),
    size: {x: 16, y: 500},
    offset: {x: 0, y: 0},
		climbingIndex: 0,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0]);
    },
    update: function() {
			if(ig.input.pressed('left') && ig.game.climbing == true) {
				// this.climbingIndex--;
				this.pos.x -= 1;
				// alert("Climbing index: " + this.climbingIndex);
			} else if (ig.input.pressed('right') && ig.game.climbing == true) {
				// this.climbingIndex--;
				this.pos.x += 1;
				// alert("Climbing index: " + this.climbingIndex);
			}
    	// near an edge? return!
    }
});
});
