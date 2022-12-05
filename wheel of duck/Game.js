import Input from "./Input";
import Display from "./Display";
import Sounds from "./Sounds";
import Collision from "./Collision";
import GameStats from "./GameStats";

import Dog from "./Dog";
import Duck from "./Duck";
import RedDuck from "./RedDuck";
import BlueDuck from "./BlueDuck";
import VolumeControl from "./VolumeControl";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
}


export default class Game {
    constructor(gameWidth, gameHeight, ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ctx = ctx;

        this.sounds = new Sounds();
        this.input = new Input(this, document.querySelector('#canvas'));
        this.gameStats = new GameStats(this);
        this.colission = new Collision(this);
        this.display = new Display(this);

        this.pausedAudio = [];
        this.volume = new VolumeControl();

        this.grassImage = document.querySelector('#grass');
        this.gamestate = GAMESTATE.MENU;
    }

    start() {
        this.canStartMusic = true;
        this.runLaugh = true;

        this.timer = 0;

        this.ducks = [new Duck(this), new RedDuck(this), new BlueDuck(this)];

        this.dog = new Dog(this);
        this.duck = this.ducks[0];

        this.canShoot = false;
    }

    runIntro() {
        this.sounds.start.stop();
        this.sounds.intro.play();
        this.dog.runIntro = true;

        this.canStartMusic = true;
    }

    respawnDuck() {
        this.duck.startRespawn = true;
    }

    newRound() {
        this.gameStats.checked = false;
        this.timer = 0;

        this.canShoot = false;
        this.dog.drawGrass = false;
        this.display.displayCurrentRound = true;

        this.perfectRound = false;


        this.gameStats.update();

        this.gameStats.correctHits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameStats.currentSubRound = 0;

        this.gameStats.missHits = 0;

        this.gameStats.round++;

        this.runIntro();
        this.newSubRound();
    }

    newSubRound() {
        this.dog.resetPropertiesAfterRound();
        this.duck.wholeDistanceTraveled = 0;
        this.duck.dropSoundActive = true;

        // Generate random color duck
        this.duck = this.ducks[Math.floor(Math.random() * 3)];
        this.dog.canStartNextSubRound = false;

        this.canFlyAway = true;

        this.gameStats.currentSubRound++;
        this.gameStats.shoot = 0;

        this.respawn = true;
    }

    loseSubRound() {
        this.canShoot = false;
        // lose sub round
        if (!this.duck.beHit && this.duck.duckAlive && this.canFlyAway) {
            this.duck.flyAwayNow = true;
            this.gameStats.correctHits[this.gameStats.currentSubRound - 1] = -1;
        }
    }

    showPerfectButton(deltaTime) {
        this.timer += deltaTime/16;

        this.display.perfectButton();
        if (this.timer > 100) {
            this.newRound();
        }
    }

    summaryRound(deltaTime) {
        if (this.gameStats.currentSubRound !== 10) {
            this.newSubRound();
        } else {
            // Check game stats (game over/perfect round/next round)
            if (!this.gameStats.checked) {
                this.gameStats.summaryRounds();

            }
            // Add perfect bonus if round is perfect
            if (this.perfectRound) {
                if (!this.sounds.perfect.paused) {
                    this.sounds.perfect.play();
                }
                this.showPerfectButton(deltaTime);
                return;
            }
            // New round after 10 sub rounds;
            if (!(this.gamestate === GAMESTATE.GAMEOVER)) {
                this.newRound();
            }
        }
    }

    gameOver(deltaTime) {
        this.canShoot = false;
        if (this.runLaugh) {
            this.dog.laugh();
        }
        this.timer += deltaTime/16;
        this.runLaugh = false;
        this.dog.update(deltaTime);

        if (this.timer > 350) {
            this.gamestate = GAMESTATE.MENU;
            this.gameStats.score = 0;
        }
    }

    togglePause() {
        let sounds = document.getElementsByTagName('audio');

        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;

            this.pausedAudio.forEach(function (sound) {
                sound.play();
            })
            this.pausedAudio = [];
        } else if (this.gamestate !== GAMESTATE.MENU) {
            for(let i=0; i<sounds.length; i++) {
                if (!sounds[i].paused) {
                    this.pausedAudio.push(sounds[i])
                    sounds[i].pause();
                }
            }
            this.gamestate = GAMESTATE.PAUSED;
        }

    }

    draw() {
        this.dog.draw();
        this.duck.draw();

        if (this.dog.drawGrass) {
            this.ctx.drawImage(this.grassImage, 0, 0, this.gameWidth, this.gameHeight);
        }

        this.display.draw();
    }

    update(deltaTime) {
        if (this.gamestate === GAMESTATE.PAUSED) {
            return;
        }

        if (this.gamestate === GAMESTATE.MENU) {
            if (this.canStartMusic) {
                this.sounds.start.play();
                this.canStartMusic = false;
            }
            return;
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            this.gameOver(deltaTime);
            return;
        }

        if (this.duck.runDogPickUp) {
            this.dog.pickUp(1, this.duck.position.x);
            this.duck.runDogPickUp = false;
        }

        this.colission.update(this.duck);
        this.dog.update(deltaTime);
        this.duck.update(deltaTime);
        this.input.limitClick(deltaTime);

        if (!this.dog.runIntro && this.respawn) {
            // Respawn duck after intro
            this.respawnDuck();
            this.canShoot = true;
            this.respawn = false;
        }

        if (this.gameStats.shoot >= 3) {
            // Lose round after 3 shots without hit
            this.loseSubRound();
        }

        if (this.dog.canStartNextSubRound) {
            this.summaryRound(deltaTime);
        }
    }
}

