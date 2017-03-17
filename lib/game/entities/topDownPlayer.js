ig.module(
	'game.entities.topDownPlayer'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTopDownPlayer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/topJLSprite.png', 32, 32 ),
    size: {x: 32, y:32},
    offset: {x: 0, y: 0},
    flip: false,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0,1,2]);
			this.addAnim('idle', 1, [0]);
    },
    update: function() {
    	// near an edge? return!
    	// if( !ig.game.collisionMap.getTile(
    	// 	this.pos.x + (this.flip ? +4 : this.size.x -4),
    	// 		this.pos.y + this.size.y+1
    	// 	)
    	// ) {
    	// 	this.flip = !this.flip;
    	// }
    	// var xdir = this.flip ? -1 : 1;
    	// this.vel.x = this.speed * xdir;
    	// this.currentAnim.flip.x = this.flip;
			this.gravityFactor = 0;
    	this.parent();
			// ig.game.gravity = 0;
			if (ig.input.state('jump')) {
				this.pos.y -= 1;
				this.currentAnim = this.anims.walk;
			} else {
				this.currentAnim = this.anims.idle;
			}
			if (ig.input.pressed('space')) {
				ig.game.currentLevel = 'LevelTutorial';
				ig.game.loadLevel(LevelSplash);
			}
    },
    handleMovementTrace: function( res ) {
    	this.parent( res );
    	// collision with a wall? return!
    	if( res.collision.x ) {
    		this.flip = !this.flip;
    	}
    },
    check: function( other ) {

    }
});
});
