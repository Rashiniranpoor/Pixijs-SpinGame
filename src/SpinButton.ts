import { Container, Sprite } from "pixi.js";
import { rowCount, symbolHeight } from "./gamesetting";
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


    async onClick() {
        for (let i = 0; i < this._reel.length; i++) {
            this._reel[i].startRotate();
        }

        const serverData = await this._game.gameServer.getServerData();
        let reelData: number[] = [];
        if (serverData._spinData[0]._data.length > 0) {
            for (let reelIndex = 0; reelIndex < this._reel.length; reelIndex++) {
                reelData = [];
                for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                    reelData.push(serverData._spinData[0]._data[(reelIndex + 1) * (rowIndex + 1)])
                }
                console.log("Selected Point for reel " + reelIndex + " is :" + serverData._spinData[0]._winLines[reelIndex]._y);
                this._reel[reelIndex].setData(reelData, serverData._spinData[0]._winLines[reelIndex]._y);
            }
        }
    }


    private stop() {
        this.timer = 0;

    }

}
