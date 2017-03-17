ig.module(
	'game.entities.totem'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTotem = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/totem.png', 16, 16 ),
    size: {x: 16, y:16},
    offset: {x: 0, y: 0},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
		painted: false,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0]);
    },
    update: function() {
    	// near an edge? return!
    	this.parent();
    },
    handleMovementTrace: function( res ) {
    	this.parent( res );
    	// collision with a wall? return!
    	if( res.collision.x ) {
    		this.flip = !this.flip;
    	}
    },
    check: function( other ) {
			if (!this.painted) {
    		other.receiveDamage(10, this );
		 	}
    },
    receiveDamage: function(value, color){
        // this.parent(value);
        // if(this.health > 0)
    		// ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
				this.painted = true;
				if (color == "red") {
					this.animSheet = new ig.AnimationSheet( 'media/redTotem.png', 16, 16 );
					this.addAnim('red', .07, [0]);
					this.currentAnim = this.anims.red;
				} else if (color == "green") {
					this.animSheet = new ig.AnimationSheet( 'media/greenTotem.png', 16, 16 );
					this.addAnim('green', .07, [0]);
					this.currentAnim = this.anims.green;
				} else if (color == "blue") {
					this.animSheet = new ig.AnimationSheet( 'media/blueTotem.png', 16, 16 );
					this.addAnim('blue', .07, [0]);
					this.currentAnim = this.anims.blue;
				}
    },
    kill: function(){
        // this.parent();
				// ig.game.spawnEntity(EntityZombiePrincess, this.pos.x, this.pos.y);
        // ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
});
});
