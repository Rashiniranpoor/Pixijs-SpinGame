"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
function getRandom(max) {
    const result = Math.floor(Math.random() * max);
    return result;
}
exports.getRandom = getRandom;
