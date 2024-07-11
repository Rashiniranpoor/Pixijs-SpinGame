import { Container, Sprite } from "pixi.js";
import { Game } from "./Game";
import { rowCount, symbolHeight } from "./gamesetting";

export class ReelFrame {
    _container: Container;

    _game: Game;
    constructor(game: Game) {
        this._game = game;
        this._container = new Container();
    }

    public Init() {
        this._game.app.stage.addChild(this._container);
        const background = Sprite.from("frame");
        background.anchor.set(0.5);
        this._container.addChild(background);
        background.x = this._game.app.screen.width / 2;
        background.y = this._game.app.screen.height / 2;

        this._container.visible = false;
    }

    public addBackgroundForReels() {
        let reelFrameTop = new Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background1 = Sprite.from("bgReels");
        background1.anchor.set(0.5);
        reelFrameTop.addChild(background1);

        background1.x = this._game.app.screen.width * 0.5;
        background1.y = this._game.app.screen.height * 0.5 + (symbolHeight * (rowCount / 2));// - (symbolHeight / 2);

        reelFrameTop = new Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background2 = Sprite.from("bgReels");
        background2.anchor.set(0.5);
        reelFrameTop.addChild(background2);
        background2.x = this._game.app.screen.width * 0.5;
        background2.y = this._game.app.screen.height * 0.5 - (symbolHeight * (rowCount / 2));//+ (symbolHeight / 2);
    }
}
