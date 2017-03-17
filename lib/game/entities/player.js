ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/JLSprite.png', 32, 32),
        size: {x: 32, y:32},
        offset: {x: 0, y: 0},
        flip: false,
        health: 60,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        easel: false,
        jump: 230,
        level1: true,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        weapon: 0,
        totalWeapons: 2,
        right: 1,
        left: 1,
        up: 1,
        lives: 2,
        down: 1,
        flying: 0,
        climbing: 0,
        floating: 0,
        score: 0,
        activeWeapon: "EntityBullet",
        startPosition: null,
        invincible: true,
        invincibleDelay: 1,
        invincibleTimer:null,
        spawnTimer: null,
        init: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.setupAnimation(this.weapon);
            this.startPosition = {x:x,y:y};
            this.invincibleTimer = new ig.Timer();
            this.makeInvincible();
            this.spawnTimer = new ig.Timer();
        },
        setupAnimation: function(offset){
            offset = offset * 10;
            this.addAnim('idle', 1, [0+offset]);
            this.addAnim('run', .1, [0+offset,1+offset, 2+offset]);
            this.addAnim('jump', 1, [3+offset]);
            this.addAnim('fall', 0.4, [4+offset]);
            this.addAnim('swim', 0.1, [5+offset, 6+offset, 7+offset]);
            this.addAnim('climb', 1, [8+offset, 9+offset]);
            this.addAnim('fly', 1, [10+offset]);
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        update: function() {
              // move left or right
          accel = this.standing ? this.accelGround : this.accelAir;
          if (this.floating) {
            this.vel.y -= 7;
          } else if (this.climbing) {
            this.pos.x = 630;
            this.vel.y -= 5;
          }
        	if(ig.input.pressed('left') && this.climbing) {
            this.pos.x -= 1;
          } else if (ig.input.state('left')) {
            this.accel.x = -accel;
        		this.flip = true;
        	} else if( ig.input.state('right') && this.right == 1) {
        		this.accel.x = accel;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	// jump
        	if((this.flying || this.floating || this.standing) && ig.input.pressed('jump') && !this.climbing ) {
        		this.vel.y = -this.jump;
          } else if (this.climbing && ig.input.pressed('jump')) {
            this.pos.y -= 10;
        	} else if (this.floating && ig.input.pressed('down')) {
            this.vel.y = 50;
          }
            // shoot
            if( ig.input.pressed('red') ) {
            	// ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
              ig.game.spawnEntity( EntityRedBullet, this.pos.x + 10, this.pos.y + 10, {flip:this.flip} );
            } else if( ig.input.pressed('green') ) {
              ig.game.spawnEntity( EntityGreenBullet, this.pos.x + 10, this.pos.y + 10, {flip:this.flip} );
            } else if( ig.input.pressed('blue') ) {
              ig.game.spawnEntity( EntityBlueBullet, this.pos.x + 10, this.pos.y + 10, {flip:this.flip} );
            } else if( ig.input.pressed('easel') && this.easel) {
              ig.game.spawnEntity( EntityEaselBullet, this.pos.x + 10, this.pos.y, {flip:this.flip} );
              this.easel = false;
            }
            // if( ig.input.pressed('switch') ) {
            // 	this.weapon ++;
            // 	if(this.weapon >= this.totalWeapons)
            // 		this.weapon = 0;
            //     switch(this.weapon){
            //     	case(0):
            //     		this.activeWeapon = "EntityBullet";
            //     		break;
            //     	case(1):
            //     		this.activeWeapon = "EntityGrenade";
            //     	break;
            //     }
            //     this.setupAnimation(this.weapon);
            // }
            // set the current animation, based on the player's speed
            if (this.floating) {
              this.currentAnim = this.anims.swim;
            } else if (this.climbing) {
              this.currentAnim = this.anims.climb;
            } else if( this.vel.y < 0 && this.flying) {
              this.currentAnim = this.anims.fly;
            } else if (this.vel.y < 0) {
            	this.currentAnim = this.anims.jump;
            } else if( this.vel.y > 0 ) {
            	this.currentAnim = this.anims.fall;
            } else if( this.vel.x != 0 ) {
            	this.currentAnim = this.anims.run;
            } else {
              this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
            if( this.invincibleTimer.delta() > this.invincibleDelay ) {
                this.invincible = false;
                this.currentAnim.alpha = 1;
            }
        	// move!
          if(this.level1) {
            this.checkLocation();
          }
        	this.parent();
        },
        kill: function(){
        	this.parent();
        	var x = this.startPosition.x;
        	var y = this.startPosition.y;
          ig.game.currentLevel = "LevelSplash";
        	ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:function(){ig.game.spawnEntity( EntityPlayer, x, y)}} );
          ig.game.loadLevel(LevelSplash);
        },
        receiveDamage: function(amount, from){
            if(this.invincible)
                return;
            this.parent(amount, from);
            if(this.health == 30) {
              ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y);
              this.pos.x = this.startPosition.x;
              this.pos.y = this.startPosition.y;
            }
            this.makeInvincible();
        },
        draw: function(){
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1 ;
            this.drawHealth();
            this.parent();
        },
        ladderFunction: function() {

        },
        increaseScore: function(){
          ig.game.spawnEntity(EntityHeart, this.score, 0);
          this.score = this.score + 10;
        },
        spawnZombie: function(){
          ig.game.spawnEntity(EntityZombie, 0, 0);
        },
        bounce: function(){
          this.maxVel.y = 300;
          this.vel.y = -300;
        },
        easelFunction: function() {
          this.easel = true;
        },
        wingsFunction: function() {
          this.flying = true;
        },
        drawHealth: function() {
          if(this.health <= 30) {
            this.lives = 1;
          } else {
            this.lives = 2;
          }
          if (this.lives == 2) {
            if (this.health >= 60) {
              var image = new ig.Image('media/Bucket3.png');
              image.draw(50, 10);
            } else if (this.health >= 50) {
              var image = new ig.Image('media/Bucket2.png');
              image.draw(50, 10);
            } else {
              var image = new ig.Image('media/Bucket1.png');
              image.draw(50, 10);
            }
            var image = new ig.Image('media/Bucket3.png');
            image.draw(10, 10);
          } else {
            if (this.health >= 30) {
              var image = new ig.Image('media/Bucket3.png');
              image.draw(10, 10);
            } else if (this.health >= 20) {
              var image = new ig.Image('media/Bucket2.png');
              image.draw(10, 10);
            } else {
              var image = new ig.Image('media/Bucket1.png');
              image.draw(10, 10);
            }
          }
        },
        checkLocation: function() {
          if (this.pos.x > 250 && this.pos.x < 460 && this.pos.y > 770) { // water
            // alert("x: " + this.pos.x + "Y" + this.pos.y);
            this.floating = 1;
            this.climbing = 0;
          } else if (this.pos.x > 608 && this.pos.y > 600) {
            this.climbing = 1;
            ig.game.climbing = true;
            this.floating = 0;
          } else {
            this.climbing = 0;
            this.floating = 0;
            ig.game.climbing = false;
          }
        }
    });
    EntityRedBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/Red.png', 5, 3 ),
        maxVel: {x: 200, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 30, "red");
            this.kill();
        }
    });
    EntityGreenBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/Green.png', 5, 3 ),
        maxVel: {x: 200, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 30, "green");
            this.kill();
        }
    });
    EntityBlueBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/Blue.png', 5, 3 ),
        maxVel: {x: 200, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
          other.receiveDamage( 30, "blue");
            this.kill();
        }
    });
    EntityEaselBullet = ig.Entity.extend({
        size: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet( 'media/easelBullet.png', 16, 16),
        maxVel: {x: 200, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 300, "easel");
            this.kill();
        }
    });
    EntityGrenade = ig.Entity.extend({
        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {x: 200, y: 200},
        bounciness: 0.6,
        bounceCounter: 0,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 7), y, settings );
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 0.2, [0,1] );
        },
        handleMovementTrace: function( res ) {
        	this.parent( res );
        	if( res.collision.x || res.collision.y ) {
        		// only bounce 3 times
        		this.bounceCounter++;
        		if( this.bounceCounter > 3 ) {
        			this.kill();
        		}
        	}
        },
        check: function( other ) {
        	other.receiveDamage( 10, this );
        	this.kill();
        },
        kill: function(){
            for(var i = 0; i < 20; i++)
                ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
            this.parent();
        }
    });
    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
                for(var i = 0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
            },
            update: function() {
                if( this.idleTimer.delta() > this.lifetime ) {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            }
    });
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });
    EntityGrenadeParticle = ig.Entity.extend({
        size: {x: 1, y: 1},
        maxVel: {x: 160, y: 200},
        lifetime: 1,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 50},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet( 'media/explosion.png', 1, 1 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            var frameID = Math.round(Math.random()*7);
            this.addAnim( 'idle', 0.2, [frameID] );
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });


});
