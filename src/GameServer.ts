import { Ticker } from "pixi.js";
import { Game } from "./Game";
import { Reel } from "./Reel";
import { getRandom } from "./Utility";


export class GameServer {
    _game: Game;
    _reel: Reel[];
    timer: number = 0;
    constructor(game: Game) {
        this._game = game;
        this._reel = game.reels;
    }

    getServerData() {
        this._game.app.ticker.add(this.GenerateRandomData, this)
    }

    private GenerateRandomData(time: Ticker) {
        this.timer = this.timer + time.deltaTime;
        if (this.timer > 50) {
            let randomSymbols: number[] = [];
            for (let i = 0; i < this._reel.length; i++) {
                randomSymbols = [getRandom(9), getRandom(9), getRandom(9)];
                // console.log(randomSymbols[0] + " , " + randomSymbols[1] + " , " + randomSymbols[2]);
                this._reel[i].setData(randomSymbols);
            }
            this.stop();
            return;
        }
    }

    private stop() {
        this.timer = 0;
        this._game.app.ticker.remove(this.GenerateRandomData, this);
    }

    private winSymbols() {
        return 0;
    }

}