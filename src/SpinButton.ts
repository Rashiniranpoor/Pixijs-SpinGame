import { Container, Sprite, BitmapText, AbstractText } from 'pixi.js';
import { rowCount, symbolHeight } from "./gamesetting";
import { Reel } from "./Reel";
import { Game } from "./Game";

export class SpinButton {
    _container: Container;
    _game: Game;
    _reel: Reel[];
    timer: number = 0;
    delayForShow = 2000;
    delayForBonus = 7000;

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
        }
        let reelData: number[] = [];
        const serverData = await this._game.gameServer.getServerData();
        if (serverData._spinData.length > 0 && serverData._spinData[0]._data.length > 0) {
            if (serverData._spinData.length > 0 && serverData._spinData[spinIndex]._data.length > 0) {
                for (let reelIndex = 0; reelIndex < this._reel.length; reelIndex++) {
                    reelData = [];
                    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                        reelData.push(serverData._spinData[spinIndex]._data[(reelIndex + 1) * (rowIndex + 1)])
                    }
                    if (serverData._spinData[0]._winLines[reelIndex] != null || serverData._spinData[spinIndex]._winLines[reelIndex] != undefined)
                        this._reel[reelIndex].setData(reelData, serverData._spinData[spinIndex]._winLines[reelIndex]._y);
                    else
                        this._reel[reelIndex].setData(reelData, -1);
                }
                const winValue: AbstractText = new BitmapText;
                winValue.text = serverData._spinData[spinIndex]._win;
                await new Promise(resolve => setTimeout(resolve, this.delayForBonus));
                this._game.winText.SetText(winValue);
                if (spinIndex + 1 < serverData._spinData.length) {
                    await new Promise(resolve => setTimeout(resolve, this.delayForShow));
                    this.RotateReels(spinIndex + 1);
                }
            }

        }
    }

    private stop() {
        this.timer = 0;

    }

}
