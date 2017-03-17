ig.module(
	'game.entities.doorway'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDoorway = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/Doorway.png', 16, 32),
    size: {x: 16, y:32},
    offset: {x: 0, y: 0},
    type: ig.Entity.TYPE.B,
		damageTaken: 0,
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
			if (this.painted) {
				if (ig.game.currentLevel == "LevelTutorial") {
					ig.game.loadLevel(LevelLevel1);
					ig.game.currentLevel = "LevelLevel1";
				} else if (ig.game.currentLevel == "LevelLevel1") {
					ig.game.currentLevel = "LevelFinal";
					ig.game.loadLevel(LevelFinal);
				}
		 	}
    },
    receiveDamage: function(value, color){
        // this.parent(value);
				this.damageTaken += value;
        // // if(this.health > 0)
    		// // ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
				if (this.damageTaken >= 300) {
					this.animSheet = new ig.AnimationSheet( 'media/DoorwayColored.png', 16, 32);
					this.addAnim('colored', .07, [0]);
					this.currentAnim = this.anims.colored;
					this.painted = true;
				}
    },
    kill: function(){
        // this.parent();
				// ig.game.spawnEntity(EntityZombiePrincess, this.pos.x, this.pos.y);
        // ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
});
});
