import { Container, Sprite } from "pixi.js";
import { symbolWidth, symbolHeight, rowCount } from "./gamesetting"
import { Game } from "./Game";

export class SymbleController {
    public container: Container;
    public _game: Game;
    public _sprite: Sprite;
    constructor(game: Game) {
        this._game = game;
        this._sprite = new Sprite();
        this.container = new Container();
        this.container.width = symbolWidth;
        this.container.height = symbolHeight;
    }

    public Init(PositionY: number, id: number) {
        this._sprite = Sprite.from("Symbol" + id);
        this.container.label = "Symbol" + id;
        this._sprite.anchor.set(0.5);
        this.container.addChild(this._sprite);
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

    public SetColor() {
        this._sprite.tint = 'red';
    }

}