//This is the original
/***********/

var AM = new AssetManager();
var gameEngine = new GameEngine();
var map1 = new mapOne();
var map2 = new mapTwo();
var map3 = new mapThree();
//In order to get the camera feature to work make sure every
//x position value is its position - cameraX

//The Game is 3200x700
//The Canvas is 800x700

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth
    , frameDuration, frames, loop) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.isDead = false;
}

//Added the 'scale' parameter and also set it so scaleBy is set to it
//if the caller adds the scale size to the end of the function call.
Animation.prototype.drawFrame = function (tick, ctx, x, y, scale) {
    var scaleBy = scale || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/**
 * The next 3 functions are the first level background image
 * setup to repeat infinitely.
 */
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.speed = -50
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.update = function () {
    var mainguy = this.game.entities[2];

    var mapWidth = map.cols * 25;

    if (this.game.d
         && cameraX != 0
         && this.game.entities[2].x < mapWidth - cameraMid
         && mainguy.crouch == false
         && mainguy.firingStance != 4
         && mainguy.standingStance != 0
         && mainguy.isCollide == false) {

        this.x += this.game.clockTick * this.speed;
    }
    if (this.game.a
         && cameraX != 0
         && this.game.entities[2].x < mapWidth - cameraMid
         && mainguy.crouch == false
         && mainguy.firingStance != 4
         && mainguy.standingStance != 0
         && mainguy.isCollide == false) {

        this.x -= this.game.clockTick * this.speed;
    }

    if (this.x < -2081) this.x = 0;
    if (this.x > 2081) this.x = 0;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y + cameraY);
    this.ctx.drawImage(this.spritesheet, this.x + 2077, this.y + cameraY);
    this.ctx.drawImage(this.spritesheet, this.x - 2077, this.y + cameraY);
};


/**
 * These are the functions which create the fire powerup
 * Still a work in progress
 */
function FirePowerUp(game, spritesheet, xLocation, yLocation) {
    this.animation = new Animation(spritesheet, this.x, this.y, 214, 207, 2, 0.10, 6, true);
    this.isFirePowerUp = true;
    this.height = 60;
    this.width = 64;
    this.speed = 0;
    this.ctx = game.ctx;
    PowerUp.call(this, game, xLocation, yLocation);
}

FirePowerUp.prototype = new PowerUp();
FirePowerUp.prototype.constructor = FirePowerUp;

FirePowerUp.prototype.update = function () {
    var mainguy = this.game.entities[2];

    if (this.collide(mainguy)) {
        gameEngine.removePowerUp(this);
    }
}

FirePowerUp.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY, .3);
}

FirePowerUp.prototype.collide = function (other) {
    var rect1 = {x: this.x, y: this.y, width: this.width, height: this.height}
    var rect2 = {x: other.x, y: other.y, width: other.width, height: other.height}
    if (rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.height + rect1.y > rect2.y) {
        return true;
    }
};



var map = map2;

// no inheritance
function Platform(game) {
    this.x = 0;
    this.y = 0;
    this.speed = -300
    this.game = game;
    this.ctx = game.ctx;
};

