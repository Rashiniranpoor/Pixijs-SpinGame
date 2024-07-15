export class ServerData {
    _spinData: SpinData[];
    constructor(spinData: SpinData[]) {
        this._spinData = spinData;
    }
}

export class Point {
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

export class SpinData {
    _data: number[];
    _winLines: Point[];
    _win: number;
    constructor(data: number[], winLine: Point[], win: number) {
        this._data = data;
        this._winLines = winLine;
        this._win = win;
    }
}