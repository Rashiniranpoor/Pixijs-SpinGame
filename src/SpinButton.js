"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinButton = void 0;
const pixi_js_1 = require("pixi.js");
const gamesetting_1 = require("./gamesetting");
class SpinButton {
    spinContainer;
    _game;
    _reel;
    timer = 0;
    constructor(game) {
        this._game = game;
        this._reel = game.reels;
        this.spinContainer = new pixi_js_1.Container();
        this.spinContainer.position.x = window.innerWidth / 2;
        this.spinContainer.position.y = (window.innerHeight / 2) + (gamesetting_1.symbolHeight * ((gamesetting_1.rowCount - 2) / 2) + gamesetting_1.symbolHeight / 2);
    }
    Init() {
        this._game.app.stage.addChild(this.spinContainer);
        const spinButton = pixi_js_1.Sprite.from("SpinButton");
        this.spinContainer.addChild(spinButton);
        spinButton.anchor.set(.5);
        spinButton.on('pointerdown', this.onClick.bind(this));
        spinButton.eventMode = 'static';
        spinButton.cursor = "pointer";
    }
    onClick() {
        for (let i = 0; i < this._reel.length; i++) {
            this._reel[i].startRotate();
        }
        this._game.app.ticker.add(this.rotate, this);
    }
    rotate(time) {
        this.timer = this.timer + time.deltaTime;
        if (this.timer > 500) {
            for (let i = 0; i < this._reel.length; i++) {
                this._reel[i].stop();
            }
            this.stop();
        }
    }
    stop() {
        this.timer = 0;
        this._game.app.ticker.remove(this.rotate, this);
        for (let i = 0; i < this._reel.length; i++) {
            const randomSymbols = [(i * gamesetting_1.reelCount) + 0, (i * gamesetting_1.reelCount) + 1, (i * gamesetting_1.reelCount) + 2];
            this._reel[i].showSymbolAfterSpin(randomSymbols);
        }
    }
}
exports.SpinButton = SpinButton;
//# sourceMappingURL=SpinButton.js.map