Platform.prototype.draw = function () {
    var posX = this.x - cameraX;
    var sqFt = 25;
    var xAxis, yAxis;

    for (yAxis = 0; yAxis < map.rows; yAxis++) {
      for (xAxis = 0; xAxis < map.cols; xAxis++) {
        var obstacle = map.layer[yAxis][xAxis];

            function tilePicker(color) {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
            };

            var xCoor = sqFt * xAxis - cameraX;
            var yCoor = 25 + sqFt * yAxis + cameraY;
            switch (obstacle) {
                case 'c': // middle ground
                    this.ctx.drawImage(AM.getAsset("./img/ground1.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'v': // top ground
                    this.ctx.drawImage(AM.getAsset("./img/ground2.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'z': // left ground
                    this.ctx.drawImage(AM.getAsset("./img/ground3.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'x': // right ground
                    this.ctx.drawImage(AM.getAsset("./img/ground4.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'b': // bottom ground
                    this.ctx.drawImage(AM.getAsset("./img/ground5.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'a': // NW Ground
                    this.ctx.drawImage(AM.getAsset("./img/nwGround.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 's': // SW Ground
                    this.ctx.drawImage(AM.getAsset("./img/swGround.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'd': // NE Ground
                    this.ctx.drawImage(AM.getAsset("./img/neGround.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'f': // SE Ground
                    this.ctx.drawImage(AM.getAsset("./img/seGround.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 't': // tree trunk
                    this.ctx.drawImage(AM.getAsset("./img/treeTrunk.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'l': // middle leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf1.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'u': // NW leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf2.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'i': // NE leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf3.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'o': // SW leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf4.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'p': // SE leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf5.png"), xCoor, yCoor, sqFt, sqFt);
                    break;
                case 'w': // concrete walls
                    //tilePicker("gray");
                    break;
                case 'd': // door
                    //tilePicker("SaddleBrown");
                    break;
            }
        }
    }
    Entity.prototype.draw.call(this);
};

Platform.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    //if (this.x < -1920) this.x = 1916;
    //if (this.x < -2083) this.x = Background1X + 2075;
};

function Camera(game) {
  this.game = game;
  this.xOffset = this.game.entities[1].x;
  this.yOffset = this.game.entities[1].y;
  this.width = 800;
  this.height = 700;
  this.speed = 200;
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;


var cameraX = 0;
var cameraY = 0;

Camera.prototype.update = function() {
  //This if statement might need to be two seperate if statements
  // if (this.xOffset != this.game.entities[1].x && this.yOffset != this.game.entities[1].y) {
  //   this.xOffset = this.game.entities[1].x;
  //   this.yOffset = this.game.entities[1].y;
  // }
  var mapWidth = map.cols * 25;
  //this.game.ctx.canvas.width = 3200;
  cameraMid = this.game.ctx.canvas.width / 2;
  if (this.game.entities[2].x < cameraMid) {
    cameraX = 0;
  } else if (this.game.entities[2].x > mapWidth - cameraMid) {
    cameraX = mapWidth - this.game.ctx.canvas.width;
  } else {
    cameraX = this.game.entities[2].x - cameraMid;
  }

  //The Y coordinates have been of this whole time.
  cameraY = -1 * (this.game.ctx.canvas.width/map.rows) + 8;

}

Camera.prototype.draw = function() {
}

function collide(thisUnit, otherUnit) {
    var rect1 = {x: thisUnit.x, y: thisUnit.y, width: thisUnit.width, height: thisUnit.height}
    var rect2 = {x: otherUnit.x, y: otherUnit.y, width: otherUnit.width, height: otherUnit.height}
    if (otherUnit.unitType === "giantRobot") {
        rect2.width = 100;
        rect2.x = otherUnit.x + 80;
    }
    if (otherUnit.standingStance === 0) {
        rect2.height = 10;
        rect2.y = otherUnit.y + 75;
    }
    if (otherUnit.crouch) {
        rect2.height = 30;
        rect2.y = otherUnit.y + 60;
    }
    if (rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.height + rect1.y > rect2.y) {
        if (otherUnit.isBullet) {
        }
        else if (!otherUnit.isBullet){
            if (thisUnit.isBullet) {
                if (otherUnit.enemy && !(thisUnit.unitType === "hero")) {

                }
                else {
                    otherUnit.health -= 1;
                    if (otherUnit.hero && !otherUnit.immune) {
                        otherUnit.hurt = true;
                    }
                    thisUnit.removeFromWorld = true;
                }
            }
            if (thisUnit.hero) {
                if (otherUnit.landMine) {
                    thisUnit.health -= 10;
                    thisUnit.hurt = true;
                    otherUnit.health = 0;
                }
                else if (otherUnit.enemy && !thisUnit.immune){
                    thisUnit.hurt = true;
                    thisUnit.health -= 1;
                }
            }
        }
        return true;
    }
};

// inheritance
function Hero(game, heroSprites,speed, ground, health, lives) {
    this.frontRun = new Animation(heroSprites[0], this.x, this.y, 105, 101, 8, 0.1, 8, true);
    this.backRun = new Animation(heroSprites[1], this.x, this.y, 105, 102, 8, 0.1, 8, true);
    this.frontStand = new Animation(heroSprites[2], this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.backStand = new Animation(heroSprites[3], this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.frontJump = new Animation(heroSprites[4], this.x, this.y, 105, 107, 1, 1.5, 1, false);
    this.backJump = new Animation(heroSprites[5], this.x, this.y, 105, 103, 1, 1.5, 1, false);
    this.backCrawl = new Animation(heroSprites[6], this.x, this.y, 138, 100, 1, 0.1, 1, true);
    this.frontCrawl = new Animation(heroSprites[7], this.x, this.y, 141, 100, 1, 0.1, 1, true);
    this.front45Up = new Animation(heroSprites[8], this.x, this.y, 99, 101, 1, 0.1, 1, true);
    this.front45UpRun = new Animation(heroSprites[9], this.x, this.y, 91, 101, 8, 0.1, 8, true);
    this.front45Down = new Animation(heroSprites[10], this.x, this.y, 99, 102, 1, 0.1, 1, true);
    this.front45DownRun = new Animation(heroSprites[11], this.x, this.y, 92, 101, 8, 0.1, 8, true);
    this.back45Up = new Animation(heroSprites[12], this.x, this.y, 99, 101, 1, 0.1, 1, true);
    this.back45UpRun = new Animation(heroSprites[13], this.x, this.y, 90, 100, 8, 0.1, 8, true);
    this.back45Down = new Animation(heroSprites[14], this.x, this.y, 88, 102, 1, 0.1, 1, true);
    this.back45DownRun = new Animation(heroSprites[15], this.x, this.y, 91, 101, 8, 0.1, 8, true);
    this.frontDown90Hero = new Animation(heroSprites[16], this.x, this.y, 90, 102, 1, 0.1, 1, true);
    this.frontDamageHero = new Animation(heroSprites[17], this.x, this.y, 100, 100, 1, 0.1, 1, true);
    this.frontCrouchHero = new Animation(heroSprites[18], this.x, this.y, 96, 80, 1, 0.1, 1, true);
    this.frontUp90Hero = new Animation(heroSprites[19], this.x, this.y, 90, 102, 1, 0.1, 1, true);
    this.backUp90Hero = new Animation(heroSprites[20], this.x, this.y, 90, 102, 1, 0.1, 1, true);
    this.backDown90Hero = new Animation(heroSprites[21], this.x, this.y, 91, 102, 1, 0.1, 1, true);
    this.backDamageHero = new Animation(heroSprites[22], this.x, this.y, 100, 100, 1, 0.1, 1, true);
    this.backCrouchHero = new Animation(heroSprites[23], this.x, this.y, 100, 80, 1, 0.1, 1, true);
    this.frontDamageHero = new Animation(heroSprites[24], this.x, this.y, 100, 100, 1, .5, 1, true);
    this.backDamageHero = new Animation(heroSprites[25], this.x, this.y, 100, 100, 1, 0.1, 1, true);

    this.jumping = false;
    this.speed = speed;
    this.health = health;
    this.hero = true;
    this.lives = lives;
    this.unitType = "hero";
    this.ctx = game.ctx;
    this.floor = 500;
    this.ground = 500;
    this.firingStance = 2;
    this.width = 90;
    this.hurtCount = 6;
    this.height = 102;
    this.hurt = false;
    this.standingStance = 2;
    this.runFlag = false;
    this.firing = false;
    this.immuneCount = 20;
    this.CanShoot = true;
    this.jumpForward = true;
    this.standForward = true;
    this.crouch = false;
    this.immune = false;
    this.falling = false;
    this.spaceTime = 0;
    this.lookingRight = true;
    Entity.call(this, game, 100, 525);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
    this.isCollide = false;
    this.collideForward = false;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    if (this.game.aimUp && !this.jumping && this.standingStance === 2) {
        if (this.firingStance < 4) {
            this.firingStance += 1;
        }
    }
    if (this.game.aimDown && !this.jumping && this.standingStance === 2) {
        if (this.firingStance > 0) {
            this.firingStance -= 1;
        }
    }
    if (this.game.a) {
        if (!this.jumping) {
          this.jumpForward = false;
          this.lookingRight = false;
        }
        this.standForward = false;
        this.runFlag = true;
    }

    if (this.game.d) {
        if (!this.jumping) {
          this.jumpForward = true;
          this.lookingRight = true;
        }
        this.standForward = true;
        this.runFlag = true;
    }

    if (!this.game.a && !this.game.d) {
        this.runFlag = false;
    }

    if (this.game.shooting) this.firing = true;
    else this.firing = false;

    if (this.game.s && !this.jumping) {
        if (this.standingStance > 0) {
            this.standingStance -= 1;
            this.firingStance = 2;
        }
    }

    if (this.game.w && !this.jumping) {
        if (this.standingStance < 2) {
            this.standingStance += 1;
            this.firingStance = 2;
        }
    }

//---------
    if (this.game.space) {
      if (!this.falling && !this.jumping) {
        this.jumping = true;
        this.falling = false;
        this.spaceTime = this.game.timer.gameTime + 0.5;
      }
    }
//---------
    if (this.firingStance === 0 || this.firingStance === 4) {
        this.runFlag = false;
    }
    if (this.standingStance === 1) {
        this.crouch = true;
    }
    else {
        this.crouch = false;
    }
    var totalHeight = 200;
    that = this;

    if (this.immune) {
        if (this.immuneCount > 0) {
            this.immuneCount -= 1;
        }
        else {
            this.immune = false;
            this.immuneCount = 20;
        }
    }
    //-------------------------------------
    //&*&*&*&*&*&*&*&*&*&*&*&*&**&*&*&**&*&*&*
    var heroGroundX = Math.round(this.x/25) + 1;
    var heroGroundY = Math.round(this.y/25);
    //var ground25 = this.ground / 25;
    //&*&*&*&*&*&*&*&*&*&*&*&*&*&**&*&*&*&*&*&*

        if (this.jumping || this.falling) {
          this.frontJump.elapsedTime = 0;
        }
        //### Start ##############################################################

        //This makes the hero go up if he jumps and once he gets to the top he falls
        if (this.jumping) {
          if (map.layer[heroGroundY-1][heroGroundX] == 's'
              || map.layer[heroGroundY-1][heroGroundX] == 'b'
              || map.layer[heroGroundY-1][heroGroundX] == 'f') {
            this.jumping = false;
            this.falling = true;
          } else {
            if (this.game.timer.gameTime <= this.spaceTime) {
              this.y = this.y - 5;
              this.falling = false;
              console.log("jumping");
            } else {
              this.falling = true;
              this.jumping = false;
              console.log("falling");
            }
          }
        }

        //If there is no platform right below hero, start falling
        if (!this.jumping && !(map.layer[heroGroundY+3][heroGroundX] == 'v'
            || map.layer[heroGroundY+3][heroGroundX] == 'a'
            || map.layer[heroGroundY+3][heroGroundX] == 'd')) {
          this.falling = true;
          console.log("No platform");
        }

        //If hero is falling
        if (this.falling) {
          //If there is a floor below the hero make it that the hero is not falling or jumping
          if (map.layer[heroGroundY+3][heroGroundX] == 'v'
              || map.layer[heroGroundY+3][heroGroundX] == 'a'
              || map.layer[heroGroundY+3][heroGroundX] == 'd') {
               this.falling = false;
               this.jumping = false;
               //this.frontJump.elapsedTime = 0;
               this.y += 10 //this only happens once
               //console.log("Platform below");
          } else {
            //if there is do platform below hero fall down, sum amount of pixels
            if (this.falling) {
              this.y += 5;
              //console.log("I'm falling down");
            }
          }
        } // End of if falling statement

        if (this.runFlag) {
          //If there is a wall right of the hero
          if (this.game.d) {
            if (map.layer[heroGroundY][heroGroundX+1] == 'a'
                || map.layer[heroGroundY][heroGroundX+1] == 'z'
                || map.layer[heroGroundY][heroGroundX+1] == 's') {
                  console.log("R0: " + map.layer[heroGroundY][heroGroundX+1]);
                  this.x -= this.game.clockTick * this.speed;
            }
            if (map.layer[heroGroundY+1][heroGroundX+1] == 'a'
                || map.layer[heroGroundY+1][heroGroundX+1] == 'z'
                || map.layer[heroGroundY+1][heroGroundX+1] == 's') {
                  console.log("R1: " + map.layer[heroGroundY+1][heroGroundX+1]);
                  this.x -= this.game.clockTick * this.speed;
            }
            if (map.layer[heroGroundY+2][heroGroundX+1] == 'a'
                || map.layer[heroGroundY+2][heroGroundX+1] == 'z'
                || map.layer[heroGroundY+2][heroGroundX+1] == 's') {
                  console.log("R2: " + map.layer[heroGroundY+2][heroGroundX+1]);
                  this.x -= this.game.clockTick * this.speed;
            }
            if ((map.layer[heroGroundY+3][heroGroundX+1] == 'a'
                || map.layer[heroGroundY+3][heroGroundX+1] == 'z'
                || map.layer[heroGroundY+3][heroGroundX+1] == 's')
                && this.falling) {
                  console.log("R3: " + map.layer[heroGroundY+2][heroGroundX+1]);
                  this.x -= this.game.clockTick * this.speed;
            }
          }

          //If there is a wall left of the hero
          if (this.game.a) {
            if (map.layer[heroGroundY][heroGroundX-1] == 'd'
                || map.layer[heroGroundY][heroGroundX-1] == 'x'
                || map.layer[heroGroundY][heroGroundX-1] == 'f') {
                  console.log("L0: " + map.layer[heroGroundY][heroGroundX-1]);
                  this.x += this.game.clockTick * this.speed;
            }
            if (map.layer[heroGroundY+1][heroGroundX-1] == 'd'
                || map.layer[heroGroundY+1][heroGroundX-1] == 'x'
                || map.layer[heroGroundY+1][heroGroundX-1] == 'f') {
                  console.log("L1: " + map.layer[heroGroundY+1][heroGroundX-1]);
                  this.x += this.game.clockTick * this.speed;
            }
            if (map.layer[heroGroundY+2][heroGroundX-1] == 'd'
                || map.layer[heroGroundY+2][heroGroundX-1] == 'x'
                || map.layer[heroGroundY+2][heroGroundX-1] == 'f') {
                  console.log("L2: " + map.layer[heroGroundY+2][heroGroundX-1]);
                  this.x += this.game.clockTick * this.speed;
            }
            if ((map.layer[heroGroundY+3][heroGroundX-1] == 'd'
                || map.layer[heroGroundY+3][heroGroundX-1] == 'x'
                || map.layer[heroGroundY+3][heroGroundX-1] == 'f')
                && this.falling) {
                  console.log("L3: " + map.layer[heroGroundY+2][heroGroundX-1]);
                  this.x += this.game.clockTick * this.speed;
            }
          }
        }

        //--- fix animation --
        // if (this.game.d && this.jumping)

        //--- end of fix animation ---

    if (this.hurt) {
        if (this.hurtCount > 0) {
            if (!this.isCollide) this.x -= 5;
            this.hurtCount -= 1;
        }
        else {
            this.hurtCount = 6;
            this.immune = true;
            this.hurt = false;
        }
    }
    else if (this.runFlag && this.standForward && (this.standingStance === 2)) {
        if (!this.isCollide) {
          this.x += this.game.clockTick * this.speed;
        } else {
            if (!this.collideForward) {
              this.x += this.game.clockTick * this.speed;
            }
        }
    }

    else if ((this.runFlag && !this.standForward && (this.standingStance === 2))) {
        if (!this.isCollide) {
            if (this.x >= 40) {
              this.x -= this.game.clockTick * this.speed;
            }
        }
        else {
            if (this.collideForward) {
                if (this.x >= 40) {
                  this.x -= this.game.clockTick * this.speed;
                }
            }
        }
    }

    if (this.firing) {

        if (this.CanShoot) {
            if (this.standForward) {
                if (this.jumping) {
                    if (this.jumpForward) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 95, this.y + 38))
                        this.game.addEntity(new Bullet(this.game, this.x + 110, this.y + 42, this.jumpForward
                            ,this.firingStance, false, false, this.unitType, 300));
                    }
                    else {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x - 10, this.y + 35))
                        this.game.addEntity(new Bullet(this.game, this.x - 10 , this.y + 35, this.jumpForward
                            ,this.firingStance, false, false, this.unitType, 300));
                    }
                }
                else if (this.standingStance === 0) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 130, this.y + 80))
                    this.game.addEntity(new Bullet(this.game, this.x + 145, this.y + 85, this.standForward
                        ,this.firingStance, false, false, this.unitType, 300));
                }
                else if (this.standingStance === 1) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 80, this.y + 56))
                    this.game.addEntity(new Bullet(this.game, this.x + 90, this.y + 61, this.standForward
                     ,this.firingStance, false, false, this.unitType, 300));
                }
                else {
                    if (this.firingStance === 2) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 92, this.y + 31))
                        this.game.addEntity(new Bullet(this.game, this.x + 110, this.y + 35, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }
                    else if (this.firingStance === 3) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 70, this.y + 3))
                        this.game.addEntity(new Bullet(this.game, this.x + 100, this.y - 10, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }
                    else if (this.firingStance === 1) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 71, this.y + 73))
                        this.game.addEntity(new Bullet(this.game, this.x + 95, this.y + 90, this.standForward
                            ,this.firingStance, true, false,this.unitType, 300));
                    }
                    else if (this.firingStance === 4) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 30, this.y - 7))
                        this.game.addEntity(new Bullet(this.game, this.x + 35, this.y - 15, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }

                }
            }
            else {
                if (this.jumping) {
                    if (this.jumpForward ) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 110, this.y + 35))
                        this.game.addEntity(new Bullet(this.game, this.x + 110, this.y + 35, this.jumpForward
                            ,this.firingStance, false, false, this.unitType, 300));
                    }
                    else {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x - 10, this.y + 35))
                        this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 35, this.jumpForward
                            ,this.firingStance, false, false, this.unitType, 300));
                    }
                }
                else if (this.standingStance === 0) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x, this.y + 80))
                   this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 85, this.standForward
                    ,this.firingStance, false, false, this.unitType, 300));
                }
                else if (this.standingStance === 1) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 3, this.y + 55))
                    this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 61, this.standForward
                     ,this.firingStance, false, false, this.unitType, 300));
                }
                else {
                    if (this.firingStance === 2) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x - 2, this.y + 30))
                        this.game.addEntity(new Bullet(this.game, this.x - 15, this.y + 35, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }
                    else if (this.firingStance === 3) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 10, this.y + 3))
                        this.game.addEntity(new Bullet(this.game, this.x , this.y - 10, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }
                    else if (this.firingStance === 1) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 6, this.y + 74))
                        this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 95, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }
                    else if (this.firingStance === 4) {
                        this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 50, this.y - 5))
                        this.game.addEntity(new Bullet(this.game, this.x + 55, this.y - 15, this.standForward
                            ,this.firingStance, true, false, this.unitType, 300));
                    }

                }
            }
            this.CanShoot = false;
            setTimeout(function(){
            that.CanShoot = true;
        }, 500);
        }
    }
    Entity.prototype.update.call(this);
}

