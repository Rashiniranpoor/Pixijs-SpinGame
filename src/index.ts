import { Game } from "./Game"

(async () => {
    // globalThis.__PIXI_APP__ = app; 
    const game = new Game();
    await game.Init();
})();

