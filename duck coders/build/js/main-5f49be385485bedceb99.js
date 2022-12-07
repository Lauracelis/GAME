!(function(t) {
	var i = {};

	function s(e) {
		if (i[e]) return i[e].exports;
		var h = (i[e] = {
			i: e,
			l: !1,
			exports: {}
		});
		return t[e].call(h.exports, h, h.exports, s), (h.l = !0), h.exports;
	}
	(s.m = t), (s.c = i), (s.d = function(t, i, e) {
		s.o(t, i) || Object.defineProperty(t, i, {
			enumerable: !0,
			get: e
		});
	}), (s.r = function(t) {
		"undefined" != typeof Symbol &&
			Symbol.toStringTag &&
			Object.defineProperty(t, Symbol.toStringTag, {
				value: "Module",
			}), Object.defineProperty(t, "__esModule", {
				value: !0
			});
	}), (s.t = function(t, i) {
		if ((1 & i && (t = s(t)), 8 & i)) return t;
		if (4 & i && "object" == typeof t && t && t.__esModule) return t;
		var e = Object.create(null);
		if (
			(
				s.r(e),
				Object.defineProperty(e, "default", {
					enumerable: !0,
					value: t
				}),
				2 & i && "string" != typeof t
			)
		)
			for (var h in t)
				s.d(
					e,
					h,
					function(i) {
						return t[i];
					}.bind(null, h)
				);
		return e;
	}), (s.n = function(t) {
		var i =
			t && t.__esModule ?
			function() {
				return t.default;
			} :
			function() {
				return t;
			};
		return s.d(i, "a", i), i;
	}), (s.o = function(t, i) {
		return Object.prototype.hasOwnProperty.call(t, i);
	}), (s.p = ""), s((s.s = 1));
})([
	function(t, i, s) {},
	function(t, i, s) {
		"use strict";
		s.r(i);
		s(0);
		class e {
			constructor(t, i) {
				(this.game = t), i.addEventListener("mousedown", s => {
					if ((2 === t.gamestate && this.menuStartGame(), t.gamestate)) {
						let e = i.getBoundingClientRect();
						(this.mouseX = s.clientX - e.left), (this.mouseY =
							s.clientY - e.top), t.canShoot &&
							this.limitShoot &&
							(
								this.game.sounds.gunShot.play(),
								(this.counter = 0),
								t.gameStats.shoot++
							);
					}
				}), document.addEventListener("keydown", i => {
					27 === i.keyCode && t.togglePause();
				}), (this.counter = 0);
			}
			menuStartGame() {
				this.game.input.mouseX > 236 &&
					this.game.input.mouseX < 531 &&
					this.game.input.mouseY > 447 &&
					this.game.input.mouseY < 473 &&
					(
						(this.game.gamestate = 1),
						(this.game.gameStats.round = 0),
						this.game.start(),
						this.game.newRound()
					);
			}
			limitClick(t) {
				(this.counter += t / 16), (this.limitShoot = this.counter >= 50);
			}
		}
		class h {
			constructor(t) {
				(this.game = t), (this.gameWidth = t.gameWidth), (this.gameHeight =
					t.gameHeight), (this.ctx =
					t.ctx), (this.logoImage = document.querySelector(
					"#logo"
				)), (this.shotImage = document.querySelector(
					"#shot"
				)), (this.subroundsDuckWhite = document.querySelector(
					"#subround_duck_white"
				)), (this.subroundsDuckRed = document.querySelector(
					"#subround_duck_red"
				)), (this.smallButton = document.querySelector(
					"#small_button"
				)), (this.bigButton = document.querySelector(
					"#big_button"
				)), (this.posXMouseWhenHitDuck = null), (this.posYMouseWhenHitDuck = null);
			}
			menuScreen() {
				this.ctx.rect(
					0,
					0,
					this.gameWidth,
					this.gameHeight
				), (this.ctx.fillStyle =
					"rgba(0,0,0,1)"), this.ctx.fill(), (this.ctx.font =
					"30px 'Press Start 2P'"), (this.ctx.fillStyle =
					"#ff9c39"), (this.ctx.textAlign = "center"), this.ctx.drawImage(
					this.logoImage,
					this.gameWidth / 2 - this.logoImage.width / 2,
					0.1 * this.gameHeight
				), this.ctx.fillText(
					"START GAME",
					this.gameWidth / 2,
					0.66 * this.gameHeight
				), (this.ctx.font = "20px 'Press Start 2P'"), (this.ctx.fillStyle =
					"#47dd24"), this.ctx.fillText(
					"BEST SCORE  =  ".concat(this.game.gameStats.bestScore),
					this.gameWidth / 2,
					0.8 * this.gameHeight
				), (this.ctx.fillStyle = "white"), this.ctx.fillText(
					"© 2020 Adi52",
					this.gameWidth / 2,
					0.86 * this.gameHeight
				);
			}
			drawBigButton(t, i) {
				this.ctx.drawImage(
						this.bigButton,
						this.gameWidth / 2 - this.bigButton.width / 2,
						0.3 * this.gameHeight
					), (this.ctx.font = "22px 'Press Start 2P'"), (this.ctx.textAlign =
						"center"), (this.ctx.fillStyle = "white"), "PERFECT!!" === t &&
					(this.ctx.font = "14px 'Press Start 2P'"), this.ctx.fillText(
						t,
						this.gameWidth / 2,
						0.36 * this.gameHeight
					), (this.ctx.font = "22px 'Press Start 2P'"), this.ctx.fillText(
						i,
						this.gameWidth / 2,
						0.41 * this.gameHeight
					);
			}
			drawSmallButton(t) {
				this.ctx.drawImage(
					this.smallButton,
					this.gameWidth / 2 - this.smallButton.width / 2,
					0.34 * this.gameHeight
				), (this.ctx.font = "22px 'Press Start 2P'"), (this.ctx.fillStyle =
					"white"), this.ctx.fillText(
					t,
					this.gameWidth / 2,
					0.391 * this.gameHeight
				);
			}
			pausedScreen() {
				this.ctx.rect(
					0,
					0,
					this.gameWidth,
					this.gameHeight
				), (this.ctx.fillStyle =
					"rgba(0,0,0,0.5)"), this.ctx.fill(), this.drawSmallButton("PAUSED");
			}
			displayPointsForDuck() {
				(this.ctx.font = "22px 'Teko'"), (this.ctx.fillStyle =
					"white"), (this.ctx.textAlign = "center"), this.ctx.fillText(
					this.game.duck.points,
					this.posXMouseWhenHitDuck + 25,
					this.posYMouseWhenHitDuck + 40
				);
			}
			showNumberRound() {
				(this.ctx.font = "18px 'Press Start 2P'"), (this.ctx.fillStyle =
					"#47dd24");
				let t = "00" + this.game.gameStats.round;
				(t = t.substr(t.length - 2)), this.ctx.fillText("R=" + t, 109, 598.5);
			}
			showScore() {
				let t = "000000" + this.game.gameStats.score;
				(t = t.substr(t.length - 6)), (this.ctx.font =
					"22px 'Press Start 2P'"), (this.ctx.fillStyle =
					"white"), this.ctx.fillText(t, 647, 647), this.ctx.fillText(
					"SCORE",
					658,
					672
				);
			}
			showAvailableShoots() {
				for (let t = 0; t < 3 - this.game.gameStats.shoot; t++)
					this.ctx.drawImage(this.shotImage, 78 + 22 * t, 625);
			}
			showSubRoundsScore() {
				this.game.gameStats.correctHits.forEach((t, i) => {
					-1 === t || 0 === t ?
						this.ctx.drawImage(this.subroundsDuckWhite, 274 + 25 * i, 625) :
						1 === t &&
						this.ctx.drawImage(this.subroundsDuckRed, 274 + 25 * i, 625);
				});
			}
			newRoundButton() {
				this.drawBigButton("ROUND", this.game.gameStats.round);
			}
			perfectButton() {
				this.drawBigButton("PERFECT!!", this.game.gameStats.perfectBonusScore);
			}
			flyAwayButton() {
				this.drawSmallButton("FLY AWAY");
			}
			gameOverButton() {
				this.drawBigButton("GAME", "OVER");
			}
			draw() {
				2 === this.game.gamestate ?
					this.menuScreen() :
					(
						this.showNumberRound(),
						this.showScore(),
						this.showAvailableShoots(),
						this.showSubRoundsScore(),
						3 === this.game.gamestate && this.gameOverButton(),
						this.game.gamestate ?
						this.displayCurrentRound && this.newRoundButton() :
						this.pausedScreen()
					);
			}
		}

		function o(t, i, s) {
			return i in t ?
				Object.defineProperty(t, i, {
					value: s,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				}) :
				(t[i] = s), t;
		}
		class n {
			constructor(t, i = !1) {
				o(this, "play", function() {
						this.sound.play();
					}), o(this, "stop", function() {
						this.sound.pause(), (this.sound.currentTime = 0);
					}), (this.sound = document.createElement("audio")), (this.sound.src =
						"audio/" + t), this.sound.setAttribute(
						"preload",
						"auto"
					), this.sound.setAttribute("controls", "none"), i &&
					(this.sound.loop = !0), (this.sound.volume = 0.05), (this.sound.style.display =
						"none"), document.body.appendChild(this.sound);
			}
		}
		class a {
			constructor() {
				(this.start = new n("start.mp3")), (this.intro = new n(
					"intro.mp3"
				)), (this.duckFlapping = new n(
					"duck-flappingg.mp3", !0
				)), (this.duckFalling = new n(
					"duck-falling.mp3"
				)), (this.duckDrop = new n("duck-drop.mp3")), (this.duckCaught = new n(
					"duck-caught.mp3"
				)), (this.gunShot = new n("gun-shot.mp3")), (this.dogLaugh = new n(
					"dog-laughing.mp3"
				)), (this.perfect = new n("perfect.mp3")), (this.gameOver = new n(
					"game-over.mp3"
				));
			}
		}
		class r {
			constructor(t) {
				(this.game = t), (this.gameStats = t.gameStats), (this.input =
					t.input), (this.duck = t.duck);
			}
			hitTestPoint(t, i, s, e, h, o) {
				return t <= h && t + s + 35 >= h && i <= o && i + e + 35 >= o;
			}
			update(t) {
				this.game.canShoot &&
					this.game.input.limitShoot &&
					this.hitTestPoint(
						t.position.x,
						t.position.y,
						t.widthDuck,
						t.heightDuck,
						this.input.mouseX,
						this.input.mouseY
					) &&
					(
						(t.beHit = !0),
						this.game.sounds.duckFlapping.stop(),
						(this.gameStats.score += this.game.duck.points),
						(this.gameStats.correctHits[
							this.gameStats.currentSubRound - 1
						] = 1),
						(this.game.display.posXMouseWhenHitDuck = this.game.duck.position.x),
						(this.game.display.posYMouseWhenHitDuck = this.game.duck.position.y)
					), (this.input.mouseX = null), (this.input.mouseY = null);
			}
		}
		class u {
			constructor(t) {
				(this.game = t), (this.score = 0), (this.bestScore = 0), (this.perfectBonusScore =
					1e4), (this.shoot = 0), (this.missHits = 0), (this.correctHits = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
				]), (this.missAvailable = 4), (this.currentSubRound = 0), (this.round = 0);
			}
			changePerfectBonusScore() {
				this.round < 4 ?
					(this.perfectBonusScore = 1e4) :
					this.round < 7 ?
					(this.perfectBonusScore = 15e3) :
					this.round < 11 ?
					(this.perfectBonusScore = 2e4) :
					(this.perfectBonusScore = 3e4);
			}
			changeMissHits() {
				this.round < 4 ?
					(this.missAvailable = 4) :
					this.round < 7 ?
					(this.missAvailable = 3) :
					this.round < 11 ?
					(this.missAvailable = 2) :
					(this.missAvailable = 1);
			}
			perfectBonus() {
				this.game.perfectRound ||
					(
						(this.score += this.perfectBonusScore),
						(this.game.perfectRound = !0)
					);
			}
			summaryRounds() {
				(this.checked = !0), this.correctHits.every(t => 1 === t) &&
					this.perfectBonus(), this.correctHits.forEach(t => {
						-1 === t && this.missHits++;
					}), this.setBestScore(), this.missHits >= this.missAvailable &&
					((this.game.gamestate = 3), this.game.sounds.gameOver.play());
			}
			changePointsPerDuck() {
				this.round < 4 ?
					(
						(this.game.ducks[0].points = 500),
						(this.game.ducks[1].points = 1e3),
						(this.game.ducks[2].points = 1500)
					) :
					this.round < 7 ?
					(
						(this.game.ducks[0].points = 800),
						(this.game.ducks[1].points = 1600),
						(this.game.ducks[2].points = 2400)
					) :
					(
						(this.game.ducks[0].points = 1e3),
						(this.game.ducks[1].points = 2e3),
						(this.game.ducks[2].points = 3e3)
					);
			}
			changeDuckSpeed() {
				this.game.ducks.forEach(t => {
					t.duckSpeed += 0.2;
				});
			}
			setBestScore() {
				this.score > this.bestScore && (this.bestScore = this.score);
			}
			update() {
				this.changeDuckSpeed(), this.changeMissHits(), this.changePointsPerDuck(),
					this.changePerfectBonusScore();
			}
		}
		class c {
			constructor(t) {
				(this.gameWidth = t.gameWidth), (this.gameHeight =
					t.gameHeight), (this.ctx =
					t.ctx), (this.game = t), (this.runIntro = !1), (this.drawGrass = !1), (
					this.runPickUpAnimation = !1), (this.runLaughAnimation = !1), (this.position = {
					x: -50,
					y: 0.6 * t.gameHeight,
				}), (this.dogImage = document.querySelector(
					"#dogImg"
				)), (this.dogWidth = 57.2), (this.dogHeight = 52), (this.maxFrame = 4), (
					this.currentFrame = 1), (this.animationForward = !0), (this.sniffTimer =
					0), (this.sniffFlag = !0), (this.currentRow = 0), (this.correction = 0),
				(this.correctionRow = 0), (this.dWidthCorrection = 0), (this.pickUpDirection =
					1), (this.counter = 0), (this.speed = 1);
			}
			resetPropertiesAfterRound() {
				(this.currentFrame = 1), (this.correctionRow = 0), (this.currentRow = 0),
				(this.sniffFlag = !0), (this.position.x = -50), (this.position.y =
					0.6 *
					this.gameHeight), (this.correction = 0), (this.dWidthCorrection = 0);
			}
			draw() {
				this.ctx.drawImage(
					this.dogImage,
					this.dogWidth * Math.round(this.currentFrame) + this.correctionRow,
					this.currentRow * this.dogHeight,
					this.dogWidth + this.correction,
					this.dogHeight,
					this.position.x,
					this.position.y,
					this.dogWidth + 100 + this.dWidthCorrection,
					this.dogHeight + 100
				);
			}
			walking(t) {
				(this.sniffTimer = 0), this.animationForward ?
					(this.currentFrame += t / 200) :
					(this.currentFrame -= t / 200), this.currentFrame > this.maxFrame ?
					(
						(this.currentFrame = 4),
						(this.animationForward = !this.animationForward)
					) :
					this.currentFrame < 1 &&
					(
						(this.currentFrame = 1),
						(this.animationForward = !this.animationForward)
					);
			}
			jump(t) {
				(this.currentRow = 1.13), (this.currentFrame = 0), (this.animationForward = !
					0), (this.sniffTimer += t), this
					.sniffTimer > 2e3 ?
					((this.runIntro = !1), (this.correction = 0)) :
					this.sniffTimer > 1e3 &&
					(
						(this.currentRow = 1),
						(this.correction = -8.5),
						(this.currentFrame = 1),
						(this.position.x += 50 / t),
						(this.position.y -= t * this.speed),
						this.position.y < 250 &&
						((this.speed = -this.speed), (this.drawGrass = !0))
					);
			}
			sniff(t, i = !1) {
				if (this.sniffTimer > 800)
					return i ?
						void this.jump(t) :
						(
							(this.sniffFlag = !this.sniffFlag),
							void(this.currentFrame = 1)
						);
				(this.sniffTimer += t), (this.currentFrame > 1 ||
					this.currentFrame < 0) &&
				(
					(this.animationForward = !this.animationForward),
					(this.currentFrame = 0)
				), this.animationForward ?
					(this.currentFrame -= t / 400) :
					(this.currentFrame += t / 400);
			}
			laugh() {
				this.game.sounds.duckFlapping.paused ||
					this.game.sounds.duckFlapping.stop(), this.game.sounds.dogLaugh.play(),
					(this.position.x =
						this.gameWidth / 2 - this.dogWidth), (this.position.y =
						0.6 *
						this
						.gameHeight), (this.currentRow = 1), (this.speed = 1), (this.correction = -
						27), (this.dWidthCorrection = -60), (this.currentFrame = 5), (this.correctionRow = -
						32), (this.drawGrass = !0), (this.runLaughAnimation = !0), (this.runPickUpAnimation = !
						0);
			}
			laughAnimation(t) {
				(this.counter += t / 200), Math.round(this.counter) % 2 == 0 ?
					((this.currentFrame = 5), (this.correctionRow = -32)) :
					((this.currentFrame = 6), (this.correctionRow = -59));
			}
			pickUp(t, i) {
				(this.position.x = i - (this.dogWidth + 100) / 2), (this.position.y =
					0.6 * this.gameHeight), (this.currentRow = 1), (this.speed = 1), 1 ===
					t && ((this.currentFrame = 3), (this.correctionRow = -32)), 2 === t &&
					(
						(this.currentFrame = 4),
						(this.correctionRow = -32.8)
					), (this.drawGrass = !0), (this.runPickUpAnimation = !0);
			}
			pickUpAnimation(t) {
				this.position.y > this.gameHeight ?
					(
						(this.runPickUpAnimation = !1),
						(this.runLaughAnimation = !1),
						(this.canStartNextSubRound = !0),
						(this.pickUpDirection = -this.pickUpDirection)
					) :
					this.position.y < 0.46 * this.gameHeight &&
					(3 === this.game.gamestate ?
						(this.position.y = 0.46 * this.gameHeight) :
						(this.pickUpDirection = -this
							.pickUpDirection)), (this.position.y -=
						t / 5 * this.pickUpDirection);
			}
			intro(t) {
				this.position.x > 100 && this.sniffFlag ?
					(this.sniff(t), (this.game.display.displayCurrentRound = !1)) :
					this.position.x > 250 ?
					this.sniff(t, !0) :
					(this.walking(t), (this.position.x += 20 / t));
			}
			update(t) {
				t &&
					(
						this.runIntro ?
						this.intro(t) :
						this.runPickUpAnimation && this.pickUpAnimation(t),
						this.runLaughAnimation && this.laughAnimation(t)
					);
			}
		}
		class d {
			constructor(t) {
				(this.gameWidth = t.gameWidth), (this.gameHeight =
					t.gameHeight), (this.ctx =
					t.ctx), (this.game = t), (this.beHit = !1), (this.duckAlive = !1), (this
					.startRespawn = !1), (this.directionX =
					1.3 * Math.random() + 0.9), (this.directionY =
					1.3 * Math.random() +
					0.9), (this.duckSpeed = 1), (this.points = 500), (this.position = {
					x: this.gameWidth,
					y: this.gameHeight,
				}), (this.flyAwayNow = !1), (this.dropSoundActive = !0), (this.ducksFlyUpImage =
					document.querySelector(
						"#ducksFlyUpImg"
					)), (this.ducksFallImage = document.querySelector(
					"#ducksFall"
				)), (this.ducksImage = this.ducksFlyUpImage), (this.widthDuck = 37), (
					this.heightDuck = 33), (this.maxFrame = 2), (this.animationForward = !0),
				(this.currentFrame = 0), (this.currentRow = 0), (this.duckDirection = 1),
				(this.counter = 0), (this.counterBeHit = 0), (this.distanceTraveled = 0),
				(this.wholeDistanceTraveled = 0);
			}
			draw() {
				this.ctx.save(), this.ctx.translate(
						this.position.x + this.widthDuck / 2,
						this.position.y + this.heightDuck / 2
					), -1 === this.duckDirection &&
					this.ctx.scale(-1, 1), this.ctx.translate(-(this.position.x + this.widthDuck /
						2), -(this.position.y + this.heightDuck / 2)), this.ctx.drawImage(
						this.ducksImage,
						this.widthDuck * Math.round(this.currentFrame),
						this.currentRow * this.heightDuck,
						this.widthDuck,
						this.heightDuck,
						this.position.x,
						this.position.y,
						this.widthDuck + 35,
						this.heightDuck + 35
					), this.ctx.restore();
			}
			respawn() {
				(this.position.y = 0.6 * this.gameHeight - 20), (this.position.x =
					600 * Math.random() + 50), (this.directionY =
					0.7 * Math.random() +
					0.9), (this.game.sounds.duckFlapping.loop = !0), this.game.sounds.duckFlapping
					.play();
			}
			flyUpAnimation(t) {
				(this.ducksImage = this.ducksFlyUpImage), this.animationForward ?
					(this.currentFrame += t / 100) :
					(this.currentFrame -= t / 100), this.currentFrame > this.maxFrame ?
					(
						(this.animationForward = !this.animationForward),
						(this.currentFrame = 2)
					) :
					this.currentFrame < 0 &&
					(
						(this.animationForward = !this.animationForward),
						(this.currentFrame = 0)
					);
			}
			beHitAnimation(t) {
				(this.game.canShoot = !1), (this.counterBeHit += t / 200), this
					.counterBeHit < 1 ?
					(
						(this.duckAlive = !1),
						setTimeout(() => this.game.sounds.duckFalling.play(), 200),
						(this.ducksImage = this.ducksFallImage),
						(this.currentFrame = 0)
					) :
					this.fallAnimation(t);
			}
			fallAnimation(t) {
				(this.counter += t / 200), this.position.y > 0.7 * this.gameHeight &&
					this.dropSoundActive &&
					(
						(this.dropSoundActive = !1),
						this.game.sounds.duckFalling.stop(),
						this.game.sounds.duckDrop.play()
					), this.position.y > this.gameHeight &&
					(
						(this.beHit = !1),
						(this.counterBeHit = 0),
						(this.runDogPickUp = !0),
						this.game.sounds.duckCaught.play()
					), Math.round(this.counter) % 2 == 0 ?
					(this.currentFrame = 1) :
					(this.currentFrame = 2), (this.position.y +=
						t / 3), this.game.display.displayPointsForDuck(
						this.game.input.mouseX,
						this.game.input.mouseY
					);
			}
			flyAway(t) {
				(this.position.y -= t / 2), (this.ctx.fillStyle =
					"rgba(207, 38, 8, 0.6)"), this.ctx.fillRect(
						0,
						0,
						this.gameWidth,
						this.gameHeight
					), this.game.display.flyAwayButton(), this.position.y < -100 &&
					(
						(this.flyAwayNow = !1),
						(this.game.canFlyAway = !1),
						this.game.dog.laugh()
					);
			}
			blinkCurrentSubRoundDuckInBottomBar(t) {
				this.game.dog.runLaughAnimation ||
					this.flyAwayNow ||
					!this.game.canShoot ||
					(
						(this.counter += t / 400),
						Math.round(this.counter) % 2 == 0 ?
						(this.game.gameStats.correctHits[
							this.game.gameStats.currentSubRound - 1
						] = 0) :
						(this.game.gameStats.correctHits[
							this.game.gameStats.currentSubRound - 1
						] = 2)
					);
			}
			changePositionOfDuck(t) {
				let i = t / 6 * this.duckSpeed * this.directionX,
					s = t / 6 * this.duckSpeed * this.directionY,
					e = (Math.abs(i) + Math.abs(s)) / 2;
				(this.position.x += i), (this.position.y -= s), (this.distanceTraveled +=
					e), this
					.game.dog.runIntro || (this.wholeDistanceTraveled += e);
			}
			detectCollisionWithWalls() {
				(this.position.x > this.gameWidth - this.widthDuck - 20 ||
					this.position.x < 0) &&
				(
					(this.directionX = -this.directionX),
					(this.distanceTraveled -= 100),
					(this.duckDirection = -this.duckDirection),
					this.position.x > this.gameWidth - this.widthDuck - 20 ?
					(this.position.x = this.gameWidth - this.widthDuck - 19) :
					(this.position.x = 1)
				), (this.position.y < 5 || this.position.y > 0.6 * this.gameHeight) &&
				!this.flyAwayNow &&
					(
						(this.directionY = -this.directionY),
						(this.distanceTraveled -= 100)
					);
			}
			randomDuckPath() {
				let t = Math.random() - 0.5;
				this.distanceTraveled > 400 &&
					Math.random() > 0.5 &&
					(
						(this.distanceTraveled = 0),
						Math.random() > 0.3 ?
						(
							(this.duckDirection = -this.duckDirection),
							(this.directionX = -this.directionX + t),
							Math.random() > 0.6 && this.position.y < 0.4 * this.gameHeight ?
							(this.directionY = 0.5 * Math.random()) :
							(this.directionY += t)
						) :
						(
							(this.directionY = -this.directionY + t),
							(this.directionX += t)
						)
					);
			}
			flyPath(t) {
				this.changePositionOfDuck(
						t
					), this.detectCollisionWithWalls(), this.randomDuckPath(), this
					.wholeDistanceTraveled > 2500 &&
					this.game.loseSubRound(), this.blinkCurrentSubRoundDuckInBottomBar(t);
			}
			update(t) {
				t &&
					(this.beHit ?
						this.beHitAnimation(t) :
						this.flyAwayNow ?
						(this.flyAway(t), this.flyUpAnimation(t)) :
						this.startRespawn ?
						(
							this.respawn(),
							(this.duckAlive = !0),
							(this.startRespawn = !1)
						) :
						this.duckAlive && (this.flyUpAnimation(t), this.flyPath(t)));
			}
		}
		class m extends d {
			constructor(t, i, s) {
				super(
					t,
					i,
					s
				), (this.currentRow = 1), (this.points = 1e3), (this.duckSpeed = 1.3);
			}
		}
		class g extends d {
			constructor(t, i, s) {
				super(
					t,
					i,
					s
				), (this.currentRow = 2), (this.points = 1500), (this.duckSpeed = 1.6);
			}
		}
		class l {
			constructor() {
				(this.sounds = document.getElementsByTagName(
					"audio"
				)), (this.volumeDown = document.querySelector(
					".fa-volume-down"
				)), (this.volumeUp = document.querySelector(
					".fa-volume-up"
				)), (this.volumeMute = document.querySelector(
					".fa-volume-mute"
				)), this.volumeDown.addEventListener(
					"click",
					this.volumeDownFun
				), this.volumeUp.addEventListener(
					"click",
					this.volumeUpFun
				), this.volumeMute.addEventListener("click", this.volumeMuteFun);
			}
			volumeMuteFun() {
				(this.sounds = document.getElementsByTagName(
					"audio"
				)), document
					.querySelector(".fa-volume-mute")
					.classList.toggle("active");
				for (let t of this.sounds)
					0 === t.volume ? (t.volume = 0.05) : (t.volume = 0);
			}
			volumeUpFun() {
				this.sounds = document.getElementsByTagName("audio");
				for (let t of this.sounds) t.volume < 0.98 && (t.volume += 0.05);
			}
			volumeDownFun() {
				this.sounds = document.getElementsByTagName("audio");
				for (let t of this.sounds) t.volume >= 0.02 && (t.volume -= 0.02);
			}
		}
		const p = 0,
			f = 1,
			w = 2,
			S = 3;
		class k {
			constructor(t, i, s) {
				(this.gameWidth = t), (this.gameHeight = i), (this.ctx = s), (this.sounds =
					new a()), (this.input = new e(
					this,
					document.querySelector("#canvas")
				)), (this.gameStats = new u(this)), (this.colission = new r(
					this
				)), (this.display = new h(
					this
				)), (this.pausedAudio = []), (this.volume = new l()), (this.grassImage =
					document.querySelector(
						"#grass"
					)), (this.gamestate = w);
			}
			start() {
				(this.canStartMusic = !0), (this.runLaugh = !0), (this.timer = 0), (this.ducks = [
					new d(this),
					new m(this),
					new g(this),
				]), (this.dog = new c(
					this
				)), (this.duck = this.ducks[0]), (this.canShoot = !1);
			}
			runIntro() {
				this.sounds.start.stop(), this.sounds.intro.play(), (this.dog.runIntro = !
					0), (this.canStartMusic = !0);
			}
			respawnDuck() {
				this.duck.startRespawn = !0;
			}
			newRound() {
				(this.gameStats.checked = !1), (this.timer = 0), (this.canShoot = !1), (
					this.dog.drawGrass = !1), (this.display.displayCurrentRound = !0), (this
					.perfectRound = !1), this.gameStats.update(), (this.gameStats.correctHits = [
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
					]), (this.gameStats.currentSubRound = 0), (this.gameStats.missHits = 0),
					this
					.gameStats.round++, this.runIntro(), this.newSubRound();
			}
			newSubRound() {
				this.dog.resetPropertiesAfterRound(), (this.duck.wholeDistanceTraveled =
						0), (this.duck.dropSoundActive = !0), (this.duck = this.ducks[
						Math.floor(3 * Math.random())
					]), (this.dog.canStartNextSubRound = !1), (this.canFlyAway = !0), this
					.gameStats
					.currentSubRound++, (this.gameStats.shoot = 0), (this.respawn = !0);
			}
			loseSubRound() {
				(this.canShoot = !1), !this.duck.beHit &&
					this.duck.duckAlive &&
					this.canFlyAway &&
					(
						(this.duck.flyAwayNow = !0),
						(this.gameStats.correctHits[
							this.gameStats.currentSubRound - 1
						] = -1)
					);
			}
			showPerfectButton(t) {
				(this.timer += t / 16), this.display.perfectButton(), this.timer >
					100 && this.newRound();
			}
			summaryRound(t) {
				if (10 !== this.gameStats.currentSubRound) this.newSubRound();
				else {
					if (
						(
							this.gameStats.checked || this.gameStats.summaryRounds(),
							this.perfectRound
						)
					)
						return this.sounds.perfect.paused ||
							this.sounds.perfect.play(), void this.showPerfectButton(t);
					this.gamestate !== S && this.newRound();
				}
			}
			gameOver(t) {
				(this.canShoot = !1), this.runLaugh && this.dog.laugh(), (this.timer +=
						t / 16), (this.runLaugh = !1), this.dog.update(t), this.timer > 350 &&
					((this.gamestate = w), (this.gameStats.score = 0));
			}
			togglePause() {
				let t = document.getElementsByTagName("audio");
				if (this.gamestate === p)
					(this.gamestate = f), this.pausedAudio.forEach(function(t) {
						t.play();
					}), (this.pausedAudio = []);
				else if (this.gamestate !== w) {
					for (let i = 0; i < t.length; i++)
						t[i].paused || (this.pausedAudio.push(t[i]), t[i].pause());
					this.gamestate = p;
				}
			}
			draw() {
				this.dog.draw(), this.duck.draw(), this.dog.drawGrass &&
					this.ctx.drawImage(
						this.grassImage,
						0,
						0,
						this.gameWidth,
						this.gameHeight
					), this.display.draw();
			}
			update(t) {
				this.gamestate !== p &&
					(this.gamestate !== w ?
						this.gamestate !== S ?
						(
							this.duck.runDogPickUp &&
							(
								this.dog.pickUp(1, this.duck.position.x),
								(this.duck.runDogPickUp = !1)
							),
							this.colission.update(this.duck),
							this.dog.update(t),
							this.duck.update(t),
							this.input.limitClick(t), !this.dog.runIntro &&
							this.respawn &&
							(
								this.respawnDuck(),
								(this.canShoot = !0),
								(this.respawn = !1)
							),
							this.gameStats.shoot >= 3 && this.loseSubRound(),
							this.dog.canStartNextSubRound && this.summaryRound(t)
						) :
						this.gameOver(t) :
						this.canStartMusic &&
						(this.sounds.start.play(), (this.canStartMusic = !1)));
			}
		}
		class y {
			constructor(t) {
				(this.startGameFun = t), (this.soundsReady = !1), (this.imagesReady = !1),
				(this.imagesSrc = [
					"big_button.png",
					"dog.png",
					"duck_fall.png",
					"duck_fly_up.png",
					"game_board.png",
					"game_board_grass.png",
					"logo.png",
					"shot.png",
					"small_button.png",
					"subround_duck_red.png",
					"subround_duck_white.png",
				]), (this.imagesId = [
					"big_button",
					"dogImg",
					"ducksFall",
					"ducksFlyUpImg",
					"background",
					"grass",
					"logo",
					"shot",
					"small_button",
					"subround_duck_red",
					"subround_duck_white",
				]), (this.counter = 0);
			}
			loadImages() {
				let t,
					i,
					s = {},
					e = this.imagesSrc.length,
					h = () => {
						0 == --e && this.canStartGame();
					};
				for (t = 0; t < this.imagesSrc.length; t++)
					(i = this.imagesSrc[t]), (s[i] = document.createElement("img")), (s[
						i
					].id = this.imagesId[t]), s[i].addEventListener("load", h), (s[
							i
						].src =
						"images/" + i), document.body.appendChild(s[i]);
			}
			loadSounds() {
				const t = document.getElementsByTagName("audio");
				let i = t.length;
				const s = () => {
					0 == --i && this.canStartGame();
				};
				for (let i of t) i.addEventListener("canplaythrough", s, !1);
			}
			canStartGame() {
				this.counter++, 2 === this.counter &&
					setTimeout(() => this.startGameFun(), 5e3);
			}
		}
		if (window.screen.width > 768) {
			let t = document.querySelector("#canvas").getContext("2d");
			const i = 768,
				s = 720;
			let e = document.querySelector(".loading");
			let h = new y(function() {
				e.classList.remove("visible");
				let h = document.querySelector("#background");
				o.start();
				let n = 0;
				!(function e(a) {
					let r = a - n;
					(n = a), t.drawImage(h, 0, 0, i, s), o.update(r), o.draw(),
						requestAnimationFrame(e);
				})(0);
			});
			h.loadImages();
			let o = new k(i, s, t);
			h.loadSounds();
		}
	},
]);