Hero.prototype.draw = function () {

    if (this.jumping || this.falling) { //&& this.jumpForward
        this.frontJump.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    }
    else if (this.jumping || this.falling) { // && !this.jumpForward
        this.backJump.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    }
    else if (this.hurt) {
        this.frontDamageHero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX , this.y + cameraY);
    }
    else if (this.standingStance === 0 && this.standForward) {
        this.frontCrawl.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    }
    else if (this.standingStance === 1 && this.standForward) {
        this.frontCrouchHero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY + 20);
    }
    else if (this.standingStance === 1 && !this.standForward) {
        this.backCrouchHero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY + 20);
    }
    else if (this.standingStance === 0 && !this.standForward) {
        this.backCrawl.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    }
    else if (this.firingStance === 2) {
        if (this.runFlag && this.standForward) {
            this.frontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (this.runFlag && !this.standForward) {
            this.backRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && this.standForward) {

            this.frontStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && !this.standForward) {
            this.backStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
    }
    else if (this.firingStance === 3) {
        if (this.runFlag && this.standForward) {
            this.front45UpRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (this.runFlag && !this.standForward) {
            this.back45UpRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && this.standForward) {

            this.front45Up.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && !this.standForward) {
            this.back45Up.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }

    }
    else if (this.firingStance === 1) {
        if (this.runFlag && this.standForward) {
            this.front45DownRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (this.runFlag && !this.standForward) {
            this.back45DownRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && this.standForward) {

            this.front45Down.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else if (!this.runFlag && !this.standForward) {
            this.back45Down.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
    }
    else if (this.firingStance === 0) {
        if (this.standForward) {
            this.frontDown90Hero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else {
            this.backDown90Hero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
    }
    else if (this.firingStance === 4) {
        if (this.standForward) {
            this.frontUp90Hero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else {
            this.backUp90Hero.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
    }
    Entity.prototype.draw.call(this);
}

function EnemySoldier(game, backRunSprite, frontRunSprite, backStandSprite, frontStandSprite
    , frontCrouchSprite, backCrouchSprite,  xCord, yCord, unitSpeed, health) {
    this.enemyBackRun = new Animation(backRunSprite, this.x, this.y, 102, 100, 8, 0.1, 8, true);
    this.enemyFrontRun = new Animation(frontRunSprite, this.x, this.y, 104, 100, 8, 0.1, 8, true);
    this.enemyBackStand = new Animation(backStandSprite, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.enemyFrontStand = new Animation(frontStandSprite, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.enemyBackCrouch = new Animation(frontCrouchSprite, this.x, this.y, 98, 80, 1, 0.1, 1, true);
    this.enemyFrontCrouch = new Animation(backCrouchSprite, this.x, this.y, 98, 80, 1, 0.1, 1, true);
    this.speed = unitSpeed;
    this.health = health;
    this.ctx = game.ctx;
    this.forward = true;
    this.crouch = false;
    this.unitType = "soldier";
    this.width = 95;
    this.height = 100;
    this.timer = 0;
    this.enemy = true;
    this.enemyShoot = true;
    this.standing = false;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

EnemySoldier.prototype = new Entity();
EnemySoldier.prototype.constructor = EnemySoldier;

EnemySoldier.prototype.update = function () {
    var enemyThat = this;
    this.isCollide = false;
    this.collideForward = false;
    if (this.health <= 0) this.isDead = true;
    if (this.isDead) {
        gameEngine.removeEntity(this);
        ///////////////////////////////////////////
        ///// Buff Drops everytime right now //////
        ///////////////////////////////////////////
        //Change the '* 1' inside the Math.random//
        /// to '* 10' to make it a 1/10th chance //
        ///////////////////////////////////////////
        var powerUpChance = Math.floor(Math.random() * 1)+1 ; //Generates a random number between 1-10
        if (powerUpChance === 1) {
            gameEngine.addPowerUp(new FirePowerUp(gameEngine,
                AM.getAsset("./img/firepowerup.png"), this.x, this.y + 35 ));
        }
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            this.forward = !this.forward;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    if ((Math.abs(this.x - this.game.entities[2].x) >= 400 )) this.standing = false;
    if (Math.abs(this.x - this.game.entities[2].x) <= 400 ) {
        this.timer += this.game.clockTick;
        if (this.timer >= 10 || this.timer === 0) {
            this.timer = 0;
            if (this.game.entities[2].standingStance === 1) {
                this.crouch = true;
                this.height = 40;
            }
            else if (Math.floor((Math.random() * 2) + 1) === 1) {
                this.crouch = true;
                this.height = 40;
            }
            else {
                this.crouch = false;
                this.height = 100;
            }
        }
        this.standing = true;
        if(this.x - this.game.entities[2].x < 0) this.forward = true;
        else this.forward = false;
        if (this.enemyShoot) {
            if (this.forward) {
                if (this.crouch) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 85, this.y + 55))
                    this.game.addEntity(new Bullet(this.game, this.x + 110, this.y + 60
                        , this.forward,this.firingStance, false, false, this.unitType, 300));
                }
                else {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 85, this.y + 32))
                    this.game.addEntity(new Bullet(this.game, this.x + 110, this.y + 35, this.forward
                        ,this.firingStance, false, false, this.unitType, 300));
                }
            }
            else
                if (this.crouch) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 1, this.y + 55))
                    this.game.addEntity(new Bullet(this.game, this.x -15, this.y + 60, this.forward
                        ,this.firingStance, false, false, this.unitType, 300));
                }
                else {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x - 1, this.y + 32))
                    this.game.addEntity(new Bullet(this.game, this.x - 15, this.y + 35, this.forward,this.firingStance, false
                        , false, this.unitType, 300));
                }
            this.enemyShoot = false;
            setTimeout(function(){
            enemyThat.enemyShoot = true;
        }, 500);
        }
    }
    else if (this.forward && (this.x - this.center < 100))
    if (!this.isCollide) this.x += this.game.clockTick * this.speed;
        else {
            if(!this.collideForward) this.x += this.game.clockTick * this.speed;
        }
    else if (((this.x - this.center) >= 100) && this.forward) {
        if (!this.isCollide) this.x -= this.game.clockTick * this.speed;
        else {
            if(this.collideForward) this.x -= this.game.clockTick * this.speed;
        }
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) {
        if (!this.isCollide) this.x -= this.game.clockTick * this.speed;
            else {
                if(!this.collideForward) this.x -= this.game.clockTick * this.speed;
            }
        }
    else if (((this.x - this.center) <= -100) && !this.forward) {
        if (!this.isCollide) this.x += this.game.clockTick * this.speed;
        else {
            if(!this.collideForward) this.x += this.game.clockTick * this.speed;
        }
        this.forward = true;
    }
    Entity.prototype.update.call(this);
}

EnemySoldier.prototype.draw = function () {
    if (this.forward) {
        if (this.standing) {
            if (this.crouch) this.enemyBackCrouch.drawFrame(this.game.clockTick, this.ctx
                , this.x - cameraX, this.y + cameraY + 20);
            else this.enemyFrontStand.drawFrame(this.game.clockTick, this.ctx
                , this.x - cameraX, this.y + cameraY);
        }
        else this.enemyFrontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    }
    else {
        if (this.standing) {
            if (this.crouch) this.enemyFrontCrouch.drawFrame(this.game.clockTick, this.ctx
                , this.x - cameraX, this.y + cameraY + 20);
            else this.enemyBackStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
        }
        else this.enemyBackRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY );
    }
    Entity.prototype.draw.call(this);
}

function Robot(game, backRunSprite, frontRunSprite, xCord, yCord, unitSpeed, health, unitType) {
    this.robotBackRun = new Animation(backRunSprite, this.x, this.y, 51, 49, 3, 0.1, 3, true);
    this.robotFrontRun = new Animation(frontRunSprite, this.x, this.y, 51, 49, 3, 0.1, 3, true);
    this.speed = unitSpeed;
    this.health = health;
    this.ctx = game.ctx;
    this.width = 40;
    this.unitType = unitType;
    this.enemy = true;
    this.height = 49;
    this.forward = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

Robot.prototype = new Entity();
Robot.prototype.constructor = Robot;

Robot.prototype.update = function () {
    this.isCollide = false;
    this.collideForward = false;
    if (this.health <= 0) this.isDead = true;
    if (this.isDead) {
        if (this.unitType === "redRobot") {
            for (var i = 0; i < this.game.entities.length; i++) {
                var ent = this.game.entities[i];
                if (ent !== this && (Math.abs(this.x - ent.x) <= 200)) {
                    if (Math.abs(ent.y - this.y) <= 200 ) {
                        ent.health -= 10;
                    }
                }
            }


        this.game.addEntity(new robotFlash(this.game, AM.getAsset("./img/robotFlash.png"),  this.x - 180, this.y - 180));
        }
        if (this.unitType !== "blueRobot") {
            gameEngine.removeEntity(this);

            ///////////////////////////////////////////
            ///// Buff Drops everytime right now //////
            ///////////////////////////////////////////
            //Change the '* 1' inside the Math.random//
            /// to '* 10' to make it a 1/10th chance //
            ///////////////////////////////////////////
            var powerUpChance = Math.floor(Math.random() * 1)+1 ; //Generates a random number between 1-10
            if (powerUpChance === 1) {
                gameEngine.addPowerUp(new FirePowerUp(gameEngine,
                    AM.getAsset("./img/firepowerup.png"), this.x, this.y -15 ));
            }
        }

    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.hero && (Math.abs(ent.x - this.x) < 10) ) {
            if (this.jumping) {
                this.standingStance = 2;
                if (this.frontJump.isDone() || this.backJump.isDone()) {
                    this.frontJump.elapsedTime = 0;
                    this.backJump.elapsedTime = 0;
                    this.jumping = false;
                    this.standForward = this.jumpForward;
                }
                var jumpDistance;
                if (this.frontJump.elapsedTime > 0) jumpDistance = this.frontJump.elapsedTime / this.frontJump.totalTime;
                else jumpDistance = this.backJump.elapsedTime / this.backJump.totalTime;

                if (jumpDistance > 0.5)
                    jumpDistance = 1 - jumpDistance;
                    var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));

                this.y = this.ground - height;
        }
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            this.forward = !this.forward;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    }
    if (this.isCollide) console.log(this.unitType + " " + this.isCollide);
    if (this.forward && (this.x - this.center < 100))
        if (!this.isCollide) {
            this.x += this.game.clockTick * this.speed;
        }
        else {
            if (!this.collideForward){
                this.x += this.game.clockTick * this.speed;
            }
        }
    else if (((this.x - this.center) >= 100) && this.forward) {
        if (!this.isCollide) {
            this.x -= this.game.clockTick * this.speed;
        }
        else {
            if (this.collideForward){
                this.x -= this.game.clockTick * this.speed;
            }
        }
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) {
        if (!this.isCollide) {
            this.x -= this.game.clockTick * this.speed;
        }
        else {
            if (this.collideForward){
                this.x -= this.game.clockTick * this.speed;
            }
        }
    }
    else if (((this.x - this.center) <= -100) && !this.forward && !this.isCollide) {
        if (!this.isCollide) {
            this.x += this.game.clockTick * this.speed;
        }
        else {
            if (!this.collideForward){
                this.x += this.game.clockTick * this.speed;
            }
        }
        this.forward = true;
    }
    Entity.prototype.update.call(this);
}

Robot.prototype.draw = function () {
    if (this.forward) this.robotFrontRun.drawFrame(this.game.clockTick, this.ctx
        , this.x - cameraX, this.y + cameraY);
    else if (!this.forward) this.robotBackRun.drawFrame(this.game.clockTick, this.ctx
        , this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function robotFlash(game, robotFlashSprite, xCord, yCord) {
    this.robotActiveFlash = new Animation(robotFlashSprite, this.x, this.y, 400, 400, 1, 0.3, 1, false);
    this.ctx = game.ctx;
    Entity.call(this, game, xCord, yCord);
}

robotFlash.prototype = new Entity();
robotFlash.prototype.constructor = robotFlash;

robotFlash.prototype.update = function () {
    Entity.prototype.update.call(this);
}

robotFlash.prototype.draw = function () {
    this.robotActiveFlash.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function landMine(game, landMineSprite,  xCord, yCord, health) {
    this.landMineActive = new Animation(landMineSprite, this.x, this.y, 22.75, 20, 4, 0.1, 4, true);
    this.ctx = game.ctx;
    this.width = 22;
    this.health = health;
    this.unitType = "landMine";
    this.landMine = true;
    this.enemy = true;
    this.isDead = false;
    this.height = 19;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

landMine.prototype = new Entity();
landMine.prototype.constructor = landMine;

landMine.prototype.update = function () {
    var enemyThat = this;
    this.isCollide = false;
    if (this.health <= 0) this.isDead = true;
    if (this.isDead) {
        this.removeFromWorld = true;
        this.game.addEntity(new landMineFlash(this.game, AM.getAsset("./img/landMineFlash.png"),  this.x - 5, this.y - 10));
    }
    this.collideForward = false;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            if (this.x < ent.x) this.collideForward = true;
        }
    }

    Entity.prototype.update.call(this);
}

landMine.prototype.draw = function () {
    this.landMineActive.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function landMineFlash(game, landMineFlashSprite, xCord, yCord) {
    this.landMineFlashActive = new Animation(landMineFlashSprite, this.x, this.y, 42, 43, 1, 0.3, 1, false);
    this.ctx = game.ctx;
    this.unitType = "flash";
    Entity.call(this, game, xCord, yCord);
}

landMineFlash.prototype = new Entity();
landMineFlash.prototype.constructor = landMineFlash;

landMineFlash.prototype.update = function () {
    Entity.prototype.update.call(this);
}

landMineFlash.prototype.draw = function () {
    this.landMineFlashActive.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function bulletFlash(game, bulletFlashSprite, xCord, yCord) {
    this.bulletFlashActive = new Animation(bulletFlashSprite, this.x, this.y, 11, 11, 1, 0.1, 1, false);
    this.ctx = game.ctx;
    this.unitType = "flash";
    Entity.call(this, game, xCord, yCord);
}

bulletFlash.prototype = new Entity();
bulletFlash.prototype.constructor = bulletFlash;

bulletFlash.prototype.update = function () {
    Entity.prototype.update.call(this);
}

bulletFlash.prototype.draw = function () {
    this.bulletFlashActive.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function GunTurrent(game, firingGunSprite,idleGunSprite,  xCord, yCord, health) {
    this.gunTurrentIdle = new Animation(idleGunSprite, this.x, this.y, 63, 60, 2, 0.1, 2, true);
    this.gunTurrentFiring = new Animation(firingGunSprite, this.x, this.y, 61, 60, 4, 0.6, 4, true);
    this.health = health;
    this.ctx = game.ctx;
    this.width = 40;
    this.health = health;
    this.unitType = "turrent";
    this.gunTurrent = true;
    this.enemy = true;
    this.isDead = false;
    this.enemyShoot = true;
    this.height = 60;
    this.active = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

GunTurrent.prototype = new Entity();
GunTurrent.prototype.constructor = GunTurrent;

GunTurrent.prototype.update = function () {
    var enemyThat = this;
    this.isCollide = false;
    this.collideForward = false;
    if (this.health <= 0) this.isDead = true;
    if (this.isDead) this.removeFromWorld = true;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    if (Math.abs(this.x - this.game.entities[2].x) <= 400 ) {
        this.active = true;
        if(this.x - this.game.entities[2].x > 0) this.active = true;
        else this.active = false;
        if (this.enemyShoot && this.active) {
            this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x, this.y))
            this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 30, this.forward
                ,this.firingStance, false, false, this.unitType, 300));
            this.enemyShoot = false;
            setTimeout(function(){
            enemyThat.enemyShoot = true;
        }, 1300);
        }
    }
    else this.active = false;

    Entity.prototype.update.call(this);
}

GunTurrent.prototype.draw = function () {
    if (this.active) this.gunTurrentFiring.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    else this.gunTurrentIdle.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function GiantRobot(game, firingGunSprite,idleGunSprite,  xCord, yCord, health) {
    this.gunTurrentIdle = new Animation(idleGunSprite, this.x, this.y, 257, 200, 1, 0.1, 1, true);
    this.gunTurrentFiring = new Animation(firingGunSprite, this.x, this.y, 265, 200, 2, 0.5, 2, true);
    this.health = health;
    this.ctx = game.ctx;
    this.unitType = "giantRobot";
    this.width = 200;
    this.gunTurrent = true;
    this.enemy = true;
    this.isDead = false;
    this.enemyShoot = true;
    this.height = 200;
    this.active = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

GiantRobot.prototype = new Entity();
GiantRobot.prototype.constructor = GiantRobot;

GiantRobot.prototype.update = function () {
    var enemyThat = this;
    this.isCollide = false;
    this.collideForward = false;
    if (this.health <= 0) this.isDead = true;
    if (this.isDead) this.removeFromWorld = true;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(this, ent)) {
            this.isCollide = true;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    if (Math.abs(this.x - this.game.entities[2].x) <= 400 ) {
        this.active = true;
        if(this.x - this.game.entities[2].x > 0) this.active = true;
        else this.active = false;
        if (this.enemyShoot && this.active) {
            this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 80, this.forward
                ,this.firingStance, false,false, this.unitType, 250));
            this.game.addEntity(new landMineFlash(this.game, AM.getAsset("./img/landMineFlash.png"),  this.x - 12, this.y + 60));
            this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 80, this.forward
                , 3, true,false, this.unitType, 300));
            this.game.addEntity(new Bullet(this.game, this.x - 10, this.y + 80, this.forward
                , 1, true,false, this.unitType, 150));
            this.enemyShoot = false;
            setTimeout(function(){
            enemyThat.enemyShoot = true;
        }, 1100);
        }
    }
    else this.active = false;

    Entity.prototype.update.call(this);
}

GiantRobot.prototype.draw = function () {
    if (this.active) this.gunTurrentFiring.drawFrame(this.game.clockTick, this.ctx
        , this.x - cameraX, this.y + cameraY);
    else this.gunTurrentIdle.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);
}

