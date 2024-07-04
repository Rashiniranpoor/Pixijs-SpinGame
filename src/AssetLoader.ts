import { Assets } from "pixi.js";
import assetsData from "./assets.json";
import { assetsType } from "./type";



export class AssetLoader {

    static async load() {
        const assets: assetsType[] = assetsData;
        await Assets.load(assets);
    }
}