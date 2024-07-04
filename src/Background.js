"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backgound = void 0;
const pixi_js_1 = require("pixi.js");
const gamesetting_1 = require("./gamesetting");
//import { windowHeight, windowWidth } from "./gamesetting";
class Backgound {
    bgContainer;
    _game;
    constructor(game) {
        this.bgContainer = new pixi_js_1.Container();
        this._game = game;
    }
    Init() {
        this._game.app.stage.addChild(this.bgContainer);
        const background = pixi_js_1.Sprite.from("background");
        background.anchor.set(0.5);
        this.bgContainer.addChild(background);
        background.width = gamesetting_1.windowWidth;
        background.height = gamesetting_1.windowHeight;
        background.position.x = window.innerWidth / 2;
        background.position.y = window.innerHeight / 2;
    }
}
exports.Backgound = Backgound;
//# sourceMappingURL=Background.js.map