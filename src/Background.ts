import { Container, Sprite } from "pixi.js";
import { windowHeight, windowWidth } from "./gamesetting";
import { Game } from "./Game";
//import { windowHeight, windowWidth } from "./gamesetting";

export class Backgound {
    bgContainer: Container;
    _game: Game;
    constructor(game: Game) {
        this.bgContainer = new Container();
        this._game = game;
    }

    public Init() {
        this._game.app.stage.addChild(this.bgContainer);
        const background = Sprite.from("background");
        background.anchor.set(0.5);
        this.bgContainer.addChild(background);
        background.width = windowWidth;
        background.height = windowHeight;
        background.position.x = window.innerWidth / 2;
        background.position.y = window.innerHeight / 2;
    }

}