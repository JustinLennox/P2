ig.module( 'game.levels.dorm1' )
.requires( 'impact.image','game.entities.player','game.entities.lava','game.entities.heart','game.entities.ice','game.entities.debris','game.entities.bounce','game.entities.wallClimb' )
.defines(function(){
LevelDorm1=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":72,"y":114},{"type":"EntityLava","x":160,"y":110},{"type":"EntityLava","x":172,"y":110},{"type":"EntityLava","x":184,"y":110},{"type":"EntityLava","x":212,"y":110},{"type":"EntityLava","x":196,"y":110},{"type":"EntityHeart","x":52,"y":36},{"type":"EntityHeart","x":144,"y":84},{"type":"EntityHeart","x":100,"y":196},{"type":"EntityHeart","x":212,"y":80},{"type":"EntityHeart","x":272,"y":100},{"type":"EntityHeart","x":264,"y":200},{"type":"EntityHeart","x":180,"y":204},{"type":"EntityIce","x":128,"y":222},{"type":"EntityIce","x":128,"y":54},{"type":"EntityDebris","x":116,"y":64,"settings":{"size":{"x":8,"y":8}}},{"type":"EntityBounce","x":84,"y":94},{"type":"EntityWallClimb","x":224,"y":114},{"type":"EntityWallClimb","x":224,"y":142},{"type":"EntityWallClimb","x":300,"y":90},{"type":"EntityWallClimb","x":300,"y":138}],"layer":[{"name":"collision","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"main","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/dorm-tiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,31,31,31,3,4,1,1,1,1,1,1,1,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],[0,0,3,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,3,0,0,0,0,0,0,0,0,0,0],[0,0,3,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,3,0,0,0,0,0,0,0,0,0,0],[0,0,3,31,31,4,4,31,31,31,31,31,31,31,31,31,31,31,31,3,0,0,0,0,0,0,0,0,0,0],[0,0,3,31,31,31,31,31,5,5,14,14,14,14,5,31,31,31,32,4,0,0,0,0,0,0,0,0,0,0],[0,0,3,32,5,5,0,32,5,32,32,32,32,32,5,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,0,0,0,0,0,5,0,31,0,0,0,5,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,0,0,0,0,0,5,5,5,5,5,5,5,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,4,0,0,0,0,0,0,0,0,0,0],[0,0,4,5,5,5,5,5,1,1,1,1,1,1,1,5,5,5,5,4,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelDorm1Resources=[new ig.Image('media/dorm-tiles.png')];
});