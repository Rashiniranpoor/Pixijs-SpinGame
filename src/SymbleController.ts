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

    public Init(rowIndex: number, id: number, symbolPositionY: number) {
        const sprite = Sprite.from("Symbol" + id);
        this.container.label = "Symbol" + id;
        sprite.anchor.set(0.5);
        this.container.addChild(sprite);
        if (symbolPositionY != 0) {
            this.container.position.set(0, symbolPositionY - symbolHeight);
        }
        else {
            this.container.position.set(0, symbolHeight - ((rowIndex - 1) * symbolHeight));
        }
    }

    public Move(delta: number) {
        const yLimitPosition = (symbolHeight * rowCount * 0.5);
        if (this.container.position.y - (symbolHeight * 0.5) < yLimitPosition) {
            this.container.position.y += delta;
            return true;
        } else {
            return false;
        }
    }

}