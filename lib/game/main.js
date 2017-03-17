ig.module(
	'game.main'
)
.requires(
    'impact.game',
    'game.levels.dorm1',
		'game.levels.level1',
		'game.levels.tutorial',
		'game.levels.final',
		'game.levels.splash',
		'game.entities.totem',
		'game.entities.ladder',
		'game.entities.wings',
		'game.entities.stranger',
		'game.entities.easel',
		'game.entities.topDownPlayer',
		'game.entities.heart',
		'game.entities.doorway',
		'game.entities.splash',
		'game.entities.zombie',
		'game.entities.zombiePrincess'
)

.defines(function(){

MyGame = ig.Game.extend({
    gravity: 300,
	init: function() {
        this.loadLevel( LevelSplash );

        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
				ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
        ig.input.bind( ig.KEY.C, 'shoot' );
				ig.input.bind( ig.KEY.R, 'red' );
				ig.input.bind( ig.KEY.G, 'green' );
				ig.input.bind( ig.KEY.B, 'blue' );
				ig.input.bind( ig.KEY.Y, 'easel' );
        ig.input.bind( ig.KEY.TAB, 'switch' );
				ig.input.bind( ig.KEY.SPACE, 'space');
				ig.game.currentLevel = "LevelTutorial";
				ig.game.climbing = false;
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if (player) {
			this.screen.x = player.pos.x - ig.system.width / 2;
			this.screen.y = player.pos.y - ig.system.height / 2;
		}
		var topPlayer = this.getEntitiesByType(EntityTopDownPlayer)[0];
		if (topPlayer) {
			this.screen.x = topPlayer.pos.x - ig.system.width / 2;
			this.screen.y = topPlayer.pos.y - ig.system.height / 2;
		}
		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
