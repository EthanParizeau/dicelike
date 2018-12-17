class UI {
    constructor() {
        this.leftSide = null;
        this.rightSide = null;
        this.msgBox = null;

        console.dir(this);
    }

    init() {
        this.leftSide = document.getElementsByClassName('leftDiv')[0];
        this.rightSide = document.getElementsByClassName('rightDiv')[0];
        this.msgBox = document.getElementsByClassName('msgBox')[0];

        for(let i = 0; i < 16; i++) {
            this.addMsg("FFFFUUUUCCCCKKKK".substring(0, i));
        }
    }

    addMsg(text) {
        let element = document.createElement("p");
        element.innerHTML = text;
        this.msgBox.appendChild(element);
    }

    test() {

    }
}

const ui = new UI();
export default ui;