import { Container, Sprite } from "pixi.js";
import { Game } from "./Game";
import { rowCount, symbolHeight } from "./gamesetting";

export class ReelFrame {
    reelFrameContainer: Container;

    _game: Game;
    constructor(game: Game) {
        this._game = game;
        this.reelFrameContainer = new Container();
    }

    public Init() {
        this._game.app.stage.addChild(this.reelFrameContainer);
        const background = Sprite.from("reelframe");
        background.anchor.set(0.5);
        this.reelFrameContainer.addChild(background);
        background.height = symbolHeight * rowCount;
        background.x = this._game.app.screen.width / 2;
        background.y = this._game.app.screen.height / 2;
    }

    public addBackgroundForReels() {
        let reelFrameTop = new Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background1 = Sprite.from("bgReels");
        background1.anchor.set(0.5);
        reelFrameTop.addChild(background1);
        background1.height = symbolHeight;

        background1.x = this._game.app.screen.width / 2;
        background1.y = this._game.app.screen.height / 2 + (symbolHeight * (rowCount / 2)) - (symbolHeight / 2);

        reelFrameTop = new Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background2 = Sprite.from("bgReels");
        background2.anchor.set(0.5);
        reelFrameTop.addChild(background2);
        background2.height = symbolHeight;
        background2.x = this._game.app.screen.width / 2;
        background2.y = this._game.app.screen.height / 2 - (symbolHeight * (rowCount / 2)) + (symbolHeight / 2);
    }
}
