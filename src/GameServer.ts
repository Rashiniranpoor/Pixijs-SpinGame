import { Game } from "./Game";
import { Reel } from "./Reel";
import { getLimitedRandom, getRandom } from "./Utility";
import { ServerData } from "./ServerData";
import { reelCount, rowCount } from "./gamesetting";


export class GameServer {
    _game: Game;
    _reel: Reel[];
    timer: number = 0;
    MIN_TIMER = 200;
    MAX_TIMER = 700;
    constructor(game: Game) {
        this._game = game;
        this._reel = game.reels;
    }

    async getServerData(): Promise<ServerData> {
        const delay = getLimitedRandom(this.MIN_TIMER, this.MAX_TIMER);
        const data = this.GenerateRandomData();
        await new Promise(resolve => setTimeout(resolve, delay));
        return data;
    }

    private GenerateRandomData(): ServerData {
        const randomSymbols: number[] = [];
        for (let index = 0; index < reelCount * rowCount; index++) {
            randomSymbols.push(getRandom(9));
        }
        const serverData: ServerData = new ServerData(randomSymbols);
        return serverData;

    }

    private winSymbols() {
        return 0;
    }

}