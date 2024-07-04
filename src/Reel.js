"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reel = void 0;
const pixi_js_1 = require("pixi.js");
const gamesetting_1 = require("./gamesetting");
const Utility_1 = require("./Utility");
class Reel {
    _game;
    reelContainer;
    _index;
    _symboles = [];
    constructor(game, index) {
        this._game = game;
        this.reelContainer = new pixi_js_1.Container();
        this._game.pool = game.pool;
        this._index = index;
    }
    Init() {
        this._game.app.stage.addChild(this.reelContainer);
        const reelSprite = pixi_js_1.Sprite.from("Reel");
        reelSprite.anchor.set(0.5);
        this.reelContainer.width = gamesetting_1.symbolWidth;
        this.reelContainer.height = gamesetting_1.symbolHeight * gamesetting_1.rowCount;
        this.reelContainer.position.set(((this._index - (gamesetting_1.rowCount / 2) + 0.5) * gamesetting_1.symbolWidth) + (window.innerWidth / 2), window.innerHeight / 2);
        this.reelContainer.addChild(reelSprite);
        for (let rowIndex = 0; rowIndex < gamesetting_1.rowCount; rowIndex++) {
            this.addRandomSymbol(rowIndex, 0);
        }
    }
    addRandomSymbol(rowIndex, symbolY) {
        const symbolId = (0, Utility_1.getRandom)(gamesetting_1.symbolType);
        this.addSymbol(rowIndex, symbolId, symbolY);
    }
    addSymbol(rowIndex, symbolId, symbolYPosition) {
        const symbol = this._game.pool.getSymbleObject();
        this.reelContainer.addChild(symbol.container);
        symbol.Init(rowIndex, symbolId, symbolYPosition);
        this._symboles.push(symbol);
    }
    showSymbolAfterSpin(symbolId) {
        this.removeAllSymbols();
        for (let rowIndex = 0; rowIndex < gamesetting_1.rowCount; rowIndex++) {
            this.addSymbol(rowIndex, symbolId[rowIndex], 0);
        }
    }
    removeSymbol(symbol) {
        try {
            this.reelContainer.removeChild(symbol.container);
            const symIndex = this._symboles.findIndex(sym => sym === symbol);
            this._symboles.splice(symIndex, 1);
            this._game.pool.returnSymbleObject(symbol);
        }
        catch (error) {
            (console.error());
        }
    }
    startRotate() {
        this._game.app.ticker.add(this.rotate, this);
    }
    removeAllSymbols() {
        while (this._symboles.length > 0) {
            this.removeSymbol(this._symboles[0]);
        }
    }
    rotate(ticker) {
        for (const sym of this._symboles) {
            if (!sym.Move(ticker.deltaTime * 5)) {
                this.removeSymbol(sym);
                const lastSymbolPosition = this._symboles[this._symboles.length - 1].container.position.y;
                console.log("Last symbol [psition: " + lastSymbolPosition);
                this.addRandomSymbol(0, lastSymbolPosition);
            }
        }
    }
    stop() {
        this._game.app.ticker.remove(this.rotate, this);
    }
}
exports.Reel = Reel;
//# sourceMappingURL=Reel.js.map