"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const pixi_js_1 = require("pixi.js");
const ReelFrame_1 = require("./ReelFrame");
const Background_1 = require("./Background");
const Reel_1 = require("./Reel");
const gamesetting_1 = require("./gamesetting");
const AssetLoader_1 = require("./AssetLoader");
const SymbleObjectPool_1 = require("./SymbleObjectPool");
const SpinButton_1 = require("./SpinButton");
class Game {
    app;
    background;
    reelFrame;
    pool;
    reels = [];
    spinButton;
    constructor() {
        this.app = new pixi_js_1.Application();
        this.pool = new SymbleObjectPool_1.SymbleObjectPool(this, 25);
        this.background = new Background_1.Backgound(this);
        this.reelFrame = new ReelFrame_1.ReelFrame(this);
        for (let i = 0; i < gamesetting_1.reelCount; i++) {
            this.reels[i] = new Reel_1.Reel(this, i);
        }
        this.spinButton = new SpinButton_1.SpinButton(this);
    }
    async Init() {
        await this.app.init({ background: "#fff", width: window.innerWidth, height: window.innerHeight });
        document.body.appendChild(this.app.canvas);
        await AssetLoader_1.AssetLoader.load();
        this.background.Init();
        this.reelFrame.Init();
        for (let i = 0; i < gamesetting_1.reelCount; i++) {
            this.reels[i].Init();
        }
        //this.reelFrame.addBackgroundForReels();
        this.spinButton.Init();
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map