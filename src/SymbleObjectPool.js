"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbleObjectPool = void 0;
const SymbleController_1 = require("./SymbleController");
class SymbleObjectPool {
    symbols = [];
    _game;
    constructor(game, reserve) {
        this._game = game;
        this.initialize(reserve);
    }
    initialize(reserve) {
        for (let i = 0; i < reserve; i++) {
            const sym = new SymbleController_1.SymbleController(this._game);
            this.symbols.push(sym);
        }
    }
    getSymbleObject() {
        let sym = this.symbols.pop();
        if (!sym) {
            sym = new SymbleController_1.SymbleController(this._game);
        }
        return sym;
    }
    returnSymbleObject(sym) {
        this.symbols.push(sym);
    }
}
exports.SymbleObjectPool = SymbleObjectPool;
//# sourceMappingURL=SymbleObjectPool.js.map