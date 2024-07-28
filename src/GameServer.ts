import { Game } from "./Game";
import { Reel } from "./Reel";
import { getLimitedRandom, getRandom } from "./Utility";
import { ServerData, SpinData, Point } from "./ServerData";
import { reelCount, rowCount } from "./gamesetting";

export class GameServer {
    _game: Game;
    _reel: Reel[];
    timer: number = 0;
    MIN_TIMER = 2000;
    MAX_TIMER = 7000;
    randomSymbols: number[] = [];
    spinData: SpinData[] = [];

    constructor(game: Game) {
        this._game = game;
        this._reel = game.reels;
    }

    async getServerData(): Promise<ServerData> {
        const delay = getLimitedRandom(this.MIN_TIMER, this.MAX_TIMER);
        const data = this.GetData();
        await new Promise(resolve => setTimeout(resolve, delay));
        return data;
    }

    private GetData(): ServerData {
        this.randomSymbols = [];
        this.spinData = [];
        for (let index = 0; index < reelCount * rowCount; index++) {
            this.randomSymbols.push(getRandom(9));
        }
        this.spinData.push(new SpinData(this.randomSymbols, this.GetWinLine(), this.GetWin()));
        const serverData: ServerData = new ServerData(this.spinData);
        const hasFreeSpin = getLimitedRandom(0, 1);
        if (hasFreeSpin) {
            this.GetFreeSpinData();
        }
        return serverData;

    }

    private GetWinLine(): Point[] {
        const point1 = new Point(1, getRandom(rowCount));
        const point2 = new Point(2, getRandom(rowCount));
        const point3 = new Point(3, getRandom(rowCount));
        const point4 = new Point(4, getRandom(rowCount));
        const point5 = new Point(5, getRandom(rowCount));
        return [point1, point2, point3, point4, point5];
    }

    private GetFreeSpinData(): ServerData {
        for (let index = 0; index < reelCount * rowCount; index++) {
            this.randomSymbols.push(getRandom(9));
        }
        this.spinData.push(new SpinData(this.randomSymbols, this.GetWinLine(), this.GetWin()));
        const serverData: ServerData = new ServerData(this.spinData);
        return serverData;
    }

    private GetWin(): number {
        return getLimitedRandom(200, 2000);
    }

}