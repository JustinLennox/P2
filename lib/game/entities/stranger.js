ig.module(
	'game.entities.stranger'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityStranger = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/stranger.png', 32, 32 ),
    size: {x: 32, y:32},
		type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
		drawText: false,
		giveWings: false,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0]);
    },
    update: function() {
    	// near an edge? return!
    	// this.parent();

    },
		draw: function() {
			this.parent();
			if (this.drawText) {
				if (ig.game.currentLevel == "LevelTutorial") {
					var image = new ig.Image('media/help.png');
					image.draw(0, 190);
				} else if (ig.game.currentLevel == "LevelLevel1") {
					var image = new ig.Image('media/help2.png');
					image.draw(0, 190);
				} else if (ig.game.currentLevel == "LevelFinal") {
					var image = new ig.Image('media/help3.png');
					image.draw(0, 190);
					var image = new ig.Image('media/tCube.png');
					image.draw(150, 50);
				}
			}
		},
		check: function( other ) {
			this.drawText = true;
    }
});
});
