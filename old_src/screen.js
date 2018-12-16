import { Display } from 'rot-js';

class Screen {
    constructor() {
        this.fontSize = 15;
        this.width = (screen.availWidth / this.fontSize) / 2;
        this.height = (screen.availHeight / this.fontSize) / 2;
        this.display = null;
        this.init();
    }

    init() {
        this.display = new Display({
            width: this.width, 
            height: this.height,
            fontSize: this.fontSize,
            forceSquareRatio: true
        });

        let _display = this.display.getContainer();
        _display.setAttribute("class", "screen");
        document.getElementsByClassName('app')[0].appendChild(_display); // Get app div by class and append canvas

        this.display.draw(1, 1, "@");
    }
}
const display = new Screen();
export default display;