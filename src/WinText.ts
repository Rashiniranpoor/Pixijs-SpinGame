import { AbstractText, BitmapText, Container } from "pixi.js";
import { Game } from './Game';
import { rowCount, symbolHeight, symbolWidth } from './gamesetting';

export class WinText {
    _container: Container;
    _game: Game;
    text: BitmapText;

    constructor(game: Game) {
        this._game = game;
        this._container = new Container();
        this._container.position.x = window.innerWidth * 0.5 - (symbolWidth + symbolWidth / 2);
        this._container.position.y = (window.innerHeight * 0.5) + (symbolHeight * (rowCount * 0.5) + symbolHeight * 0.5);
        this.text = new BitmapText();
    }

    public Init() {
        this._game.app.stage.addChild(this._container);
        this.text.text = '0';
        this.text.style = {
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: "200",
            fill: 0xff1010,
            align: 'center',
        };

        this._container.addChild(this.text);

    }

    public SetText(winTValue: AbstractText) {
        this.text.text = winTValue.text;
    }
}