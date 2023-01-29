export class WindowState {

    _width: number;
    _height: number;
    _x: number;
    _y: number;
    _zIndex: number;
    
    constructor(
        public width: number = 720,
        public height: number = 480,
        public x: number = 600,
        public y: number = 300,
        public zIndex: number = 2,
        public state: "minimized" | "maximized" | "normal" = "normal",
        public windowName : string = "Window"

    ) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._zIndex = zIndex;
    }
    public getStyleString() {
        return `width: ${this.width}px; height: ${this.height}px; left: ${this.x}px; top: ${this.y}px; z-index: ${this.zIndex};`;
    }
}
