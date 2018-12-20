class UI {
    constructor() {
        this.leftSide = null;
        this.rightSide = null;
        this.msgBox = null;
        this.player = null;

        console.dir(this);
    }

    init(player) {
        this.leftSide = document.getElementsByClassName('leftDiv')[0];
        this.rightSide = document.getElementsByClassName('rightDiv')[0];
        this.playerStatus = document.getElementById('playerStatus');
        this.playerHealth = document.getElementById('playerHealth');
        this.msgBox = document.getElementsByClassName('msgBox')[0];

        this.player = player;
    }

    updateHealth() {
        this.playerHealth.innerText = "HP: " + this.player.hp + "/" + this.player.maxHp;
    }

    addMsg(text) {
        let element = document.createElement("p");
        element.innerHTML = text;
        this.msgBox.appendChild(element);
        this.msgBox.scrollTop = this.msgBox.scrollHeight;
    }

    test() {

    }
}

const ui = new UI();
export default ui;