function FlyingRobot(game, backRunSprite, frontRunSprite, xCord, yCord, unitSpeed, health) {
    this.flyingRobotBackRun = new Animation(backRunSprite, this.x, this.y, 52, 50, 2, 0.1, 2, true);
    this.flyingRobotFrontRun = new Animation(frontRunSprite, this.x, this.y, 53, 50, 2, 0.1, 2, true);
    this.speed = unitSpeed;
    this.height = 50;
    this.width = 52;
    this.enemy = true;
    this.unitType = "flyingRobot";
    this.ctx = game.ctx;
    this.health = health;
    this.forward = true;
    this.heroInRange = false;
    this.enemyShoot = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

FlyingRobot.prototype = new Entity();
FlyingRobot.prototype.constructor = FlyingRobot;

FlyingRobot.prototype.update = function () {
    var enemyThat = this;
    if (this.health <= 0) {
        this.isDead = true;
    }
    if (this.isDead) this.removeFromWorld = true;
    if ((Math.abs(this.game.entities[2].x - this.center) < 130)) this.heroInRange = true;
    else this.heroInRange = false;
    if ((Math.abs(this.x - this.game.entities[2].x) <= 200) && this.heroInRange) {
        if (Math.abs(this.x - (this.game.entities[2].x) - 15) < 5) {
            if (this.enemyShoot) {
                if (this.forward) {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 25, this.y + 44))
                    this.game.addEntity(new Bullet(this.game, this.x + 30, this.y + 70, this.forward
                        ,this.firingStance,true, false,this.unitType, 300));
                }
                else {
                    this.game.addEntity(new bulletFlash(this.game, AM.getAsset("./img/bulletFlash.png"),  this.x + 15, this.y + 44))
                    this.game.addEntity(new Bullet(this.game, this.x + 20, this.y + 70, this.forward
                        ,this.firingStance,true, false,this.unitType, 300));
                }
                this.enemyShoot = false;
                setTimeout(function(){
                enemyThat.enemyShoot = true;
            }, 500);
            }
        }
        else if (this.x - this.game.entities[2].x > 10) {
            this.x -= this.game.clockTick * this.speed;
            this.forward = false;
        }
        else  {
            this.x += this.game.clockTick * this.speed;
            this.forward = true;
        }

    }
    else if (this.forward && (this.x - this.center < 100)) {
        this.x += this.game.clockTick * this.speed;
    }
    else if (((this.x - this.center) >= 100) && this.forward) {
        this.x -= this.game.clockTick * this.speed;
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) {
        this.x -= this.game.clockTick * this.speed;
    }
    else if (((this.x - this.center) <= -100) && !this.forward) {
        this.x += this.game.clockTick * this.speed;
        this.forward = true;
    }
    Entity.prototype.update.call(this);
}

