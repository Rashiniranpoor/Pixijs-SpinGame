"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
(async () => {
    // globalThis.__PIXI_APP__ = app; 
    const game = new Game_1.Game();
    await game.Init();
})();
//# sourceMappingURL=index.js.map