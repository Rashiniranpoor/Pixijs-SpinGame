import { Container, Sprite, Ticker } from "pixi.js";
import { rowCount, symbolWidth, symbolType, reelCount, symbolHeight } from './gamesetting';
import { getRandom } from './Utility';
import { SymbleController } from "./SymbleController";
import { Game } from "./Game";

export class Reel {
    _game: Game;
    _container: Container;
    _index: number;
    _symboles: SymbleController[] = [];
    _finalSymbols: number[] = [];
    _winIndex: number = 0;
    finalRotate = false;
    static DEFAULT_MOVE_SPEED = 2;
    moveSpeed = Reel.DEFAULT_MOVE_SPEED;
    lastSymbolIndex = 0;

    constructor(game: Game, index: number) {
        this._game = game;
        this._container = new Container();
        this._game.pool = game.pool;
        this._index = index;
    }

    public Init(): void {
        this._game.app.stage.addChild(this._container);
        const reelSprite = Sprite.from("Reel");
        reelSprite.anchor.set(0.5);
        this._container.position.set(((this._index - (reelCount * 0.5)) * symbolWidth) + (symbolWidth * 0.5) + (window.innerWidth * 0.5), window.innerHeight * 0.5);
        this._container.addChild(reelSprite);

        const totalSymbol = rowCount + 2;
        for (let rowIndex = 0; rowIndex < totalSymbol; rowIndex++) {
            this.addRandomSymbol();
        }
    }

    addRandomSymbol(): void {
        const symbolId = getRandom(symbolType);
        this.addSymbol(symbolId);
    }

    addSymbol(symbolId: number): void {
        let lastSymbolPosition = 0;
        let positionY = 0;
        if (this._symboles.length > 0) {
            lastSymbolPosition = this._symboles[this._symboles.length - 1].container.position.y;
        } else {
            const totalSymbol = rowCount + 2;
            lastSymbolPosition = ((totalSymbol * 0.5) + 0.5) * symbolHeight;
        }

        if (this.finalRotate) {
            positionY = -200;
        } else {
            positionY = lastSymbolPosition - symbolHeight;
        }

        const symbol = this._game.pool.getSymbleObject();
        this._container.addChild(symbol.container);
        symbol.Init(positionY, symbolId);

        this._symboles.push(symbol);

    }

    removeSymbol(symbol: SymbleController): void {
        symbol.container.removeChildren();
        this._container.removeChild(symbol.container);
        const symIndex = this._symboles.findIndex(sym => sym === symbol);
        this._symboles.splice(symIndex, 1);
        this._game.pool.returnSymbleObject(symbol);
    }

    startRotate(): void {
        this._game.app.ticker.add(this.rotate, this);
    }

    removeAllSymbols(): void {
        while (this._symboles.length > 0) {
            this.removeSymbol(this._symboles[0]);
        }
    }

    public setData(symbolArray: number[], winIndex: number): void {
        this._finalSymbols = symbolArray;
        this._winIndex = winIndex;
    }

    private rotate(ticker: Ticker): void {
        this.lastSymbolIndex = 0;
        this.ClearWin();
        for (const sym of this._symboles) {
            if (!sym.Move(ticker.deltaTime * this.moveSpeed)) {
                this.removeSymbol(sym);
                if (this._finalSymbols.length > 0) {
                    this.moveSpeed = Reel.DEFAULT_MOVE_SPEED * 0.5;
                    this.addSymbol(this._finalSymbols[0]);
                    this._finalSymbols.splice(0, 1);
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

    async stop() {
        this._game.app.ticker.remove(this.rotate, this);
        this.finalRotate = false;
        this.moveSpeed = Reel.DEFAULT_MOVE_SPEED;
        this.ShowWinLine();
    }

    private ShowWinLine() {
        if (this._winIndex != -1) {
            const winSymbolIndex = rowCount - this._winIndex;
            const winSymbol = this._symboles[winSymbolIndex];
            winSymbol.SetColor();
        }
    }

    public ClearWin() {
        if (this._winIndex != -1) {
            const winSymbolIndex = rowCount - this._winIndex;
            const winSymbol = this._symboles[winSymbolIndex];
            winSymbol.SetDefaultColor();
        }
    }
}