"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetLoader = void 0;
const pixi_js_1 = require("pixi.js");
const assets_json_1 = __importDefault(require("./assets.json"));
class AssetLoader {
    static async load() {
        const assets = assets_json_1.default;
        await pixi_js_1.Assets.load(assets);
    }
}
exports.AssetLoader = AssetLoader;
