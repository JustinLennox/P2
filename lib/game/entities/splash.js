ig.module(
	'game.entities.splash'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntitySplash = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/splash.png', 320, 240 ),
    size: {x: 5, y:5},
		startIndex: 0,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0]);
    },
    update: function() {
    	// near an edge? return!
    	// this.parent();
			if (ig.input.pressed('space')) {
				ig.game.loadLevel(LevelTutorial);
			}
    },
		draw: function() {
			this.parent();
			this.startIndex++;
			if (this.startIndex < 30) {
				var image = new ig.Image('media/Space.png');
				image.draw(35, 210);
			} else if (this.startIndex > 60) {
				this.startIndex = 0;
			}
		}
});
});
