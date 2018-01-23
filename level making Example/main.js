function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    //this.goundMossTop = new Animation(ASSET_MANAGER.getAsset("./img/ForestTiles.png"), 60, 190, 50, 50, 1, 1, true, false);
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}



Background.prototype.draw = function (ctx) {
    var grid = [['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ','u','l','i',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ','l','l','l',' ',' ',' ',' ',' ',' ','w','w','w','w','w','w','w',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ','l','l','l',' ',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ','o','l','p',' ',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','w',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ','d',' ',' ',' ',' ',' ','d',' ',' ',' ',' ',' ','z'],
 ['x',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ','d',' ',' ',' ',' ',' ','d',' ',' ',' ',' ',' ','z'],
 ['c','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','c'],
 ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c']];
    ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(startX, StartY, Width, Height)
    var sqFt = 25;
    var xAxis, yAxis;
    //var canvasX = grid[0].length;
    //var canvasY = grid.length;
    //console.log("canX : " + grid[0].length + " canY: " + grid.length);

    for (yAxis = 0; yAxis < grid.length; yAxis++) {
      for (xAxis = 0; xAxis < grid[0].length; xAxis++) {
        var obstacle = grid[yAxis][xAxis];

        function tilePicker(color) {
          ctx.fillStyle = color;
          ctx.fillRect(sqFt*xAxis,25 + sqFt*yAxis,sqFt,sqFt);
        };
        switch(obstacle) {
          case 'c': // middle ground
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/ground1.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'v': // top ground
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/ground2.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'z': // left ground
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/ground3.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'x': // right ground
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/ground4.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 't': // tree trunk
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/treeTrunk.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'l': // middle leaf
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/leaf1.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'u': // NW leaf
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/leaf2.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'i': // NE leaf
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/leaf3.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'o': // SW leaf
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/leaf4.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'p': // SE leaf
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/leaf5.png"), sqFt*xAxis, 25 + sqFt*yAxis, sqFt, sqFt);
          break;
          case 'w': // concrete walls
            tilePicker("gray");
          break;
          case 'd': // door
            tilePicker("SaddleBrown");
          break;
        }

        //ctx.fillRect(50*xAxis,50*yAxis,50,50);
      }
    }
    //ctx.fillRect(0,500,800,50);

    Entity.prototype.draw.call(this);
}

function Unicorn(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.02, 40, false, true);
    this.jumping = false;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400);
}

Unicorn.prototype = new Entity();
Unicorn.prototype.constructor = Unicorn;

Unicorn.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    Entity.prototype.update.call(this);
}

Unicorn.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
ASSET_MANAGER.queueDownload("./img/ForestTiles.png");
ASSET_MANAGER.queueDownload("./img/topGroundDark.png");
ASSET_MANAGER.queueDownload("./img/treeTrunk.png");
ASSET_MANAGER.queueDownload("./img/leaf1.png");
ASSET_MANAGER.queueDownload("./img/leaf2.png");
ASSET_MANAGER.queueDownload("./img/leaf3.png");
ASSET_MANAGER.queueDownload("./img/leaf4.png");
ASSET_MANAGER.queueDownload("./img/leaf5.png");
ASSET_MANAGER.queueDownload("./img/ground1.png");
ASSET_MANAGER.queueDownload("./img/ground2.png");
ASSET_MANAGER.queueDownload("./img/ground3.png");
ASSET_MANAGER.queueDownload("./img/ground4.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var unicorn = new Unicorn(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(unicorn);

    gameEngine.init(ctx);
    gameEngine.start();
});
