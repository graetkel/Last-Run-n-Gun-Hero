window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.powerUps = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
}

GameEngine.prototype.start = function () {
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}
// Pause Game
var gamePaused = false;
GameEngine.prototype.startInput = function () {
    var that = this;
	var getXandY = function (e) {                            // THU add
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }
	
	var pauseGame = function() {
	if (!gamePaused) {
			gamePaused = true;
		} else {
			gamePaused = false;
		}
	}
	
	this.ctx.canvas.addEventListener("click", function (e) {  // THU add
        that.click = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {

        if (e.code === "KeyD") {
            that.d = true;

        }
        else if (e.code === "KeyA") {
            that.a = true;

        }
        else if (String.fromCharCode(e.which) === ' ') that.space = true;

        else if (e.code === "KeyS") {
            that.s = true;
        }
        else if (e.code === "KeyW") {
            that.w = true;
        }
        else if (e.code === "ArrowRight") {
            playaudioFX(gameEngine, "./music/Pewww.m4a")
            that.shooting = true;
        }
        else if (e.code === "ArrowUp") {
            that.aimUp = true;
        }
        else if (e.code === "ArrowDown") {
            that.aimDown = true;
        }
        else if (e.code === "ArrowLeft") {
            that.gernadeThrow = true;
        } else if (e.code === "KeyP") {
			pauseGame();
		}
		
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {

        if (e.code === "ArrowRight") {

            playaudioFX(gameEngine, "./music/Pewww.m4a")
        }
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {

        if (e.code === "KeyD") {
            that.d = false;

        }
        else if (e.code === "KeyA") {
            that.a = false;

        }
        else if (e.code === "KeyS") {
            that.s = false;
        }
        else if (e.code === "KeyW") {
            that.w = false;
        }
        else if (e.code === "ArrowRight") {

            that.shooting = false;
        }
        else if (e.code === "ArrowUp") {
            that.aimUp = false;
        }
        else if (e.code === "ArrowDown") {
            that.aimDown = false;
        }
        else if (e.code === "ArrowLeft") {
            that.gernadeThrow = false;
        }
    }, false);
}

   ////////////////////////////////////////////
   // added PowerUp as similar Entity object //
   ////////////////////////////////////////////
/**
 * Adds a powerup to the world.
 * copycat of the previous addEntity function.
*/
GameEngine.prototype.addPowerUp = function (powerUp) {
    this.powerUps.push(powerUp);
}

/**
 * removes a powerup from the world.
 * copycat of the previous removeEntity function.
 */
GameEngine.prototype.removePowerUp = function (powerUp) {
    powerUp.removeFromWorld = true;
}

/**
 * gets the selected powerup.
 * copycat from the previous getEntity function.
 */
GameEngine.prototype.getPowerUp = function () {
    return this.powerUps;
}




GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
}

GameEngine.prototype.removeEntity = function (entity) {
    entity.removeFromWorld = true;

}

GameEngine.prototype.getEntity = function () {
    return this.entities;
}

/**
 * Modified this function to include the drawing of the
 * Powerups.
 */
GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    //added this for loop in for powerups
    for (var i = 0; i < this.powerUps.length; i++) {
        this.powerUps[i].draw(this.ctx);
    }
    this.ctx.restore();
}

/**
 * Modifed this function to include the updating
 * of the powerups as well.
 */
GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    //added this var for powerups
    var powerUpCount = this.powerUps.length

    //added this loop for powerups
    for (var i = 0; i < powerUpCount; i++) {
        var powerup = this.powerUps[i];

        if (!powerup.removeFromWorld) {
            powerup.update();
        }
    }

    //added this loop for powerups
    for (var i = this.powerUps.length - 1; i >= 0; --i) {
        if (this.powerUps[i].removeFromWorld) {
            this.powerUps.splice(i, 1);
        }
    }


    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
	if (!gamePaused) {
		this.clockTick = this.timer.tick();
		this.update();
		this.draw();
		this.space = null;
		this.click = null;
		this.wheel = null;
		this.over = null;
		this.aimUp = null;
		this.gernadeThrow = null;
		this.aimDown = null;
		this.s = null;
		this.w = null;
	}
}

GameEngine.prototype.reset = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entitie = this.entities[i];
        entitie.reset();
    }
}

    /////////////////////////////
    //Adding the PowerUp Object//
    /////////////////////////////
/**
 * adding powerUp object
 * Copycat from Entity Object
 */
function PowerUp(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

/**
 * adding powerUp object
 * Copycat from Entity Object
 */
PowerUp.prototype.update = function () {
}

/**
 * adding powerUp object
 * Copycat from Entity Object
 */
PowerUp.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.reset = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