FlyingRobot.prototype.draw = function () {
    if (this.forward) this.flyingRobotFrontRun.drawFrame(this.game.clockTick, this.ctx
        , this.x - cameraX, this.y + cameraY);
    else if (!this.forward) this.flyingRobotBackRun.drawFrame(this.game.clockTick, this.ctx
        , this.x - cameraX, this.y + cameraY);
    Entity.prototype.draw.call(this);

}

function Bullet(game, startX, startY, direction, firingStance, standing, unitFlying, unitType, speed) {
    this.isBullet = true;
    this.speed = speed;
    this.ctx = game.ctx;
    this.firingStance = firingStance;
    this.width = 2;
    this.height = 2;
    this.unitType = unitType;
    this.isFlying = unitFlying;
    this.gameGround = 610;
    this.standing = standing;
    this.startX = startX;
    this.forward = direction;
    Entity.call(this, game, startX, startY);
}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
    this.isCollide = false;
    this.collideForward = false
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if ((ent.unitType !== "flash") && ent !== this && collide(this, ent)) {
            this.isCollide = true;
            if (this.x < ent.x) this.collideForward = true;
        }
    }
    if (this.isCollide) {
        this.isDead;
    }
    if (this.unitType === "flyingRobot") {
        this.y += this.game.clockTick * this.speed;
    }
    if (this.forward) {
        if (this.x >= this.startX + 500 || this.y > this.gameGround) {
            this.removeFromWorld = true;
        }
        else if (!this.standing) this.x += this.game.clockTick * this.speed;
        else if (this.firingStance === 4) this.y -= this.game.clockTick * this.speed;
        else if (this.firingStance === 2) this.x += this.game.clockTick * this.speed;
        else if (this.firingStance === 3) {
            this.x += this.game.clockTick * this.speed;
            this.y -= this.game.clockTick * this.speed;
        }
        else if (this.firingStance === 1) {
            this.x += this.game.clockTick * this.speed;
            this.y += this.game.clockTick * this.speed;
        }
    }
    else {
        if (this.unitType === "giantRobot" && this.y > this.gameGround) this.firingStance = 2;
        if (this.x <= this.startX - 500 ) this.removeFromWorld = true;
        if ( this.y > this.gameGround && this.unitType !== "giantRobot") {
             this.removeFromWorld = true;
        }
        else if (!this.standing) this.x -= this.game.clockTick * this.speed;
        else if (this.firingStance === 4) this.y -= this.game.clockTick * this.speed;
        else if (this.firingStance === 2) this.x -= this.game.clockTick * this.speed;
        else if (this.firingStance === 3 && this.standing) {
            this.x -= this.game.clockTick * this.speed;
            this.y -= this.game.clockTick * this.speed;
        }
        else if (this.firingStance === 1 && this.standing) {
            this.x -= this.game.clockTick * this.speed;
            this.y += this.game.clockTick * this.speed;
        }
    }
    Entity.prototype.update.call(this);
}

