import { Container, Sprite, BitmapText, AbstractText } from 'pixi.js';
import { rowCount, symbolHeight } from "./gamesetting";
import { Reel } from "./Reel";
import { Game } from "./Game";

export class SpinButton {
    _container: Container;
    _game: Game;
    _reel: Reel[];
    timer: number = 0;
    reelDelay = 500;
    showDelay = 2000;
    bonusDelay = 7000;

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
        spinButton.on('pointerdown', this.onClick.bind(this, 0));
        spinButton.eventMode = 'static';
        spinButton.cursor = "pointer";
    }

    async onClick(spinIndex: number) {
        this.RotateReels(spinIndex);
    }

    async RotateReels(spinIndex: number) {
        for (let i = 0; i < this._reel.length; i++) {
            this._reel[i].startRotate();
            await new Promise(resolve => setTimeout(resolve, this.reelDelay));
        }
        let reelData: number[] = [];
        const serverData = await this._game.gameServer.getServerData();
        let tempIndex = 0;
        if (serverData._spinData.length > 0 && serverData._spinData[spinIndex]._data.length > 0) {
            for (let reelIndex = 0; reelIndex < this._reel.length; reelIndex++) {
                reelData = [];
                for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                    console.log(serverData._spinData[spinIndex]._data[tempIndex]);
                    reelData.push(serverData._spinData[spinIndex]._data[tempIndex]);//(reelIndex + 1) * (rowIndex + 1)]);
                    tempIndex += 1;
                }
                if (serverData._spinData[spinIndex]._winLines[reelIndex] != null || serverData._spinData[spinIndex]._winLines[reelIndex] != undefined) {
                    this._reel[reelIndex].setData(reelData, serverData._spinData[spinIndex]._winLines[reelIndex]._y);
                } else {
                    this._reel[reelIndex].setData(reelData, -1);
                }
            }
            await new Promise(resolve => setTimeout(resolve, this.bonusDelay));
            this.AssignText(serverData._spinData[spinIndex]._win);

            if (spinIndex + 1 < serverData._spinData.length) {
                await new Promise(resolve => setTimeout(resolve, this.showDelay));
                this.RotateReels(spinIndex + 1);
            }
        }
    }

    AssignText(_win: number) {
        const bmText: AbstractText = new BitmapText;
        bmText.text = _win;
        this._game.winText.SetText(bmText);
    }

}
