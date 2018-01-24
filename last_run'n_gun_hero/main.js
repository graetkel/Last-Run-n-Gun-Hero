var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
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

}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    var scaleBy = scaleBy || 1;
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
    ctx.strokeStyle = "Green";
    ctx.strokeRect(x, y, this.frameWidth * scaleBy, this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

// inheritance 
function Hero(game, spritesheet, spritesheet2, spriteSheet3, spriteSheet4,spriteSheet5,spriteSheet6, spriteSheet7, spriteSheet8, spriteSheet9, spriteSheet10
            , spriteSheet11) {
    this.frontRun = new Animation(spritesheet, this.x, this.y, 105, 100, 8, 0.1, 8, true);
    this.backRun = new Animation(spritesheet2, this.x, this.y, 105, 100, 8, 0.1, 8, true);
    this.frontStand = new Animation(spriteSheet3, this.x, this.y, 105, 105, 1, 0.1, 1, true);
    this.backStand = new Animation(spriteSheet4, this.x, this.y, 105, 105, 1, 0.1, 1, true);
    this.frontJump = new Animation(spriteSheet5, this.x, this.y, 105, 105, 1, 2, 1, false);
    this.backJump = new Animation(spriteSheet6, this.x, this.y, 105, 105, 1, 2, 1, false);
    this.backCrawl = new Animation(spriteSheet8, this.x, this.y, 141, 100, 1, 0.1, 1, true);
    this.frontCrawl = new Animation(spriteSheet9, this.x, this.y, 141, 100, 1, 0.1, 1, true);
    this.jumping = false;
    this.speed = 200;
    this.ctx = game.ctx;
    this.ground = 400;
    this.radius = 100;
    this.runFlag = false;
    this.standForward = true;
    Entity.call(this, game, 0, 400);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;
Hero.prototype.update = function () {
    if (this.game.a) {
        if (!this.jumping) this.jumpForward = false;
        this.standForward = false;
        this.runFlag = true;
    }
    if (this.game.d) {
        if (!this.jumping) this.jumpForward = true;
        this.standForward = true;
        this.runFlag = true;
    }
   
    if (!this.game.a && !this.game.d) {
        this.runFlag = false;
    }
    if (this.game.s) this.crawlForward = true;
    else this.crawlForward = false;
    if (this.game.space) {
        this.jumping = true;
    }
    if (this.jumping && this.runFlag ) {
        if (this.frontJump.isDone() || this.backJump.isDone()) {
            this.frontJump.elapsedTime = 0;
            this.backJump.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance;
        if (this.frontJump.elapsedTime > 0) jumpDistance = this.frontJump.elapsedTime / this.frontJump.totalTime;
        else jumpDistance = this.backJump.elapsedTime / this.backJump.totalTime;
        var totalHeight = 200;
        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        if (this.standForward) this.x += this.game.clockTick * this.speed;
        else this.x -= this.game.clockTick * this.speed;
    }
    else if (this.jumping) {
        if (this.frontJump.isDone() || this.backJump.isDone()) {
            this.frontJump.elapsedTime = 0;
            this.backJump.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance;
        if (this.frontJump.elapsedTime > 0) jumpDistance = this.frontJump.elapsedTime / this.frontJump.totalTime;
        else jumpDistance = this.backJump.elapsedTime / this.backJump.totalTime;
        var totalHeight = 200;
        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }

    else if (this.crawlForward) {

    }

    else if (this.runFlag && this.standForward && !this.crawlForward) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > 800) this.x = -230;
    }

    else if ((this.runFlag && !this.standForward && !this.crawlForward)) {

        this.x -= this.game.clockTick * this.speed;
        if (this.x < -200) this.x = 800;    
    }  

    Entity.prototype.update.call(this);

}

Hero.prototype.draw = function () {
    if (this.jumping && this.jumpForward) {    
        this.frontJump.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else if (this.jumping && !this.jumpForward) {
        this.backJump.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else if (this.crawlForward && this.standForward) {
        this.frontCrawl.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else if (this.crawlForward && !this.standForward) {
        this.backCrawl.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    
    else if (this.runFlag && this.standForwardw ) {
        this.frontRun.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    else if (this.runFlag && !this.standForward ) {
        this.backRun.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    else if (!this.runFlag && this.standForward) {

        this.frontStand.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else if (!this.runFlag && !this.standForward) {
        this.backStand.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);
}
AM.queueDownload("./img/backCrawl.png");
AM.queueDownload("./img/runningHero.png");
AM.queueDownload("./img/backwardHero.png");
AM.queueDownload("./img/backJump.png");
AM.queueDownload("./img/backwardStand.png");
AM.queueDownload("./img/frontJump.png");
AM.queueDownload("./img/frontStanding.png");
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/frontCrawl.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/runningHero.png"), AM.getAsset("./img/backwardHero.png"), AM.getAsset("./img/frontStanding.png")
                        , AM.getAsset("./img/backwardStand.png"), AM.getAsset("./img/frontJump.png"), AM.getAsset("./img/backJump.png")
                        , AM.getAsset("./img/bullet.png"), AM.getAsset("./img/backCrawl.png"), AM.getAsset("./img/frontCrawl.png")
                        , AM.getAsset("./img/backCrawl.png")));
    console.log("All Done!");
});
