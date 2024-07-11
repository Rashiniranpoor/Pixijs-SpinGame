import { Container, Sprite, Ticker } from "pixi.js";
import { reelCount, rowCount, symbolHeight } from "./gamesetting";
import { Reel } from "./Reel";
import { Game } from "./Game";


export class SpinButton {
    _container: Container;
    _game: Game;
    _reel: Reel[];
    timer: number = 0;

    constructor(game: Game) {
        this._game = game;
        this._reel = game.reels;
        this._container = new Container();
        this._container.position.x = window.innerWidth * 0.5;
        this._container.position.y = (window.innerHeight * 0.5) + (symbolHeight * (rowCount * 0.5) + symbolHeight * 0.5);
    }

    public Init() {
        this._game.app.stage.addChild(this._container);
        const spinButton = Sprite.from("SpinButton");
        this._container.addChild(spinButton);
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
        if (this.timer > 100) {
            this.stop();
        }
    }

    private stop() {
        this.timer = 0;
        this._game.app.ticker.remove(this.rotate, this);

        for (let i = 0; i < this._reel.length; i++) {
            const randomSymbols: number[] = [(i + reelCount), (i + reelCount), (i + reelCount)];
            this._reel[i].showSymbolAfterSpin(randomSymbols);
        }

    }

}
