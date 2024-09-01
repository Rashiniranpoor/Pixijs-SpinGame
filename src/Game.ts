import { Application } from "pixi.js";
import { ReelFrame } from "./ReelFrame";
import { Backgound } from "./Background";
import { Reel } from "./Reel";
import { reelCount } from "./gamesetting";
import { AssetLoader } from "./AssetLoader";
import { SymbleObjectPool } from "./SymbleObjectPool"
import { SpinButton } from './SpinButton';
import { GameServer } from "./GameServer";
import { WinText } from './WinText';
import { initDevtools } from "@pixi/devtools";



export class Game {
    public app: Application;
    public background: Backgound;
    public reelFrame: ReelFrame;
    public pool: SymbleObjectPool;
    public reels: Reel[] = [];
    public spinButton: SpinButton;
    public gameServer: GameServer;
    public winText: WinText;

    public constructor() {
        this.app = new Application();

        initDevtools(this.app);
        window.__PIXI_APP__ = this.app;

        this.pool = new SymbleObjectPool(this, 25);
        this.background = new Backgound(this);
        this.reelFrame = new ReelFrame(this);

        for (let i: number = 0; i < reelCount; i++) {
            this.reels[i] = new Reel(this, i);
        }

        this.spinButton = new SpinButton(this);
        this.gameServer = new GameServer(this);
        this.winText = new WinText(this);
    }

    public async Init() {
        await this.app.init({ background: "#fff", width: window.innerWidth, height: window.innerHeight });
        document.body.appendChild(this.app.canvas);
        await AssetLoader.load();
        this.background.Init();

        for (let i: number = 0; i < reelCount; i++) {
            this.reels[i].Init();
        }
        this.reelFrame.Init();
        this.spinButton.Init();
        this.winText.Init();
    }

}