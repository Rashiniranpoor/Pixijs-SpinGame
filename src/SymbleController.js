"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbleController = void 0;
const pixi_js_1 = require("pixi.js");
const gamesetting_1 = require("./gamesetting");
class SymbleController {
    container;
    _game;
    constructor(game) {
        this._game = game;
        this.container = new pixi_js_1.Container();
        this.container.width = gamesetting_1.symbolWidth;
        this.container.height = gamesetting_1.symbolHeight;
    }
    Init(rowIndex, id, symbolPositionY) {
        const sprite = pixi_js_1.Sprite.from("Symbol" + id);
        this.container.label = "Symbol" + id;
        sprite.anchor.set(0.5);
        this.container.addChild(sprite);
        if (symbolPositionY != 0) {
            alert(symbolPositionY + gamesetting_1.symbolHeight);
            this.container.position.set(0, symbolPositionY + gamesetting_1.symbolHeight);
        }
        else {
            this.container.position.set(0, gamesetting_1.symbolHeight - ((rowIndex - 1) * gamesetting_1.symbolHeight));
        }
    }
    Move(delta) {
        const yLimitPosition = (gamesetting_1.symbolHeight * gamesetting_1.rowCount * 0.5);
        if (this.container.position.y - (gamesetting_1.symbolHeight * 0.5) < yLimitPosition) {
            this.container.position.y += delta;
            return true;
        }
        else {
            return false;
        }
    }
}
exports.SymbleController = SymbleController;
//# sourceMappingURL=SymbleController.js.map