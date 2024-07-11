import { Container, Sprite, Ticker } from "pixi.js";
import { rowCount, symbolWidth, symbolType, reelCount, symbolHeight } from './gamesetting';
import { getRandom } from "./Utility";
import { SymbleController } from "./SymbleController";
import { Game } from "./Game";

export class Reel {
    _game: Game;
    _container: Container;
    _index: number;
    _symboles: SymbleController[] = [];
    _finalSymbols: number[] = [];
    constructor(game: Game, index: number) {
        this._game = game;
        this._container = new Container();
        this._game.pool = game.pool;
        this._index = index;
    }

    public Init() {
        this._game.app.stage.addChild(this._container);
        const reelSprite = Sprite.from("Reel");
        reelSprite.anchor.set(0.5);
        this._container.position.set(((this._index - (reelCount * 0.5)) * symbolWidth) + (symbolWidth * 0.5) + (window.innerWidth * 0.5), window.innerHeight * 0.5);
        this._container.addChild(reelSprite);

        const totalSymbol = rowCount + 2;
        for (let rowIndex = 0; rowIndex < totalSymbol; rowIndex++) {
            this.addRandomSymbol();
        }

        if (this._index == 0) {
            for (let symbolIndex = 0; symbolIndex < this._symboles.length; symbolIndex++) {
                console.log("Symbol index : " + symbolIndex + " Symbol name : "
                    + this._symboles[symbolIndex].container.label
                    + " Symbol position : " + this._symboles[symbolIndex].container.position.y);
            }
        }

    }

    addRandomSymbol() {
        const symbolId = getRandom(symbolType);
        this.addSymbol(symbolId);
    }

    addSymbol(symbolId: number) {
        let lastSymbolPosition = 0;

        if (this._symboles.length > 0) {
            lastSymbolPosition = this._symboles[this._symboles.length - 1].container.position.y;
        } else {
            const totalSymbol = rowCount + 2;
            lastSymbolPosition = ((totalSymbol * 0.5) + .5) * symbolHeight;
        }

        const positionY = lastSymbolPosition - symbolHeight;

        const symbol = this._game.pool.getSymbleObject();
        this._container.addChild(symbol.container);
        symbol.Init(positionY, symbolId);
        this._symboles.push(symbol);


        if (this._index == 0) {
            const symIndex = this._symboles.findIndex(sym => sym === symbol);
            console.log("addSymbol  symbolId : " + symbolId + " symIndex : "
                + symIndex);
        }
    }

    removeSymbol(symbol: SymbleController) {
        this._container.removeChild(symbol.container);
        const symIndex = this._symboles.findIndex(sym => sym === symbol);
        this._symboles.splice(symIndex, 1);
        this._game.pool.returnSymbleObject(symbol);
    }

    startRotate() {
        this._game.app.ticker.add(this.rotate, this);

    }

    removeAllSymbols() {
        while (this._symboles.length > 0) {
            this.removeSymbol(this._symboles[0]);
        }
    }

    public showSymbolAfterSpin(symbolArray: number[]) {
        this._finalSymbols = symbolArray;
    }


    finalRotate = false;
    static DEFAULT_MOVE_SPEED = 2;
    moveSpeed = Reel.DEFAULT_MOVE_SPEED;
    lastSymbolIndex = 0;
    private rotate(ticker: Ticker) {
        this.lastSymbolIndex = 0;

        for (const sym of this._symboles) {
            if (!sym.Move(ticker.deltaTime * this.moveSpeed)) {
                this.removeSymbol(sym);
                if (this._index == 0) {
                    const lastSymbolPosition = this._symboles[this._symboles.length - 1].container.position.y;

                    // console.log("Remove Sym : " + sym.container.label +
                    //     " \n  last sym index : " + this.lastSymbolIndex +
                    //     " \n last sym name : " + this._symboles[this.lastSymbolIndex].container.label +
                    //     " \n last sym position : " + lastSymbolPosition +
                    //     " \n (this._finalSymbols.length > 0) : " + (this._finalSymbols.length > 0) +
                    //     " \n (this.finalRotate) : " + (this.finalRotate));

                    // for (let symbolIndex = 0; symbolIndex < this._symboles.length; symbolIndex++) {
                    //     console.log("Symbol index : " + symbolIndex + " Symbol name : "
                    //         + this._symboles[symbolIndex].container.label
                    //         + " Symbol position : " + this._symboles[symbolIndex].container.position.y);
                    // }
                }

                if (this._finalSymbols.length > 0) {
                    this.moveSpeed = Reel.DEFAULT_MOVE_SPEED * 0.5;
                    this.addSymbol(this._finalSymbols[0]);
                    this._finalSymbols.pop();
                    if (this._finalSymbols.length == 0) {
                        this.finalRotate = true;
                    }
                }
                else {
                    if (this.finalRotate) {
                        this.addRandomSymbol();
                        this.stop();
                    } else {
                        this.addRandomSymbol();
                    }
                }
            }
        }
    }

    stop() {
        this._game.app.ticker.remove(this.rotate, this);
        this.finalRotate = false;
        this.moveSpeed = Reel.DEFAULT_MOVE_SPEED
    }
}