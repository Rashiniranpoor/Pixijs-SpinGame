import { Container, Sprite } from "pixi.js";
import { symbolWidth, symbolHeight, rowCount } from "./gamesetting"
import { Game } from "./Game";



export class SymbleController {
    public container: Container;
    public _game: Game;
    constructor(game: Game) {
        this._game = game;
        this.container = new Container();
        this.container.width = symbolWidth;
        this.container.height = symbolHeight;
    }

    public Init(PositionY: number, id: number) {
        const sprite = Sprite.from("Symbol" + id);
        this.container.label = "Symbol" + id;
        sprite.anchor.set(0.5);
        this.container.addChild(sprite);
        this.container.position.set(0, PositionY);
    }


    public Move(delta: number) {
        const yLimitPosition = (symbolHeight * rowCount);
        if (this.container.position.y < yLimitPosition) {
            this.container.position.y += delta;
            return true;
        } else {
            return false;
        }
    }

}