Bullet.prototype.draw = function () {
    if (this.unitType === "giantRobot") {
        this.ctx.fillStyle = "White";
        this.ctx.beginPath();
        this.ctx.arc(this.x - cameraX,this.y + cameraY ,10,0,8*Math.PI); //this might be wrong
        this.ctx.closePath();
        this.ctx.fill();

    }
    else {
        this.ctx.fillStyle = "White";
        this.ctx.beginPath();
        this.ctx.arc(this.x - cameraX,this.y + cameraY ,4,0,2*Math.PI); //this might be wrong
        this.ctx.closePath();
        this.ctx.fill();
    }
    Entity.prototype.draw.call(this);
}

//------- Music --------

function playaudio(obj,audiofile) {
  if (obj.mp3) {
      if(obj.mp3.paused) obj.mp3.play();
      else obj.mp3.pause();
  } else {
      obj.mp3 = new Audio(audiofile);
      obj.mp3.play();
  }
  obj.innerHTML = (obj.mp3.paused) ? "Play" : "Pause";
}

//----- End of Music ----


AM.queueDownload("./img/backDown45Hero.png");
AM.queueDownload("./img/backDown45RunHero.png");
AM.queueDownload("./img/backUp45Hero.png");
AM.queueDownload("./img/backUp45RunHero.png");
AM.queueDownload("./img/frontDown45Hero.png");
AM.queueDownload("./img/frontDown45RunHero.png");
AM.queueDownload("./img/frontUp45Hero.png");
AM.queueDownload("./img/frontUp45RunHero.png");
AM.queueDownload("./img/backgroundtrees.jpg");
AM.queueDownload("./img/backCrawl.png");
AM.queueDownload("./img/runningHero.png");
AM.queueDownload("./img/backwardHero.png");
AM.queueDownload("./img/backJump.png");
AM.queueDownload("./img/backwardStand.png");
AM.queueDownload("./img/frontJump.png");
AM.queueDownload("./img/frontStanding.png");
AM.queueDownload("./img/frontCrawl.png");
AM.queueDownload("./img/red_Robot.png");
AM.queueDownload("./img/blue_Robot.png");
AM.queueDownload("./img/orange_Robot.png");
AM.queueDownload("./img/green_Robot.png");
AM.queueDownload("./img/enemySoldier_Backward.png");
AM.queueDownload("./img/enemySoldier_Foward.png");
AM.queueDownload("./img/flyingRobot_Backward.png");
AM.queueDownload("./img/flyingRobot_Forward.png");
AM.queueDownload("./img/ForestTiles.png");
AM.queueDownload("./img/topGroundDark.png");
AM.queueDownload("./img/treeTrunk.png");
AM.queueDownload("./img/leaf1.png");
AM.queueDownload("./img/leaf2.png");
AM.queueDownload("./img/leaf3.png");
AM.queueDownload("./img/leaf4.png");
AM.queueDownload("./img/leaf5.png");
AM.queueDownload("./img/ground1.png");
AM.queueDownload("./img/ground2.png");
AM.queueDownload("./img/ground3.png");
AM.queueDownload("./img/ground4.png");
AM.queueDownload("./img/ground5.png");
AM.queueDownload("./img/nwGround.png");
AM.queueDownload("./img/neGround.png");
AM.queueDownload("./img/swGround.png");
AM.queueDownload("./img/seGround.png");
AM.queueDownload("./img/enemySoldier_StandingBackward.png");
AM.queueDownload("./img/enemySoldier_StandingFoward.png");
AM.queueDownload("./img/enemySoldier_CrouchBackward.png");
AM.queueDownload("./img/enemySoldier_CrouchFoward.png");
AM.queueDownload("./img/firepowerup.png");
AM.queueDownload("./img/idleGunTurrent.png");
AM.queueDownload("./img/firingGunTurrent.png");
AM.queueDownload("./img/giantRobotFoward.png");
AM.queueDownload("./img/giantRobotFiringFoward.png");
AM.queueDownload("./img/backCrouchHero.png");
AM.queueDownload("./img/backDamageHero.png");
AM.queueDownload("./img/backDown90Hero.png");
AM.queueDownload("./img/backUp90Hero.png");
AM.queueDownload("./img/fowardUp90Hero.png");
AM.queueDownload("./img/frontCrouchHero.png");
AM.queueDownload("./img/frontDamageHero.png");
AM.queueDownload("./img/frontDown90Hero.png");
AM.queueDownload("./img/landMines.png");
AM.queueDownload("./img/landMineFlash.png");
AM.queueDownload("./img/robotFlash.png");
AM.queueDownload("./img/bulletFlash.png");
AM.queueDownload("./img/frontDamageHero.png");
AM.queueDownload("./img/backDamageHero.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    //var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.start();

    var heroSprite = [AM.getAsset("./img/runningHero.png"), AM.getAsset("./img/backwardHero.png")
    , AM.getAsset("./img/frontStanding.png"), AM.getAsset("./img/backwardStand.png"), AM.getAsset("./img/frontJump.png")
    , AM.getAsset("./img/backJump.png"), AM.getAsset("./img/backCrawl.png"), AM.getAsset("./img/frontCrawl.png")
    , AM.getAsset("./img/frontUp45Hero.png"), AM.getAsset("./img/frontUp45RunHero.png"), AM.getAsset("./img/frontDown45Hero.png")
    , AM.getAsset("./img/frontDown45RunHero.png"), AM.getAsset("./img/backUp45Hero.png"), AM.getAsset("./img/backUp45RunHero.png")
    , AM.getAsset("./img/backDown45Hero.png"), AM.getAsset("./img/backDown45RunHero.png"), AM.getAsset("./img/frontDown90Hero.png")
    , AM.getAsset("./img/frontDamageHero.png"), AM.getAsset("./img/frontCrouchHero.png"), AM.getAsset("./img/fowardUp90Hero.png")
    , AM.getAsset("./img/backUp90Hero.png"), AM.getAsset("./img/backDown90Hero.png"), AM.getAsset("./img/backDamageHero.png")
    , AM.getAsset("./img/backCrouchHero.png"), AM.getAsset("./img/frontDamageHero.png"), AM.getAsset("./img/backDamageHero.png")];


    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/backgroundtrees.jpg")));

    gameEngine.addEntity(new Platform(gameEngine));

    gameEngine.addEntity(new Hero(gameEngine, heroSprite, 200, 525, 5, 3));

    gameEngine.addEntity(new Camera(gameEngine));

   gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/red_Robot.png"), AM.getAsset("./img/red_Robot.png"), 350, 575, 60, 1, "redRobot"));

    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/blue_Robot.png"), AM.getAsset("./img/blue_Robot.png"), 1200, 575, 60, 1, "blueRobot"));

    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/orange_Robot.png"), AM.getAsset("./img/orange_Robot.png"), 1800, 575, 60, 1, "orangeRobot"));

    //gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/green_Robot.png"), AM.getAsset("./img/green_Robot.png"), 2300, 575, 60, 1, "greenRobot"));

    //gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png")
    //, AM.getAsset("./img/enemySoldier_Foward.png"), AM.getAsset("./img/enemySoldier_StandingBackward.png")
    //, AM.getAsset("./img/enemySoldier_StandingFoward.png"),AM.getAsset("./img/enemySoldier_CrouchFoward.png")
    //, AM.getAsset("./img/enemySoldier_CrouchBackward.png"), 800, 525, 200, 3));

    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png")
    , AM.getAsset("./img/flyingRobot_Forward.png"), 1300, 100, 60, 2));

    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png")
    , AM.getAsset("./img/enemySoldier_Foward.png"), AM.getAsset("./img/enemySoldier_StandingBackward.png")
    , AM.getAsset("./img/enemySoldier_StandingFoward.png"),AM.getAsset("./img/enemySoldier_CrouchFoward.png")
    , AM.getAsset("./img/enemySoldier_CrouchBackward.png"), 1600, 330, 200, 3));

    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png")
    , AM.getAsset("./img/enemySoldier_Foward.png"), AM.getAsset("./img/enemySoldier_StandingBackward.png")
    , AM.getAsset("./img/enemySoldier_StandingFoward.png"),AM.getAsset("./img/enemySoldier_CrouchFoward.png")
    , AM.getAsset("./img/enemySoldier_CrouchBackward.png"), 2100, 525, 200, 3));

    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png")
    , AM.getAsset("./img/enemySoldier_Foward.png"), AM.getAsset("./img/enemySoldier_StandingBackward.png")
    , AM.getAsset("./img/enemySoldier_StandingFoward.png"),AM.getAsset("./img/enemySoldier_CrouchFoward.png")
    , AM.getAsset("./img/enemySoldier_CrouchBackward.png"), 2500, 525, 200, 3));

    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png")
    , AM.getAsset("./img/flyingRobot_Forward.png"), 400, 100, 60, 2));

    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png")
    , AM.getAsset("./img/flyingRobot_Forward.png"), 1000, 300, 60, 2));

    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png")
    , AM.getAsset("./img/flyingRobot_Forward.png"), 1700, 100, 60, 2));

    //gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png")
    //, AM.getAsset("./img/flyingRobot_Forward.png"), 500, 200,60, 2));

    //gameEngine.addEntity(new GunTurrent(gameEngine, AM.getAsset("./img/firingGunTurrent.png")
    //, AM.getAsset("./img/idleGunTurrent.png"),700, 565, 5));

    gameEngine.addEntity(new GiantRobot(gameEngine, AM.getAsset("./img/giantRobotFiringFoward.png")
    , AM.getAsset("./img/giantRobotFoward.png"),2850,427, 8));

    gameEngine.addEntity(new landMine(gameEngine, AM.getAsset("./img/landMines.png"),200,610, 5));

    gameEngine.addPowerUp(new FirePowerUp(gameEngine, AM.getAsset("./img/firepowerup.png")));

    playaudio(gameEngine, "./music/Top5Songs.mp3")

        console.log("All Done!");
});
