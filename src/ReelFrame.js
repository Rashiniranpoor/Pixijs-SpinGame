"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelFrame = void 0;
const pixi_js_1 = require("pixi.js");
const gamesetting_1 = require("./gamesetting");
class ReelFrame {
    reelFrameContainer;
    _game;
    constructor(game) {
        this._game = game;
        this.reelFrameContainer = new pixi_js_1.Container();
    }
    Init() {
        this._game.app.stage.addChild(this.reelFrameContainer);
        const background = pixi_js_1.Sprite.from("reelframe");
        background.anchor.set(0.5);
        this.reelFrameContainer.addChild(background);
        background.height = gamesetting_1.symbolHeight * gamesetting_1.rowCount;
        background.x = this._game.app.screen.width / 2;
        background.y = this._game.app.screen.height / 2;
    }
    addBackgroundForReels() {
        let reelFrameTop = new pixi_js_1.Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background1 = pixi_js_1.Sprite.from("bgReels");
        background1.anchor.set(0.5);
        reelFrameTop.addChild(background1);
        background1.height = gamesetting_1.symbolHeight;
        background1.x = this._game.app.screen.width / 2;
        background1.y = this._game.app.screen.height / 2 + (gamesetting_1.symbolHeight * (gamesetting_1.rowCount / 2)) - (gamesetting_1.symbolHeight / 2);
        reelFrameTop = new pixi_js_1.Container();
        this._game.app.stage.addChild(reelFrameTop);
        const background2 = pixi_js_1.Sprite.from("bgReels");
        background2.anchor.set(0.5);
        reelFrameTop.addChild(background2);
        background2.height = gamesetting_1.symbolHeight;
        background2.x = this._game.app.screen.width / 2;
        background2.y = this._game.app.screen.height / 2 - (gamesetting_1.symbolHeight * (gamesetting_1.rowCount / 2)) + (gamesetting_1.symbolHeight / 2);
    }
}
exports.ReelFrame = ReelFrame;
