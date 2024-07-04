import { Container, Sprite, Ticker } from "pixi.js";
import { rowCount, symbolHeight, symbolWidth, symbolType } from './gamesetting';
import { getRandom } from "./Utility";
import { SymbleController } from "./SymbleController";
import { Game } from "./Game";

export class Reel {
    _game: Game;
    reelContainer: Container;
    _index: number;
    _symboles: SymbleController[] = [];
    constructor(game: Game, index: number) {
        this._game = game;
        this.reelContainer = new Container();
        this._game.pool = game.pool;
        this._index = index;
    }

    public Init() {
        this._game.app.stage.addChild(this.reelContainer);
        const reelSprite = Sprite.from("Reel");
        reelSprite.anchor.set(0.5);
        this.reelContainer.width = symbolWidth;
        this.reelContainer.height = symbolHeight * rowCount;
        this.reelContainer.position.set(((this._index - (rowCount / 2) + 0.5) * symbolWidth) + (window.innerWidth / 2), window.innerHeight / 2);
        this.reelContainer.addChild(reelSprite);

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            this.addRandomSymbol(rowIndex, 0);
        }
    }

    addRandomSymbol(rowIndex: number, symbolY: number) {
        const symbolId = getRandom(symbolType);
        this.addSymbol(rowIndex, symbolId, symbolY);
    }

    addSymbol(rowIndex: number, symbolId: number, symbolYPosition: number) {
        const symbol = this._game.pool.getSymbleObject();
        this.reelContainer.addChild(symbol.container);
        symbol.Init(rowIndex, symbolId, symbolYPosition);
        this._symboles.push(symbol);
    }


    showSymbolAfterSpin(symbolId: number[]) {
        this.removeAllSymbols();
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            this.addSymbol(rowIndex, symbolId[rowIndex], 0);
        }
    }

    removeSymbol(symbol: SymbleController) {
        try {
            this.reelContainer.removeChild(symbol.container);
            const symIndex = this._symboles.findIndex(sym => sym === symbol);
            this._symboles.splice(symIndex, 1);
            this._game.pool.returnSymbleObject(symbol);
        } catch (error) {
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

    private rotate(ticker: Ticker) {
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