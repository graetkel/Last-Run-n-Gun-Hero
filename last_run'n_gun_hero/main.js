var AM = new AssetManager();
var Background1 = 0;
var Background2 = 0;

//In order to get the camera feature to work make sure every
//x position value is its position - cameraX

//The Game is 3200x700
//The Canvas is 800x700

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
        //ctx.strokeStyle = "Green";
        //ctx.strokeRect(x, y, this.frameWidth * scaleBy, this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/**
 * These next 3 functions are the first level background image
 * setup to repeat infinitely.
 */
function Background(game, spritesheet) {
    this.x = -1000;
    this.y = 0;
    this.speed = -150
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.update = function () {

    if (this.game.d) {
        this.x += this.game.clockTick * this.speed * 0.75;
    }
    if (this.game.a) {
        this.x -= this.game.clockTick * this.speed * 0.75;
    }
    if (this.x < -2083) this.x = Background2 + 2075;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
    Background1 = this.x;
};


/**
 * These next 3 functions are the first level background image
 * setup to repeat infinitely.
 */
function BackgroundTwo(game, spritesheet) {
    this.x = 1078;
    this.y = 0;
    this.speed = -150;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

BackgroundTwo.prototype.update = function () {

    var mod = 0.75;



    if (this.game.d) {
        this.x += this.game.clockTick * this.speed * mod;
    }
    if (this.game.a) {
        this.x -= this.game.clockTick * this.speed * mod;
    }
    if (this.x < -2083) this.x = Background1 + 2075;
};

BackgroundTwo.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
    Background2 = this.x;
};


var map = {
    cols: 128,
    rows: 28,
    tsize: 64,
    layer: [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','v','v','v','v','v',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ','v','v','v','v','v',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','u','l','l','l','i',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','l','l','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','v','v','v','v',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','l','l','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','o','l','l','l','p',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','v','v','v','v','v','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','u','l','l','l','i',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','l','l','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','l','l','l','l','l',' ',' ',' ',' ',' ',' ','u','l','i',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','l','l','l','l','l',' ',' ',' ',' ',' ',' ','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','o','l','l','l','p',' ',' ',' ',' ',' ',' ','l','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ','o','l','p',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ','c','c','c','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',],
['c','c','c','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v','v',],
['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',],
['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',],
['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c',]]
}

// no inheritance
//CHANGED from Background to Platform
function Platform(game) {
    this.x = 0;
    this.y = 0;
    this.speed = -300
    this.game = game;
    this.ctx = game.ctx;
};

Platform.prototype.draw = function () {
    var posX = this.x - cameraX;
    //-----
    //ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(startX, StartY, Width, Height)
    var sqFt = 25;
    var xAxis, yAxis;
    //var canvasX = grid[0].length;
    //var canvasY = grid.length;
    //console.log("canX : " + grid[0].length + " canY: " + grid.length);

    for (yAxis = 0; yAxis < map.rows; yAxis++) {
      for (xAxis = 0; xAxis < map.cols; xAxis++) {
        //if (Math.abs(sqFt*xAxis - this.game.entities[3].x) < 300 && Math.abs(25 + sqFt*yAxis - this.game.entities[3].y) < 300) {
        var obstacle = map.layer[yAxis][xAxis];

            function tilePicker(color) {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
            };
            switch (obstacle) {
                case 'c': // middle ground
                    this.ctx.drawImage(AM.getAsset("./img/ground1.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'v': // top ground
                    this.ctx.drawImage(AM.getAsset("./img/ground2.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'z': // left ground
                    this.ctx.drawImage(AM.getAsset("./img/ground3.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'x': // right ground
                    this.ctx.drawImage(AM.getAsset("./img/ground4.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 't': // tree trunk
                    this.ctx.drawImage(AM.getAsset("./img/treeTrunk.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'l': // middle leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf1.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'u': // NW leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf2.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'i': // NE leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf3.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'o': // SW leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf4.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'p': // SE leaf
                    this.ctx.drawImage(AM.getAsset("./img/leaf5.png"), sqFt * xAxis - cameraX, 25 + sqFt * yAxis, sqFt, sqFt);
                    break;
                case 'w': // concrete walls
                    //tilePicker("gray");
                    break;
                case 'd': // door
                    //tilePicker("SaddleBrown");
                    break;
            }

            //ctx.fillRect(50*xAxis,50*yAxis,50,50);
          //}
        }
    }
    //ctx.fillRect(0,500,800,50);

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

Camera.prototype.move = function(xAmt, yAmt) {
  this.xOffset += xAmt; //I dont think this will work
  this.yOffset += yAmt;
}

var cameraX = 0;

Camera.prototype.update = function() {
  //This if statement might need to be two seperate if statements
  // if (this.xOffset != this.game.entities[1].x && this.yOffset != this.game.entities[1].y) {
  //   this.xOffset = this.game.entities[1].x;
  //   this.yOffset = this.game.entities[1].y;
  // }


  //this.game.ctx.canvas.width = 3200;
  cameraMid = this.game.ctx.canvas.width / 2;
  if (this.game.entities[3].x < cameraMid) {
    cameraX = 0;
  } else if (this.game.entities[3].x > 3200 - cameraMid) {
    cameraX = 3200 - this.game.ctx.canvas.width;
  } else {
    cameraX = this.game.entities[3].x - cameraMid;
  }

}

Camera.prototype.draw = function() {
}




// inheritance
function Hero(game, spritesheet, spritesheet2, spriteSheet3, spriteSheet4, spriteSheet5, spriteSheet6, spriteSheet7, spriteSheet8, spriteSheet9, spriteSheet10
    , spriteSheet11) {
    this.frontRun = new Animation(spritesheet, this.x, this.y, 104, 101, 8, 0.1, 8, true);
    this.backRun = new Animation(spritesheet2, this.x, this.y, 104, 102, 8, 0.1, 8, true);
    this.frontStand = new Animation(spriteSheet3, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.backStand = new Animation(spriteSheet4, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.frontJump = new Animation(spriteSheet5, this.x, this.y, 105, 107, 1, 2, 1, false);
    this.backJump = new Animation(spriteSheet6, this.x, this.y, 105, 103, 1, 2, 1, false);
    this.backCrawl = new Animation(spriteSheet8, this.x, this.y, 138, 100, 1, 0.1, 1, true);
    this.frontCrawl = new Animation(spriteSheet9, this.x, this.y, 141, 100, 1, 0.1, 1, true);
    this.jumping = false;
    this.speed = 200;
    this.ctx = game.ctx;
    this.ground = 525;
    this.radius = 100;
    this.runFlag = false;
    this.firing = false;
    this.CanShoot = true;
    this.jumpForward = true;
    this.standForward = true;
    Entity.call(this, game, 100, 525);
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

    if (this.game.shooting) this.firing = true;
    else this.firing = false;

    if (this.game.s) this.crawlForward = true;
    else this.crawlForward = false;

    if (this.game.space) {
        this.jumping = true;
    }


    //Moved these variables outside of the next If/Else Statement
    //to simplify and make code easier to read
    var totalHeight = 200;
    var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));

    if (this.jumping && this.runFlag) {

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

        if (this.standForward) this.x += (this.game.clockTick * this.speed) / 2;
        else if(this.x >= 40) this.x -= (this.game.clockTick * this.speed) / 2;
    }
    else if (this.jumping) {
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

    //else if (this.crawlForward) {

    //}

    else if (this.runFlag && this.standForward && !this.crawlForward) {
        this.x += this.game.clockTick * this.speed;
    }

    else if ((this.runFlag && !this.standForward && !this.crawlForward)) {

        if(this.x >= 40) this.x -= this.game.clockTick * this.speed;
    }
    that = this;

    if (this.firing) {
    
        if (this.CanShoot) {
            if (this.standForward) {
                if (this.crawlForward) {
                    this.game.addEntity(new Bullet(this.game, this.x + 140, this.y + 85, this.standForward));
                   // this.game.addEntity(new BulletFlash(this.game, AM.getAsset("./img/BulletFlash.png"), this.x + 140, this.y + 85, this.standForward));
                }
                else {
                    this.game.addEntity(new Bullet(this.game, this.x + 100, this.y + 35, this.standForward));
                    //this.game.addEntity(new BulletFlash(this.game, AM.getAsset("./img/BulletFlash.png"), this.x + 100, this.y + 35, this.standForward));
                }
            }
            else {
               if (this.crawlForward) {
                   this.game.addEntity(new Bullet(this.game, this.x - 40, this.y + 85, this.standForward));
                  // this.game.addEntity(new BulletFlash(this.game, AM.getAsset("./img/BulletFlash.png"), this.x - 40, this.y + 85, this.standForward));
               }
               else {
                   this.game.addEntity(new Bullet(this.game, this.x, this.y + 35, this.standForward));
                  // this.game.addEntity(new BulletFlash(this.game, AM.getAsset("./img/BulletFlash.png"), this.x, this.y + 35, this.standForward));
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
  
    if (this.jumping && this.jumpForward) {
        this.frontJump.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (this.jumping && !this.jumpForward) {
        this.backJump.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (this.crawlForward && this.standForward) {
        this.frontCrawl.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (this.crawlForward && !this.standForward) {
        this.backCrawl.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }

    else if (this.runFlag && this.standForward) {
        this.frontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (this.runFlag && !this.standForward) {
        this.backRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (!this.runFlag && this.standForward) {

        this.frontStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else if (!this.runFlag && !this.standForward) {
        this.backStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }

    Entity.prototype.draw.call(this);
}

function EnemySoldier(game, spritesheet1, spritesheet2, spritesheet3, spritesheet4, xCord, yCord, unitSpeed) {
    this.enemyBackRun = new Animation(spritesheet1, this.x, this.y, 101, 100, 8, 0.1, 8, true);
    this.enemyFrontRun = new Animation(spritesheet2, this.x, this.y, 103, 100, 8, 0.1, 8, true);
    this.enemyBackStand = new Animation(spritesheet3, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.enemyFrontStand = new Animation(spritesheet4, this.x, this.y, 98, 100, 1, 0.1, 1, true);
    this.speed = unitSpeed;
    this.ctx = game.ctx;
    this.forward = true;
    this.enemyShoot = true;
    this.standing = false;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

EnemySoldier.prototype = new Entity();
EnemySoldier.prototype.constructor = Robot;
EnemySoldier.prototype.update = function () {
    var enemyThat = this;
    if ((Math.abs(this.x - this.game.entities[3].x) >= 400 )) this.standing = false;
    if (Math.abs(this.x - this.game.entities[3].x) <= 400 ) {
        this.standing = true;
        if(this.x - this.game.entities[3].x < 0) this.forward = true;
        else this.forward = false;
      
        if (this.enemyShoot) {
            if (this.forward) this.game.addEntity(new Bullet(this.game, this.x + 100, this.y + 35, this.forward));
            else this.game.addEntity(new Bullet(this.game, this.x, this.y + 35, this.forward));

            this.enemyShoot = false;
            setTimeout(function(){
            enemyThat.enemyShoot = true;

        }, 500);

        }
    }

    else if (this.forward && (this.x - this.center < 100)) this.x += this.game.clockTick * this.speed;
    else if (((this.x - this.center) >= 100) && this.forward) {
        this.x -= this.game.clockTick * this.speed;
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) this.x -= this.game.clockTick * this.speed;
    else if (((this.x - this.center) <= -100) && !this.forward) {
        this.x += this.game.clockTick * this.speed;
        this.forward = true;
    }

    Entity.prototype.update.call(this);


}

EnemySoldier.prototype.draw = function () {
    if (this.forward) {
        if (this.standing) this.enemyFrontStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
        else this.enemyFrontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    else {
        if (this.standing) this.enemyBackStand.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
        else this.enemyBackRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    }
    Entity.prototype.draw.call(this);

}

function Robot(game, spritesheet1, spritesheet2, xCord, yCord, unitSpeed) {
    this.robotBackRun = new Animation(spritesheet1, this.x, this.y, 51, 48, 3, 0.1, 3, true);
    this.robotFrontRun = new Animation(spritesheet2, this.x, this.y, 51, 48, 3, 0.1, 3, true);
    this.speed = unitSpeed;
    this.ctx = game.ctx;
    this.forward = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

Robot.prototype = new Entity();
Robot.prototype.constructor = Robot;
Robot.prototype.update = function () {
    if (this.forward && (this.x - this.center < 100)) this.x += this.game.clockTick * this.speed;
    else if (((this.x - this.center) >= 100) && this.forward) {
        this.x -= this.game.clockTick * this.speed;
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) this.x -= this.game.clockTick * this.speed;
    else if (((this.x - this.center) <= -100) && !this.forward) {
        this.x += this.game.clockTick * this.speed;
        this.forward = true;
    }

    Entity.prototype.update.call(this);


}
Robot.prototype.draw = function () {
    if (this.forward) this.robotFrontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    else if (!this.forward) this.robotBackRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    Entity.prototype.draw.call(this);

}

function FlyingRobot(game, spritesheetL, spritesheetR, xCord, yCord, unitSpeed) {
    this.flyingRobotBackRun = new Animation(spritesheetL, this.x, this.y, 52, 50, 2, 0.1, 2, true);
    this.flyingRobotFrontRun = new Animation(spritesheetR, this.x, this.y, 52, 50, 2, 0.1, 2, true);
    this.speed = unitSpeed;
    this.ctx = game.ctx;
    this.forward = true;
    this.center = xCord;
    Entity.call(this, game, xCord, yCord);
}

FlyingRobot.prototype = new Entity();
FlyingRobot.prototype.constructor = FlyingRobot;
FlyingRobot.prototype.update = function () {

    if (this.forward && (this.x - this.center < 100)) this.x += this.game.clockTick * this.speed;
    else if (((this.x - this.center) >= 100) && this.forward) {
        this.x -= this.game.clockTick * this.speed;
        this.forward = false;
    }
    else if (!this.forward && (this.x - this.center > -100)) this.x -= this.game.clockTick * this.speed;
    else if (((this.x - this.center) <= -100) && !this.forward) {
        this.x += this.game.clockTick * this.speed;
        this.forward = true;
    }

    Entity.prototype.update.call(this);


}
FlyingRobot.prototype.draw = function () {
    if (this.forward) this.flyingRobotFrontRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    else if (!this.forward) this.flyingRobotBackRun.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);
    Entity.prototype.draw.call(this);

}

function Bullet(game, startX, startY, direction) {
    this.speed = 300;
    this.ctx = game.ctx;
    this.forward = direction;
    Entity.call(this, game, startX, startY);
}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;
Bullet.prototype.update = function () {
    if (this.forward) this.x += this.game.clockTick * this.speed;
    else this.x -= this.game.clockTick * this.speed;

    Entity.prototype.update.call(this);


}
Bullet.prototype.draw = function () {
    this.ctx.fillStyle = "White";
    this.ctx.beginPath();
    this.ctx.arc(this.x - cameraX,this.y ,4,0,2*Math.PI); //this might be wrong
    this.ctx.closePath();
    this.ctx.fill();

    Entity.prototype.draw.call(this);

}
function BulletFlash(game, spriteSheet, startX, startY, direction) {
    this.bulletFlash = new Animation(spriteSheet, this.x, this.y, 15, 14, 1, 0.1, 1, true);
    this.ctx = game.ctx;
    this.forward = direction;
    Entity.call(this, game, startX, startY);
}

BulletFlash.prototype = new Entity();
BulletFlash.prototype.constructor = BulletFlash;
BulletFlash.prototype.update = function () {
    Entity.prototype.update.call(this);

}
BulletFlash.prototype.draw = function () {

    this.bulletFlash.drawFrame(this.game.clockTick, this.ctx, this.x - cameraX, this.y);

    Entity.prototype.draw.call(this);

}

//AM.queueDownload("./img/bulletFlash.jpg");
AM.queueDownload("./img/backgroundtrees.jpg");
AM.queueDownload("./img/backgroundtrees1.jpg");
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
AM.queueDownload("./img/enemySoldier_StandingBackward.png");
AM.queueDownload("./img/enemySoldier_StandingFoward.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/backgroundtrees.jpg")));
    gameEngine.addEntity(new BackgroundTwo(gameEngine, AM.getAsset("./img/backgroundtrees1.jpg")));
    gameEngine.addEntity(new Platform(gameEngine));
    gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/runningHero.png"), AM.getAsset("./img/backwardHero.png"), AM.getAsset("./img/frontStanding.png")
        , AM.getAsset("./img/backwardStand.png"), AM.getAsset("./img/frontJump.png"), AM.getAsset("./img/backJump.png")
        , AM.getAsset("./img/bullet.png"), AM.getAsset("./img/backCrawl.png"), AM.getAsset("./img/frontCrawl.png")
        , AM.getAsset("./img/backCrawl.png")));
    gameEngine.addEntity(new Camera(gameEngine));
    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/red_Robot.png"), AM.getAsset("./img/red_Robot.png"), 300, 575, 60));
    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/blue_Robot.png"), AM.getAsset("./img/blue_Robot.png"), 1200, 575, 60));
    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/orange_Robot.png"), AM.getAsset("./img/orange_Robot.png"), 1800, 575, 60));
    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/green_Robot.png"), AM.getAsset("./img/green_Robot.png"), 2400, 575, 60));
    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png"), AM.getAsset("./img/enemySoldier_Foward.png"),
        AM.getAsset("./img/enemySoldier_StandingBackward.png"), AM.getAsset("./img/enemySoldier_StandingFoward.png"), 800, 525, 200));
    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png"), AM.getAsset("./img/flyingRobot_Forward.png"), 1300, 100, 60));
    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png"), AM.getAsset("./img/enemySoldier_Foward.png"),
        AM.getAsset("./img/enemySoldier_StandingBackward.png"), AM.getAsset("./img/enemySoldier_StandingFoward.png"), 1600, 330, 200));
    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png"), AM.getAsset("./img/enemySoldier_Foward.png"),
        AM.getAsset("./img/enemySoldier_StandingBackward.png"), AM.getAsset("./img/enemySoldier_StandingFoward.png"), 2100, 525, 200));
    gameEngine.addEntity(new EnemySoldier(gameEngine, AM.getAsset("./img/enemySoldier_Backward.png"), AM.getAsset("./img/enemySoldier_Foward.png"),
        AM.getAsset("./img/enemySoldier_StandingBackward.png"), AM.getAsset("./img/enemySoldier_StandingFoward.png"), 2850, 525, 200));
    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png"), AM.getAsset("./img/flyingRobot_Forward.png"), 400, 100, 60));
    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png"), AM.getAsset("./img/flyingRobot_Forward.png"), 1000, 300, 60));
    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png"), AM.getAsset("./img/flyingRobot_Forward.png"), 1700, 100, 60));
    gameEngine.addEntity(new FlyingRobot(gameEngine, AM.getAsset("./img/flyingRobot_Backward.png"), AM.getAsset("./img/flyingRobot_Forward.png"), 2300, 200, 60));
        console.log("All Done!");
});
