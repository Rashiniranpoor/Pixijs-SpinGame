import { Container, Sprite, Ticker } from "pixi.js";
import { reelCount, rowCount, symbolHeight } from "./gamesetting";
import { Reel } from "./Reel";
import { Game } from "./Game";


export class SpinButton {
    spinContainer: Container;
    _game: Game;
    _reel: Reel[];
    timer: number = 0;

    constructor(game: Game) {
        this._game = game;
        this._reel = game.reels;
        this.spinContainer = new Container();
        this.spinContainer.position.x = window.innerWidth / 2;
        this.spinContainer.position.y = (window.innerHeight / 2) + (symbolHeight * ((rowCount - 2) / 2) + symbolHeight / 2);
    }

    public Init() {
        this._game.app.stage.addChild(this.spinContainer);
        const spinButton = Sprite.from("SpinButton");
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

    private rotate(time: Ticker) {
        this.timer = this.timer + time.deltaTime;
        if (this.timer > 500) {
            for (let i = 0; i < this._reel.length; i++) {
                this._reel[i].stop();
            }
            this.stop();
        }
    }

    private stop() {
        this.timer = 0;
        this._game.app.ticker.remove(this.rotate, this);
        for (let i = 0; i < this._reel.length; i++) {
            const randomSymbols: number[] = [(i * reelCount) + 0, (i * reelCount) + 1, (i * reelCount) + 2];
            this._reel[i].showSymbolAfterSpin(randomSymbols);
        }
    }

}