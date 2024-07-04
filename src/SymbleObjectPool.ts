import { SymbleController } from './SymbleController';
import { Game } from './Game';


export class SymbleObjectPool {
    private symbols: SymbleController[] = [];
    private _game: Game;
    constructor(game: Game, reserve: number) {
        this._game = game;
        this.initialize(reserve);
    }

    private initialize(reserve: number) {
        for (let i = 0; i < reserve; i++) {
            const sym = new SymbleController(this._game);
            this.symbols.push(sym);
        }
    }

    public getSymbleObject(): SymbleController {
        let sym = this.symbols.pop();
        if (!sym) {
            sym = new SymbleController(this._game);
        }
        return sym;
    }


    public returnSymbleObject(sym: SymbleController) {
        this.symbols.push(sym);
    }

}